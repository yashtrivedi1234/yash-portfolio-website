"use client";

import { useState } from "react";
import type { FAQ } from "@/data/faqs";
import { cn } from "@/lib/utils";

interface FAQProps {
  faqs: FAQ[];
}

export function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm"
        >
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-800/30"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-white">{faq.question}</span>
            <svg
              className={cn(
                "h-5 w-5 shrink-0 text-violet-400 transition-transform duration-300",
                openIndex === index && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={cn(
              "grid transition-all duration-300",
              openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-4 text-slate-400 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
