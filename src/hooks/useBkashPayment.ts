import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type PaymentStatus =
  | "idle"
  | "connecting"
  | "verifying"
  | "success"
  | "error"
  | "timeout"
  | "offline";

export type PaymentState = {
  status: PaymentStatus;
  /** Current retry attempt (1-indexed). 0 when idle. */
  attempt: number;
  /** Human-readable status message for the UI. */
  message: string;
  /** Generated transaction ID on success. */
  txnId: string | null;
  /** Whether the error is retryable. */
  canRetry: boolean;
};

type UseBkashPaymentReturn = {
  state: PaymentState;
  /** Initiate a payment. No-op if already in progress. */
  startPayment: (amountBDT: number) => void;
  /** Retry after a failed attempt. */
  retry: () => void;
  /** Whether the device currently has network connectivity. */
  isOnline: boolean;
  /** Network effective type (4g, 3g, 2g, slow-2g) or null if unavailable. */
  connectionType: string | null;
};

// ─────────────────────────────────────────────
// Constants — tuned for Bangladesh's Slow 4G reality
// ─────────────────────────────────────────────

/** Hard timeout for a single handshake attempt. */
const HANDSHAKE_TIMEOUT_MS = 15_000;
/** Maximum number of automatic retries. */
const MAX_RETRIES = 3;
/** Base delay for exponential backoff (doubles each attempt). */
const BACKOFF_BASE_MS = 1_000;
/** Simulated latency range (randomized to mimic real-world variance). */
const SIM_LATENCY_MIN_MS = 1_500;
const SIM_LATENCY_MAX_MS = 4_000;
/** Simulated failure rate (30% — typical for congested towers). */
const SIM_FAILURE_RATE = 0.3;

// ─────────────────────────────────────────────
// Simulated bKash handshake
// ─────────────────────────────────────────────

/**
 * Simulates the two-phase bKash payment gateway handshake:
 *  1. "Connecting" — establish session with the gateway (1.5–4s on Slow 4G)
 *  2. "Verifying" — gateway confirms the charge with bKash servers
 *
 * Randomly fails ~30% of the time to exercise retry/timeout code paths.
 */
