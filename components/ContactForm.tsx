"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { ValidatedInput, ValidatedTextarea } from "@/components/ValidatedField";
import type { SiteConfig } from "@/lib/site-config";
import { notify } from "@/lib/toast";

interface ContactFormProps {
  form: SiteConfig["contactPage"]["form"];
}

export function ContactForm({ form }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        notify.error(data.error ?? form.errorMessage);
        return;
      }

      if (data.warning) {
        notify.warning(data.warning);
      } else {
        notify.success(form.successMessage);
      }

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
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
          <ValidatedInput
            fieldType="personName"
            id="name"
            name="name"
            required
            className="input-field"
            placeholder={form.namePlaceholder}
            value={name}
            onValueChange={setName}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
            {form.emailLabel}
          </label>
          <ValidatedInput
            fieldType="email"
            id="email"
            name="email"
            type="email"
            required
            className="input-field"
            placeholder={form.emailPlaceholder}
            value={email}
            onValueChange={setEmail}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-300">
          {form.subjectLabel}
        </label>
        <ValidatedInput
          fieldType="shortText"
          id="subject"
          name="subject"
          required
          className="input-field"
          placeholder={form.subjectPlaceholder}
          value={subject}
          onValueChange={setSubject}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
          {form.messageLabel}
        </label>
        <ValidatedTextarea
          fieldType="longText"
          id="message"
          name="message"
          required
          rows={5}
          className="input-field resize-none"
          placeholder={form.messagePlaceholder}
          value={message}
          onValueChange={setMessage}
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
