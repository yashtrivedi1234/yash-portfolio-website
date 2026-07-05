import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/data";
import { getBreadcrumbLabels, formatPageTitleText } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return createPageMetadata({
    title: `${config.legal.termsAndConditions.title} | ${config.name}`,
    description: formatPageTitleText(config.pageTitles.termsDescription, config.name),
    path: "/terms-and-conditions",
    config,
  });
}

export default async function TermsPage() {
  const config = await getSiteConfig();
  const page = config.legal.termsAndConditions;
  const crumbs = getBreadcrumbLabels(config);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: crumbs.home, url: "/" },
          { name: crumbs.terms, url: "/terms-and-conditions" },
        ], config)}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={page.title}
            description={`${config.labels.lastUpdatedLabel} ${new Date(page.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
          />

          <div className="prose prose-invert max-w-none space-y-8 text-slate-400">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <p className="whitespace-pre-wrap">{section.content.replace("{name}", config.name).replace("{email}", config.email).replace("{url}", config.portfolioUrl)}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
