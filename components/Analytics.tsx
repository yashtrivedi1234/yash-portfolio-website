"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Script from "next/script";

export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <>
      <VercelAnalytics />
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
