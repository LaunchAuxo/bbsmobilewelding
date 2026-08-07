"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", siteConfig.web3formsAccessKey);
    formData.append(
      "subject",
      `New quote request from ${formData.get("name") || "website"}`
    );

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-white/10 bg-charcoal p-6">
        <p className="font-display text-lg font-semibold tracking-wide text-paper uppercase">
          Message sent
        </p>
        <p className="mt-2 text-sm text-mist">
          Ben will get back to you shortly. For the fastest reply, use the
          text button above instead.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-white/10 bg-charcoal p-6"
    >
      {/* Honeypot — hidden from real users, bots tend to fill every field. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="location"
            className="text-xs font-semibold tracking-widest text-mist uppercase"
          >
            Repair location
          </label>
          <select
            id="location"
            name="location"
            defaultValue="In-shop"
            className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-paper"
          >
            <option value="In-shop">In-shop</option>
            <option value="Mobile">Mobile — I&rsquo;ll include my address</option>
            <option value="Not sure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-xs font-semibold tracking-widest text-mist uppercase"
        >
          What needs fixed?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Brief description of the repair..."
          className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-paper placeholder:text-steel"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-paper px-5 py-3 font-display text-sm font-semibold tracking-wide text-black uppercase transition-colors hover:bg-mist disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong sending that — try texting instead, or call
          directly.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-semibold tracking-widest text-mist uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-paper placeholder:text-steel"
      />
    </div>
  );
}
