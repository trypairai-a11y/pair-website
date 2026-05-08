"use client";

import { useState } from "react";
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
    <form className="space-y-6" noValidate={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First name</label>
          <TextField name="firstName" placeholder="First name" required onValueChange={setField("firstName")} />
        </div>
        <div>
          <label className={labelClass}>Last name</label>
          <TextField name="lastName" placeholder="Last name" required onValueChange={setField("lastName")} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Job title</label>
        <TextField name="jobTitle" placeholder="Job title" required onValueChange={setField("jobTitle")} />
      </div>

      <div>
        <label className={labelClass}>Company email</label>
        <TextField name="email" type="email" placeholder="Company email" required onValueChange={setField("email")} />
      </div>

      <div>
        <label className={labelClass}>Company name</label>
        <TextField name="company" placeholder="Company name" required onValueChange={setField("company")} />
      </div>

      <div>
        <label className={labelClass}>Industry</label>
        <IndustrySelect name="industry" options={industries} onValueChange={setField("industry")} />
      </div>

      <p className="text-[13px] leading-relaxed text-sierra-gray text-center pt-2 max-w-none md:max-w-none lg:max-w-[280px] mx-auto">
        By clicking submit, you acknowledge your data will be processed according to our
        <span className="md:block lg:inline">{" "}</span>
        <a href="/privacy-policy" className="underline hover:text-sierra-text">
          Privacy Policy
        </a>
        .
      </p>

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          className={`inline-flex items-center rounded-full px-8 py-5 text-sm font-normal text-white transition-colors ${
            isValid
              ? "bg-sierra-green hover:bg-sierra-green-light cursor-pointer"
              : "bg-[#bfbab2] cursor-pointer hover:bg-[#b1aca2]"
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
