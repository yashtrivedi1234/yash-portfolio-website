"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function parseStatValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { number: null as number | null, suffix: value, decimals: 0 };
  const num = parseFloat(match[1]);
  const suffix = match[2] ?? "";
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { number: num, suffix, decimals };
}

export function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const { number, suffix, decimals } = parseStatValue(value);

  useEffect(() => {
    if (number === null) return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let start = 0;
    const duration = 1200;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const animate = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = number * eased;
          setDisplay(`${decimals ? current.toFixed(decimals) : Math.round(current)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [number, suffix, decimals]);

  return (
    <span ref={ref} className={cn(className)}>
      {display}
    </span>
  );
}
