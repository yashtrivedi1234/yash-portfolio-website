"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import type { SiteConfig } from "@/lib/site-config";
import { notify } from "@/lib/toast";

interface ContactFormProps {
  form: SiteConfig["contactPage"]["form"];
}

export function ContactForm({ form }: ContactFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formEl = e.target as HTMLFormElement;
    const formData = new FormData(formEl);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      notify.success(form.successMessage);
      formEl.reset();
    } catch {
      notify.error(form.errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-6 rounded-2xl p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
            {form.nameLabel}
          </label>
          <input type="text" id="name" name="name" required className="input-field" placeholder={form.namePlaceholder} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
            {form.emailLabel}
          </label>
          <input type="email" id="email" name="email" required className="input-field" placeholder={form.emailPlaceholder} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-300">
          {form.subjectLabel}
        </label>
        <input type="text" id="subject" name="subject" required className="input-field" placeholder={form.subjectPlaceholder} />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
          {form.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="input-field resize-none"
          placeholder={form.messagePlaceholder}
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {form.sendingLabel}
          </>
        ) : (
          <>
            {form.submitLabel}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </>
        )}
      </Button>
    </form>
  );
}
