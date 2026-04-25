import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Loader2,
  ShieldCheck,
  Smartphone,
  WifiOff,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import SmartImage from "@/components/ui/smart-image";
import GuestDetailsForm, {
  guestDetailsSchema,
  type GuestDetails,
} from "@/components/checkout/GuestDetailsForm";
import { formatBDT } from "@/data/products";
import { nightsBetween, useBooking } from "@/stores/booking";
import { useBkashPayment, type PaymentStatus } from "@/hooks/useBkashPayment";

const EMPTY_GUEST: GuestDetails = { name: "", phone: "", email: "", idNumber: "" };

// ─────────────────────────────────────────────
// Step indicator configuration
// ─────────────────────────────────────────────

const STEPS = [
  { key: "connecting", label: "Connecting" },
  { key: "verifying", label: "Verifying" },
  { key: "success", label: "Confirmed" },
] as const;

function stepIndex(status: PaymentStatus): number {
  switch (status) {
    case "connecting":
      return 0;
    case "verifying":
      return 1;
    case "success":
      return 2;
    default:
      return -1;
  }
}

// ─────────────────────────────────────────────
// Checkout Page
// ─────────────────────────────────────────────

const Checkout = () => {
  const navigate = useNavigate();
  const draft = useBooking((s) => s.draft);
  const reset = useBooking((s) => s.reset);
  const { state, startPayment, retry, isOnline, connectionType } = useBkashPayment();

  const [guest, setGuest] = useState<GuestDetails>(EMPTY_GUEST);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const nights = nightsBetween(draft.checkIn, draft.checkOut);
  const subtotal = (draft.pricePerNight ?? 0) * Math.max(nights, 1);
  const serviceFee = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee;

  // Validate guest details — recompute on every change for live UX
  const validation = useMemo(() => guestDetailsSchema.safeParse(guest), [guest]);
  const fieldErrors = useMemo(() => {
    if (validation.success) return {};
    const out: Partial<Record<keyof GuestDetails, string>> = {};
    for (const issue of validation.error.issues) {
      const key = issue.path[0] as keyof GuestDetails;
      if (key && !out[key]) out[key] = issue.message;
    }
    return out;
  }, [validation]);

  // Show errors after a failed submit attempt even on untouched fields
  const visibleErrors = submitAttempted ? fieldErrors : {};

  // Redirect if no room is selected
  useEffect(() => {
    if (!draft.roomId) {
      navigate("/rooms");
    }
  }, [draft.roomId, navigate]);

  useEffect(() => {
    document.title = "Checkout · Travela";
  }, []);

  if (!draft.roomId) return null;

  const handlePay = () => {
    if (!validation.success) {
      setSubmitAttempted(true);
      // Scroll first invalid field into view
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey) {
        document
          .getElementById(`guest-${firstKey}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    startPayment(total);
  };

  const handleDone = () => {
    reset();
    navigate("/");
  };

  const activeStep = stepIndex(state.status);
  const isProcessing =
    state.status === "connecting" || state.status === "verifying";
  const isSlow = connectionType === "slow-2g" || connectionType === "2g" || connectionType === "3g";

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container max-w-4xl pb-20 pt-28 md:pt-36">
        {/* Back link */}
        <Link
          to={`/rooms/${draft.roomId}`}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to room
        </Link>

        <h1 className="mt-6 font-display text-4xl tracking-tight md:text-5xl">
          Confirm & <span className="italic text-accent">pay</span>
        </h1>

        {/* Slow connection warning */}
        <AnimatePresence>
          {isSlow && state.status === "idle" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex items-center gap-3 rounded-md border border-amber-300/40 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-950/30 dark:text-amber-200"
            >
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>
                Slow connection detected ({connectionType}). Payment may take longer than usual.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Offline banner */}
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex items-center gap-3 rounded-md border border-red-300/40 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200"
            >
              <WifiOff className="h-4 w-4 shrink-0" />
              <span>
                You're offline. Payment will resume automatically when connectivity returns.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          {/* Left — Booking summary */}
          <div className="md:col-span-7">
            <div className="flex gap-5 border-b border-border pb-6">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-secondary">
                {draft.roomImage && (
                  <SmartImage
                    src={draft.roomImage}
                    alt={draft.roomTitle ?? "Room"}
                    width={192}
                    height={224}
                    loading="eager"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center gap-1.5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Your stay
                </p>
                <h2 className="font-display text-xl leading-tight">{draft.roomTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {draft.checkIn} → {draft.checkOut} · {draft.guests}{" "}
                  {draft.guests === 1 ? "guest" : "guests"}
                </p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>
                  {formatBDT(draft.pricePerNight ?? 0)} × {Math.max(nights, 1)}{" "}
                  {Math.max(nights, 1) === 1 ? "night" : "nights"}
                </span>
                <span>{formatBDT(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service fee</span>
                <span>{formatBDT(serviceFee)}</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-4">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-2xl">{formatBDT(total)}</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="mt-10">
              <h3 className="mb-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Pay with
              </h3>
              <div className="flex items-center gap-4 rounded-md border border-border bg-card px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E2136E]">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-display text-lg">bKash</p>
                  <p className="text-xs text-muted-foreground">Mobile payment</p>
                </div>
                <ShieldCheck className="ml-auto h-5 w-5 text-accent" />
              </div>
            </div>

            {/* Guest details */}
            <GuestDetailsForm
              value={guest}
              onChange={setGuest}
              errors={visibleErrors}
              disabled={isProcessing || state.status === "success"}
              idDocument={idDocument}
              onIdDocumentChange={setIdDocument}
            />
          </div>

          {/* Right — Payment action */}
          <div className="md:col-span-5">
            <div className="border border-border bg-card p-6 shadow-elegant md:sticky md:top-28">
              {/* Step indicator */}
              <div className="mb-6 flex items-center justify-between">
                {STEPS.map((step, i) => {
                  const isActive = activeStep === i;
                  const isDone = activeStep > i;
                  return (
                    <div key={step.key} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`grid h-8 w-8 place-items-center rounded-full text-xs font-medium transition-all duration-500 ${
                            isDone
                              ? "bg-green-600 text-white"
                              : isActive
                                ? "bg-[#E2136E] text-white shadow-lg shadow-[#E2136E]/30"
                                : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {isDone ? (
                            <Check className="h-4 w-4" />
                          ) : isActive && isProcessing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            i + 1
                          )}
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
                            isActive || isDone
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={`mx-2 h-px flex-1 transition-colors duration-500 ${
                            isDone ? "bg-green-600" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Status message */}
              <AnimatePresence mode="wait">
                {state.message && (
                  <motion.p
                    key={state.message}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`mb-5 text-center text-sm ${
                      state.status === "success"
                        ? "text-green-600 dark:text-green-400"
                        : state.status === "error" || state.status === "timeout"
                          ? "text-red-600 dark:text-red-400"
                          : state.status === "offline"
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-muted-foreground"
                    }`}
                  >
                    {state.message}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Transaction ID on success */}
              {state.status === "success" && state.txnId && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-5 rounded-md border border-green-200 bg-green-50 p-4 text-center dark:border-green-800/40 dark:bg-green-950/30"
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
                    Transaction ID
                  </p>
                  <p className="mt-1 font-mono text-lg font-semibold text-green-800 dark:text-green-300">
                    {state.txnId}
                  </p>
                </motion.div>
              )}

              {/* Action buttons */}
              {state.status === "idle" && (
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={!isOnline}
                  className="btn btn-lg group w-full !rounded-md text-white"
                  style={{
                    backgroundImage: "linear-gradient(180deg, #E83A85 0%, #C8105F 100%)",
                    boxShadow:
                      "inset 0 1px 0 hsl(0 0% 100% / 0.18), 0 1px 1px hsl(330 80% 20% / 0.4), 0 8px 18px -6px hsl(330 80% 35% / 0.5)",
                  }}
                >
                  Pay {formatBDT(total)} with bKash
                </button>
              )}

              {isProcessing && (
                <button
                  type="button"
                  disabled
                  className="btn btn-lg w-full !rounded-md text-white"
                  style={{ backgroundColor: "#E2136E", opacity: 0.85 }}
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing…
                </button>
              )}

              {(state.status === "error" ||
                state.status === "timeout" ||
                state.status === "offline") &&
                state.canRetry && (
                  <button
                    type="button"
                    onClick={retry}
                    disabled={!isOnline}
                    className="btn btn-lg btn-secondary group w-full !rounded-md"
                  >
                    <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    Retry payment
                  </button>
                )}

              {state.status === "success" && (
                <button
                  type="button"
                  onClick={handleDone}
                  className="btn btn-lg btn-accent group w-full !rounded-md"
                >
                  <Check className="h-4 w-4" />
                  Done — back to home
                </button>
              )}

              {/* Security note */}
              <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                Simulated payment · No real charges
              </p>

              {/* Attempt counter */}
              {state.attempt > 1 && state.status !== "success" && (
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Attempt {state.attempt} of 3
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Checkout;
