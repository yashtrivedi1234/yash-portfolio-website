"use client";

import { useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  function prev() {
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <blockquote className="glass-card relative rounded-2xl p-6 sm:p-10">
        <svg
          className="absolute top-6 right-6 h-10 w-10 text-violet-500/10"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <div className="mb-4 flex gap-1">
          {Array.from({ length: current.rating }).map((_, i) => (
            <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <p className="mb-8 text-lg leading-relaxed text-slate-300 sm:text-xl">
          &ldquo;{current.content}&rdquo;
        </p>

        <footer className="flex items-center gap-4 border-t border-slate-800/80 pt-5">
          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-violet-500/20">
            <Image src={current.avatar} alt={current.name} fill className="object-cover" />
          </div>
          <div>
            <cite className="not-italic font-semibold text-white">{current.name}</cite>
            <p className="text-sm text-slate-500">
              {current.role}, {current.company}
            </p>
          </div>
        </footer>
      </blockquote>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="rounded-xl border border-slate-700 bg-slate-800/50 p-2.5 text-slate-300 transition-colors hover:border-violet-500/40 hover:text-violet-300"
          aria-label="Previous testimonial"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-violet-500" : "w-2 bg-slate-600 hover:bg-slate-500"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="rounded-xl border border-slate-700 bg-slate-800/50 p-2.5 text-slate-300 transition-colors hover:border-violet-500/40 hover:text-violet-300"
          aria-label="Next testimonial"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
