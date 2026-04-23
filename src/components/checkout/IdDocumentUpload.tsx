import { useRef, useState } from "react";
import { Upload, FileText, Image as ImageIcon, X, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";

// ─────────────────────────────────────────────
// Constraints
// ─────────────────────────────────────────────

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_MIMES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
];
const ACCEPT_ATTR = ACCEPTED_MIMES.join(",");

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const IdDocumentUpload = ({ file, onChange, disabled }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (incoming: File | null) => {
    setError(null);
    if (!incoming) {
      onChange(null);
      return;
    }
    if (!ACCEPTED_MIMES.includes(incoming.type)) {
      setError("Unsupported file type. Use JPG, PNG, WEBP, HEIC, or PDF.");
      return;
    }
    if (incoming.size > MAX_BYTES) {
      setError(`File is too large. Max ${formatBytes(MAX_BYTES)}.`);
      return;
    }
    onChange(incoming);
  };

  const isPdf = file?.type === "application/pdf";

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-baseline justify-between">
        <Label
          htmlFor="id-document"
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          ID document
        </Label>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Optional
        </span>
      </div>

      {!file ? (
        <label
          htmlFor="id-document"
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (disabled) return;
            const dropped = e.dataTransfer.files?.[0];
            if (dropped) handleFile(dropped);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed px-6 py-8 text-center transition-colors ${
            dragOver
              ? "border-accent bg-accent/5"
              : "border-border hover:border-foreground/40 hover:bg-secondary/40"
          } ${disabled ? "pointer-events-none opacity-50" : ""}`}
        >
          <Upload className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm">
            <span className="font-medium">Click to upload</span>{" "}
            <span className="text-muted-foreground">or drag and drop</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            JPG, PNG, WEBP, HEIC or PDF · up to 5 MB
          </p>
        </label>
      ) : (
        <div className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
            {isPdf ? (
              <FileText className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-[11px] text-muted-foreground">
              {formatBytes(file.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              handleFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            disabled={disabled}
            aria-label="Remove uploaded file"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        id="id-document"
        type="file"
        accept={ACCEPT_ATTR}
        disabled={disabled}
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        className="sr-only"
      />

      {error && (
        <p
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-[11px] text-red-600 dark:text-red-400"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}

      <p className="mt-2 text-[11px] text-muted-foreground">
        You can also bring the original at check-in.
      </p>
    </div>
  );
};

export default IdDocumentUpload;
