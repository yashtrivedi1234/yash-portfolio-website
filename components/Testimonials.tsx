import Image from "next/image";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {testimonials.map((testimonial) => (
        <blockquote
          key={testimonial.name}
          className="group glass-card relative rounded-2xl p-6 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 sm:p-8"
        >
          <svg
            className="absolute top-6 right-6 h-10 w-10 text-violet-500/10 transition-colors group-hover:text-violet-500/20"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <div className="mb-4 flex gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className="relative mb-6 leading-relaxed text-slate-300">&ldquo;{testimonial.content}&rdquo;</p>

          <footer className="flex items-center gap-4 border-t border-slate-800/80 pt-5">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-violet-500/20">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <cite className="not-italic font-semibold text-white">{testimonial.name}</cite>
              <p className="text-sm text-slate-500">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
