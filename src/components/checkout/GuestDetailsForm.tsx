import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, IdCard } from "lucide-react";
import IdDocumentUpload from "./IdDocumentUpload";

// ─────────────────────────────────────────────
// Validation schema
// ─────────────────────────────────────────────

export const guestDetailsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+?88)?01[3-9]\d{8}$/, {
      message: "Enter a valid Bangladeshi mobile number (e.g. 01712345678)",
    }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(255),
  idNumber: z
    .string()
    .trim()
    .min(5, { message: "ID must be at least 5 characters" })
    .max(30, { message: "ID must be less than 30 characters" }),
});

export type GuestDetails = z.infer<typeof guestDetailsSchema>;

type FieldErrors = Partial<Record<keyof GuestDetails, string>>;

type Props = {
  value: GuestDetails;
  onChange: (next: GuestDetails) => void;
  errors: FieldErrors;
  disabled?: boolean;
  idDocument: File | null;
  onIdDocumentChange: (file: File | null) => void;
};

// ─────────────────────────────────────────────
// Field config
// ─────────────────────────────────────────────

const FIELDS: Array<{
  key: keyof GuestDetails;
  label: string;
  placeholder: string;
  type: string;
  icon: typeof User;
  autoComplete: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
}> = [
  {
    key: "name",
    label: "Full name",
    placeholder: "As shown on your ID",
    type: "text",
    icon: User,
    autoComplete: "name",
  },
  {
    key: "phone",
    label: "Mobile number",
    placeholder: "01XXXXXXXXX",
    type: "tel",
    icon: Phone,
    autoComplete: "tel",
    inputMode: "tel",
  },
  {
    key: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    icon: Mail,
    autoComplete: "email",
    inputMode: "email",
  },
  {
    key: "idNumber",
    label: "NID / Passport number",
    placeholder: "Required at check-in",
    type: "text",
    icon: IdCard,
    autoComplete: "off",
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const GuestDetailsForm = ({
  value,
  onChange,
  errors,
  disabled,
  idDocument,
  onIdDocumentChange,
}: Props) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Guest details
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => {
          const Icon = f.icon;
          const fieldError = touched[f.key] ? errors[f.key] : undefined;
          return (
            <div key={f.key} className="space-y-1.5">
              <Label
                htmlFor={`guest-${f.key}`}
                className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                {f.label}
              </Label>
              <div className="relative">
                <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id={`guest-${f.key}`}
                  type={f.type}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  value={value[f.key]}
                  disabled={disabled}
                  onChange={(e) =>
                    onChange({ ...value, [f.key]: e.target.value })
                  }
                  onBlur={() => setTouched((t) => ({ ...t, [f.key]: true }))}
                  aria-invalid={!!fieldError}
                  aria-describedby={
                    fieldError ? `guest-${f.key}-error` : undefined
                  }
                  className={`pl-10 ${
                    fieldError
                      ? "border-red-500/60 focus-visible:ring-red-500/40"
                      : ""
                  }`}
                />
              </div>
              {fieldError && (
                <p
                  id={`guest-${f.key}-error`}
                  className="text-[11px] text-red-600 dark:text-red-400"
                >
                  {fieldError}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <IdDocumentUpload
        file={idDocument}
        onChange={onIdDocumentChange}
        disabled={disabled}
      />
    </div>
  );
};

export default GuestDetailsForm;
