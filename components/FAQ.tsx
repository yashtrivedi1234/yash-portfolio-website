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
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              "overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300",
              isOpen
                ? "border-violet-500/40 bg-violet-500/5 shadow-lg shadow-violet-500/5"
                : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
            )}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors sm:px-6 sm:py-5"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className={cn("min-w-0 flex-1 break-words pr-2 font-medium transition-colors", isOpen ? "text-violet-200" : "text-white")}>
                {faq.question}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
                  isOpen
                    ? "rotate-180 border-violet-500/40 bg-violet-500/20 text-violet-300"
                    : "border-slate-700 bg-slate-800/50 text-slate-400"
                )}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 leading-relaxed text-slate-400 sm:px-6 sm:pb-5">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
