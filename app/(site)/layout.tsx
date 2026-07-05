import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MobileHireBar } from "@/components/MobileHireBar";
import { getSiteConfig } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const config = await getSiteConfig();

  return (
    <div className="site-bg relative flex min-h-screen flex-col overflow-x-clip">
      <div className="site-grid pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none"
      >
        Skip to content
      </a>

      <Navbar />
      <main id="main-content" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <MobileHireBar label={config.mobileHireBar.label} href={config.mobileHireBar.href} />
    </div>
  );
}
