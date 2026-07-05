import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialIcon } from "@/components/SocialIcon";
import { JsonLd } from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/data";
import { getBreadcrumbLabels } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return createPageMetadata({
    title: `Contact ${config.name} | ${config.pageTitles.contactSuffix}`,
    description: config.contactPage.description ?? "",
    path: "/contact",
    config,
  });
}

export default async function ContactPage() {
  const config = await getSiteConfig();
  const crumbs = getBreadcrumbLabels(config);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: crumbs.home, url: "/" },
          { name: crumbs.contact, url: "/contact" },
        ], config)}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={config.contactPage.label}
            title={config.contactPage.title}
            description={config.contactPage.description}
          />

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <ContactForm form={config.contactPage.form} />
            </div>

            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="mb-6 text-xl font-semibold text-white">{config.contactPage.contactInfoHeading}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{config.contactPage.emailLabel}</p>
                      <a href={`mailto:${config.email}`} className="text-white hover:text-violet-400 transition-colors">{config.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{config.contactPage.phoneLabel}</p>
                      <a href={`tel:${config.phone}`} className="text-white hover:text-violet-400 transition-colors">{config.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{config.contactPage.locationLabel}</p>
                      <p className="text-white">{config.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl border-green-500/30 bg-green-500/5 p-6">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                  </span>
                  <p className="font-medium text-green-400">{config.availability}</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h2 className="mb-4 text-xl font-semibold text-white">{config.contactPage.connectHeading}</h2>
                <div className="flex flex-wrap gap-3">
                  {config.socialLinks.map((social) => {
                    const isEmail = social.href.startsWith("mailto:");
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-300 transition-all hover:-translate-y-0.5 hover:border-violet-500/50 hover:text-violet-400"
                      >
                        <SocialIcon icon={social.icon} className="h-4 w-4" />
                        {social.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
