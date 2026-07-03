import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy policy for ${siteConfig.name}'s portfolio website. Learn how your information is collected, used, and protected.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" },
        ])}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Privacy Policy"
            description={`Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
          />

          <div className="prose prose-invert max-w-none space-y-8 text-slate-400">
            <section>
              <h2 className="text-xl font-semibold text-white">Introduction</h2>
              <p>
                This Privacy Policy describes how {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                collects, uses, and protects your information when you visit our portfolio website at{" "}
                {siteConfig.portfolioUrl}.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
              <p>
                When you use our contact form, we may collect your name, email address, subject, and message content.
                We may also collect standard web analytics data such as browser type, device information, and pages visited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and contact requests</li>
                <li>Improve our website and user experience</li>
                <li>Analyze website traffic and usage patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Data Storage</h2>
              <p>
                This website does not use a database. Contact form submissions are handled on the frontend and may be
                integrated with third-party services (such as Formspree or EmailJS) for message delivery. Please refer
                to those services&apos; privacy policies for information about how they handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Cookies</h2>
              <p>
                We may use essential cookies for website functionality. We do not use tracking cookies or sell your
                personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Your Rights</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal data. To exercise
                these rights, please contact us at {siteConfig.email}.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Contact</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
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
