"use client";

import { useState } from "react";
import Link from "next/link";
import IndustrySelect from "@/components/ui/IndustrySelect";
import TextField from "@/components/ui/TextField";

const labelClass = "block text-[11px] font-normal text-sierra-text-dark mb-2";

const FIELDS = ["firstName", "lastName", "jobTitle", "email", "company", "industry"] as const;
type FieldName = (typeof FIELDS)[number];

export default function LearnMoreForm({ industries }: { industries: string[] }) {
  const [values, setValues] = useState<Record<FieldName, string>>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    company: "",
    industry: "",
  });

  const setField = (name: FieldName) => (value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const isValid = FIELDS.every((f) => values[f].trim().length > 0);

  return (
    <form
      className="space-y-6"
      noValidate={false}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>First name</label>
          <TextField id="firstName" name="firstName" placeholder="First name" required onValueChange={setField("firstName")} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last name</label>
          <TextField id="lastName" name="lastName" placeholder="Last name" required onValueChange={setField("lastName")} />
        </div>
      </div>

      <div>
        <label htmlFor="jobTitle" className={labelClass}>Job title</label>
        <TextField id="jobTitle" name="jobTitle" placeholder="Job title" required onValueChange={setField("jobTitle")} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Company email</label>
        <TextField id="email" name="email" type="email" placeholder="Company email" required onValueChange={setField("email")} />
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>Company name</label>
        <TextField id="company" name="company" placeholder="Company name" required onValueChange={setField("company")} />
      </div>

      <div>
        <label id="industry-label" className={labelClass}>Industry</label>
        <IndustrySelect id="industry" name="industry" options={industries} ariaLabelledBy="industry-label" onValueChange={setField("industry")} />
      </div>

      <p className="text-[13px] leading-relaxed text-sierra-gray text-center pt-2 max-w-none md:max-w-none lg:max-w-[280px] mx-auto">
        By clicking submit, you acknowledge your data will be processed according to our
        <span className="md:block lg:inline">{" "}</span>
        <Link href="/privacy-policy" className="underline hover:text-sierra-text">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={!isValid}
          aria-disabled={!isValid}
          className={`inline-flex items-center rounded-full px-8 py-5 text-sm font-normal text-white transition-colors ${
            isValid
              ? "bg-sierra-green hover:bg-sierra-green-light cursor-pointer"
              : "bg-[#bfbab2] cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
