"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("success");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 5000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-300">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          placeholder="Project inquiry"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          placeholder="Tell me about your project..."
        />
      </div>

      {status === "success" && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-400">
          Thank you! Your message has been received. I&apos;ll get back to you soon.
        </div>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send Message
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </Button>

      <p className="text-sm text-slate-500">
        This form is frontend-only. Connect to Formspree, Resend, or EmailJS for production use.
      </p>
    </form>
  );
}
