import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Terms and conditions for using ${siteConfig.name}'s portfolio website and services.`,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Terms & Conditions", url: "/terms-and-conditions" },
        ])}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Terms & Conditions"
            description={`Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
          />

          <div className="prose prose-invert max-w-none space-y-8 text-slate-400">
            <section>
              <h2 className="text-xl font-semibold text-white">Acceptance of Terms</h2>
              <p>
                By accessing and using the website at {siteConfig.portfolioUrl}, you accept and agree to be bound by
                these Terms and Conditions. If you do not agree, please do not use this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Use of Website</h2>
              <p>
                This website is provided for informational purposes to showcase the professional work and services of{" "}
                {siteConfig.name}. You may browse the content for personal, non-commercial use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Intellectual Property</h2>
              <p>
                All content on this website, including text, images, code samples, and design elements, is the
                intellectual property of {siteConfig.name} unless otherwise stated. Unauthorized reproduction or
                distribution is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Services</h2>
              <p>
                Web development services described on this website are subject to separate agreements. Project scope,
                timelines, and pricing will be defined in individual contracts between {siteConfig.name} and the client.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Limitation of Liability</h2>
              <p>
                This website is provided &quot;as is&quot; without warranties of any kind. {siteConfig.name} shall not be
                liable for any damages arising from the use of this website or the information contained herein.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">External Links</h2>
              <p>
                This website may contain links to external websites. We are not responsible for the content or privacy
                practices of those sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the website after changes
                constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Contact</h2>
              <p>
                For questions about these Terms & Conditions, contact us at{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-violet-400 hover:underline">
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