async function simulateBkashHandshake(
  amountBDT: number,
  signal: AbortSignal,
  onPhase: (phase: "connecting" | "verifying") => void,
): Promise<string> {
  const latency = () =>
    SIM_LATENCY_MIN_MS + Math.random() * (SIM_LATENCY_MAX_MS - SIM_LATENCY_MIN_MS);

  // Phase 1: Connecting
  onPhase("connecting");
  await delay(latency(), signal);

  // Simulate random gateway failures
  if (Math.random() < SIM_FAILURE_RATE) {
    throw new Error("bKash gateway did not respond — please retry.");
  }

  // Phase 2: Verifying
  onPhase("verifying");
  await delay(latency(), signal);

  // Simulate occasional verification failures
  if (Math.random() < SIM_FAILURE_RATE * 0.5) {
    throw new Error("Payment verification failed — the charge was not applied.");
  }

  // Success — generate a mock transaction ID
  const txnId = `BK${Date.now().toString(36).toUpperCase()}${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

  return txnId;
}

/** Abortable delay helper. */
function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

const INITIAL_STATE: PaymentState = {
  status: "idle",
  attempt: 0,
  message: "",
  txnId: null,
  canRetry: false,
};

export function useBkashPayment(): UseBkashPaymentReturn {
  const [state, setState] = useState<PaymentState>(INITIAL_STATE);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );
  const [connectionType, setConnectionType] = useState<string | null>(() => {
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      return (navigator as any).connection?.effectiveType ?? null;
    }
    return null;
  });

  // Guards against double-tap on slow networks.
  const inProgressRef = useRef(false);
  // Stores the last requested amount so `retry()` can re-use it.
  const lastAmountRef = useRef(0);
  // AbortController for the current payment attempt.
  const abortRef = useRef<AbortController | null>(null);

  // ── Online/offline tracking ──
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => {
      setIsOnline(false);
      // If a payment is in flight, surface the offline state.
      if (inProgressRef.current) {
        abortRef.current?.abort();
        setState((s) => ({
          ...s,
          status: "offline",
          message: "You went offline. We'll retry when connectivity returns.",
          canRetry: true,
        }));
        inProgressRef.current = false;
      }
    };

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // ── Connection quality tracking ──
  useEffect(() => {
    if (typeof navigator === "undefined" || !("connection" in navigator)) return;
    const conn = (navigator as any).connection;
    const update = () => setConnectionType(conn?.effectiveType ?? null);
    conn?.addEventListener("change", update);
    return () => conn?.removeEventListener("change", update);
  }, []);

  // ── Auto-retry on reconnect ──
  useEffect(() => {
    if (isOnline && state.status === "offline" && lastAmountRef.current > 0) {
      // Small delay to let the network settle before retrying.
      const timer = setTimeout(() => {
        executePayment(lastAmountRef.current, state.attempt);
      }, 800);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, state.status]);

  // ── Core payment executor with exponential backoff ──
  const executePayment = useCallback(
    async (amountBDT: number, startAttempt: number = 0) => {
      if (inProgressRef.current) return;

      if (!navigator.onLine) {
        setState({
          status: "offline",
          attempt: startAttempt,
          message: "No internet connection. Connect to a network and try again.",
          txnId: null,
          canRetry: true,
        });
        return;
      }

      inProgressRef.current = true;
      let attempt = startAttempt;

      while (attempt < MAX_RETRIES) {
        attempt++;
        const controller = new AbortController();
        abortRef.current = controller;

        // Timeout guard — kills the handshake after HANDSHAKE_TIMEOUT_MS.
        const timeoutId = setTimeout(() => controller.abort(), HANDSHAKE_TIMEOUT_MS);

        setState({
          status: "connecting",
          attempt,
          message:
            attempt === 1
              ? "Connecting to bKash…"
              : `Retrying… attempt ${attempt} of ${MAX_RETRIES}`,
          txnId: null,
          canRetry: false,
        });

        try {
          const txnId = await simulateBkashHandshake(amountBDT, controller.signal, (phase) => {
            setState((s) => ({
              ...s,
              status: phase,
              message:
                phase === "verifying"
                  ? "Verifying payment with bKash…"
                  : s.message,
            }));
          });

          clearTimeout(timeoutId);

          // ✅ Success
          setState({
            status: "success",
            attempt,
            message: "Payment confirmed!",
            txnId,
            canRetry: false,
          });
          inProgressRef.current = false;
          return;
        } catch (err: any) {
          clearTimeout(timeoutId);

          if (err.name === "AbortError") {
            // Timeout or offline abort
            if (!navigator.onLine) {
              setState({
                status: "offline",
                attempt,
                message: "Connection lost during payment. We'll retry when you're back online.",
                txnId: null,
                canRetry: true,
              });
              inProgressRef.current = false;
              return;
            }

            // Genuine timeout
            if (attempt >= MAX_RETRIES) {
              setState({
                status: "timeout",
                attempt,
                message:
                  "bKash is taking too long to respond. Please check your connection and try again.",
                txnId: null,
                canRetry: true,
              });
              inProgressRef.current = false;
              return;
            }
          } else {
            // Application error from the handshake
            if (attempt >= MAX_RETRIES) {
              setState({
                status: "error",
                attempt,
                message: err.message || "Payment failed. Please try again.",
                txnId: null,
                canRetry: true,
              });
              inProgressRef.current = false;
              return;
            }
          }

          // Exponential backoff before next attempt: 1s → 2s → 4s
          const backoff = BACKOFF_BASE_MS * Math.pow(2, attempt - 1);
          setState((s) => ({
            ...s,
            status: "error",
            message: `Attempt ${attempt} failed. Retrying in ${backoff / 1000}s…`,
            canRetry: false,
          }));
          await new Promise((r) => setTimeout(r, backoff));
        }
      }

      inProgressRef.current = false;
    },
    [],
  );

  const startPayment = useCallback(
    (amountBDT: number) => {
      lastAmountRef.current = amountBDT;
      executePayment(amountBDT, 0);
    },
    [executePayment],
  );

  const retry = useCallback(() => {
    if (lastAmountRef.current > 0) {
      executePayment(lastAmountRef.current, 0);
    }
  }, [executePayment]);

  return { state, startPayment, retry, isOnline, connectionType };
}
