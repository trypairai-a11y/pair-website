"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";

export default function TextField({
  name,
  type = "text",
  placeholder,
  required,
  onValueChange,
}: {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filled = value.trim().length > 0;
  const active = focused || filled;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onValueChange?.(e.target.value);
          if (error) setError(null);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onInvalid={(e) => {
          e.preventDefault();
          const el = e.currentTarget;
          if (el.validity.valueMissing) {
            setError("Please fill out this field.");
          } else if (el.validity.typeMismatch) {
            setError("Please enter a valid value.");
          } else {
            setError(el.validationMessage || "Please fill out this field.");
          }
        }}
        className={`w-full rounded-lg md:rounded-md border bg-white px-4 py-3 md:py-4 text-[14px] md:text-[16px] text-sierra-text-dark placeholder:text-sierra-gray/70 focus:outline-none transition-colors ${
          active
            ? "border-sierra-text-dark"
            : "border-sierra-gray/20 hover:border-sierra-gray/40"
        } ${filled && !error ? "pr-11" : ""}`}
      />
      {filled && !error && (
        <CircleCheck
          size={20}
          strokeWidth={1.75}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-green-600"
        />
      )}
      {error && (
        <p className="mt-1.5 text-[12px] leading-snug text-red-500">{error}</p>
      )}
    </div>
  );
}
