"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileHireBarProps {
  label: string;
  href: string;
}

export function MobileHireBar({ label, href }: MobileHireBarProps) {
  const pathname = usePathname();
  if (pathname === "/contact" || pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-violet-500/30 bg-slate-950/95 p-3 backdrop-blur-xl lg:hidden">
      <Link
        href={href}
        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        {label}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}
