import { getSiteConfig } from "@/lib/data";
import { FooterClient } from "@/components/FooterClient";

export async function Footer() {
  const config = await getSiteConfig();
  return (
    <FooterClient
      config={{
        name: config.name,
        shortBio: config.shortBio,
        socialLinks: config.socialLinks,
        navLinks: config.navLinks,
        footer: config.footer,
        legal: config.legal,
      }}
    />
  );
}
