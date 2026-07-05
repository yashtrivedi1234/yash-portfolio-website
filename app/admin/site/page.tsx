"use client";

import { useEffect, useState } from "react";
import {
  AdminLoading,
  AdminPageHeader,
  adminBtnPrimary,
  adminCardClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminUI";
import { AdminTabs, ListEditor } from "@/components/admin/AdminTabs";
import { FileUploadField } from "@/components/admin/FileUploadField";
import type { FullSiteConfig } from "@/lib/site-config";
import { notify } from "@/lib/toast";

type SiteData = FullSiteConfig;

export default function AdminSitePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("profile");
  const [data, setData] = useState<SiteData | null>(null);

  useEffect(() => {
    fetch("/api/admin/site")
      .then((r) => r.json())
      .then(({ data: d }) => { setData(d); setLoading(false); });
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) notify.success("Saved successfully!");
    else notify.error("Failed to save");
  }

  function update(partial: Partial<SiteData>) {
    setData((prev) => (prev ? { ...prev, ...partial } : prev));
  }

  if (loading || !data) return <AdminLoading />;

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "seo", label: "SEO & Stats" },
    { id: "social", label: "Social & Nav" },
    { id: "hero", label: "Hero" },
    { id: "pages", label: "Home Page" },
    { id: "subpages", label: "Other Pages" },
    { id: "buttons", label: "Buttons & Labels" },
    { id: "adminlogin", label: "Admin Login" },
    { id: "about", label: "About Page" },
    { id: "legal", label: "Legal Pages" },
    { id: "notfound", label: "404 Page" },
  ];

  return (
    <>
      <AdminPageHeader title="Site Settings" description="Manage all website content, SEO, and page sections." />
      <AdminTabs tabs={tabs} active={tab} onChange={setTab} />

      <div className={`${adminCardClass} space-y-6`}>
        {tab === "profile" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={adminLabelClass}>Name</label><input className={adminInputClass} value={data.name} onChange={(e) => update({ name: e.target.value })} /></div>
              <div><label className={adminLabelClass}>Role</label><input className={adminInputClass} value={data.role} onChange={(e) => update({ role: e.target.value })} /></div>
              <div><label className={adminLabelClass}>Email</label><input className={adminInputClass} value={data.email} onChange={(e) => update({ email: e.target.value })} /></div>
              <div><label className={adminLabelClass}>Phone</label><input className={adminInputClass} value={data.phone} onChange={(e) => update({ phone: e.target.value })} /></div>
              <div><label className={adminLabelClass}>Location</label><input className={adminInputClass} value={data.location} onChange={(e) => update({ location: e.target.value })} /></div>
              <div><label className={adminLabelClass}>Portfolio URL</label><input className={adminInputClass} value={data.portfolioUrl} onChange={(e) => update({ portfolioUrl: e.target.value })} /></div>
              <div><label className={adminLabelClass}>Availability</label><input className={adminInputClass} value={data.availability} onChange={(e) => update({ availability: e.target.value })} /></div>
            </div>
            <div><label className={adminLabelClass}>Short Bio</label><textarea className={adminInputClass} rows={2} value={data.shortBio} onChange={(e) => update({ shortBio: e.target.value })} /></div>
            <div><label className={adminLabelClass}>Long Bio</label><textarea className={adminInputClass} rows={4} value={data.longBio} onChange={(e) => update({ longBio: e.target.value })} /></div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div><label className={adminLabelClass}>GitHub</label><input className={adminInputClass} value={data.github} onChange={(e) => update({ github: e.target.value })} /></div>
              <div><label className={adminLabelClass}>LinkedIn</label><input className={adminInputClass} value={data.linkedin} onChange={(e) => update({ linkedin: e.target.value })} /></div>
              <div><label className={adminLabelClass}>LeetCode</label><input className={adminInputClass} value={data.leetcode} onChange={(e) => update({ leetcode: e.target.value })} /></div>
            </div>
            <div className="space-y-4 rounded-xl border border-slate-800 p-4">
              <div>
                <h3 className="font-medium text-white">Resume</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Hero page par &quot;Download Resume&quot; button isi file/link ko use karta hai.
                </p>
              </div>
              <FileUploadField
                label="Upload PDF Resume"
                accept="application/pdf"
                uploadType="resume"
                currentUrl={data.resumeLink}
                onUploaded={(url) => update({ resumeLink: url })}
              />
              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-slate-800" />
                <span className="mx-3 shrink-0 text-xs text-slate-500">or external link</span>
                <div className="flex-grow border-t border-slate-800" />
              </div>
              <div>
                <label className={adminLabelClass}>External Resume URL</label>
                <p className="mb-2 text-xs text-slate-500">
                  Agar resume Google Drive / Dropbox par ho — wahan ka direct link yahan paste karo. Upload ki zaroorat nahi.
                </p>
                <input
                  className={adminInputClass}
                  value={data.resumeLink}
                  onChange={(e) => update({ resumeLink: e.target.value })}
                  placeholder="https://drive.google.com/... ya /resume.pdf"
                />
                {data.resumeLink && (
                  <a
                    href={data.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-violet-400 hover:underline"
                  >
                    Preview current resume →
                  </a>
                )}
              </div>
            </div>
          </>
        )}

        {tab === "seo" && (
          <>
            <div><label className={adminLabelClass}>SEO Title</label><input className={adminInputClass} value={data.seo.title} onChange={(e) => update({ seo: { ...data.seo, title: e.target.value } })} /></div>
            <div><label className={adminLabelClass}>SEO Description</label><textarea className={adminInputClass} rows={3} value={data.seo.description} onChange={(e) => update({ seo: { ...data.seo, description: e.target.value } })} /></div>
            <div><label className={adminLabelClass}>Keywords (comma separated)</label><input className={adminInputClass} value={data.seo.keywords.join(", ")} onChange={(e) => update({ seo: { ...data.seo, keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean) } })} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={adminLabelClass}>OG Image Path</label><input className={adminInputClass} value={data.seo.ogImage} onChange={(e) => update({ seo: { ...data.seo, ogImage: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Favicon URL</label><input className={adminInputClass} value={data.seo.favicon} onChange={(e) => update({ seo: { ...data.seo, favicon: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Theme Color</label><input className={adminInputClass} value={data.seo.themeColor} onChange={(e) => update({ seo: { ...data.seo, themeColor: e.target.value } })} /></div>
            </div>
            <FileUploadField
              label="Upload Favicon"
              accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon"
              uploadType="favicon"
              previewShape="square"
              currentUrl={data.seo.favicon}
              onUploaded={(url) => update({ seo: { ...data.seo, favicon: url } })}
            />
            <FileUploadField
              label="Upload OG Image"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              uploadType="og-image"
              currentUrl={data.seo.ogImage}
              onUploaded={(url) => update({ seo: { ...data.seo, ogImage: url } })}
            />
            <h3 className="font-medium text-white">Stats (Home Page)</h3>
            <ListEditor
              items={data.stats.map((s) => ({ label: s.label, value: s.value }))}
              onChange={(items) => update({ stats: items.map((i) => ({ label: i.label, value: i.value })) })}
              fields={[
                { key: "label", label: "Label" },
                { key: "value", label: "Value" },
              ]}
            />
            <h3 className="font-medium text-white">Page Titles (SEO)</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(data.pageTitles).map(([key, value]) => (
                <div key={key}>
                  <label className={adminLabelClass}>{key.replace(/([A-Z])/g, " $1").trim()}</label>
                  <input className={adminInputClass} value={value} onChange={(e) => update({ pageTitles: { ...data.pageTitles, [key]: e.target.value } })} />
                </div>
              ))}
            </div>
            <h3 className="font-medium text-white">PWA Manifest</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={adminLabelClass}>App Name</label><input className={adminInputClass} value={data.manifest.name} onChange={(e) => update({ manifest: { ...data.manifest, name: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Short Name</label><input className={adminInputClass} value={data.manifest.shortName} onChange={(e) => update({ manifest: { ...data.manifest, shortName: e.target.value } })} /></div>
              <div className="sm:col-span-2"><label className={adminLabelClass}>Description</label><input className={adminInputClass} value={data.manifest.description} onChange={(e) => update({ manifest: { ...data.manifest, description: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Background Color</label><input className={adminInputClass} value={data.manifest.backgroundColor} onChange={(e) => update({ manifest: { ...data.manifest, backgroundColor: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Icon URL</label><input className={adminInputClass} value={data.manifest.iconUrl} onChange={(e) => update({ manifest: { ...data.manifest, iconUrl: e.target.value } })} /></div>
            </div>
          </>
        )}

        {tab === "social" && (
          <>
            <h3 className="font-medium text-white">Social Links</h3>
            <ListEditor
              items={data.socialLinks.map((s) => ({ name: s.name, href: s.href, icon: s.icon }))}
              onChange={(items) => update({ socialLinks: items.map((i) => ({ name: i.name, href: i.href, icon: i.icon })) })}
              fields={[
                { key: "name", label: "Name" },
                { key: "href", label: "URL" },
                { key: "icon", label: "Icon (github, linkedin, leetcode, email)" },
              ]}
            />
            <h3 className="font-medium text-white">Navigation Links</h3>
            <ListEditor
              items={data.navLinks.map((s) => ({ name: s.name, href: s.href }))}
              onChange={(items) => update({ navLinks: items.map((i) => ({ name: i.name, href: i.href })) })}
              fields={[
                { key: "name", label: "Label" },
                { key: "href", label: "Path" },
              ]}
            />
            <div><label className={adminLabelClass}>Footer Built With Text</label><input className={adminInputClass} value={data.footer.builtWith} onChange={(e) => update({ footer: { ...data.footer, builtWith: e.target.value } })} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={adminLabelClass}>Footer Pages Heading</label><input className={adminInputClass} value={data.footer.pagesHeading} onChange={(e) => update({ footer: { ...data.footer, pagesHeading: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Footer Legal Heading</label><input className={adminInputClass} value={data.footer.legalHeading} onChange={(e) => update({ footer: { ...data.footer, legalHeading: e.target.value } })} /></div>
              <div className="sm:col-span-2"><label className={adminLabelClass}>Copyright Suffix</label><input className={adminInputClass} value={data.footer.copyrightSuffix} onChange={(e) => update({ footer: { ...data.footer, copyrightSuffix: e.target.value } })} /></div>
            </div>
            <h3 className="font-medium text-white">Navbar CTA Button</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={adminLabelClass}>Button Label</label><input className={adminInputClass} value={data.navbar.hireMeLabel} onChange={(e) => update({ navbar: { ...data.navbar, hireMeLabel: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Button Link</label><input className={adminInputClass} value={data.navbar.hireMeHref} onChange={(e) => update({ navbar: { ...data.navbar, hireMeHref: e.target.value } })} /></div>
            </div>
          </>
        )}

        {tab === "hero" && (
          <>
            <div><label className={adminLabelClass}>Badge Text</label><input className={adminInputClass} value={data.hero.badgeText} onChange={(e) => update({ hero: { ...data.hero, badgeText: e.target.value } })} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={adminLabelClass}>Greeting Prefix</label><input className={adminInputClass} value={data.hero.greetingPrefix} onChange={(e) => update({ hero: { ...data.hero, greetingPrefix: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Role Connector</label><input className={adminInputClass} value={data.hero.roleConnector} onChange={(e) => update({ hero: { ...data.hero, roleConnector: e.target.value } })} /></div>
            </div>
            <div><label className={adminLabelClass}>Headline Suffix</label><input className={adminInputClass} value={data.hero.headlineSuffix} onChange={(e) => update({ hero: { ...data.hero, headlineSuffix: e.target.value } })} /></div>
            <div><label className={adminLabelClass}>Extra Bio Text</label><textarea className={adminInputClass} rows={2} value={data.hero.extraBio} onChange={(e) => update({ hero: { ...data.hero, extraBio: e.target.value } })} /></div>
            <FileUploadField
              label="Upload Profile Photo"
              accept="image/jpeg,image/png,image/webp"
              uploadType="profile"
              currentUrl={data.hero.profileImage}
              onUploaded={(url) => update({ hero: { ...data.hero, profileImage: url } })}
            />
            <div><label className={adminLabelClass}>Profile Image Path (or use upload above)</label><input className={adminInputClass} value={data.hero.profileImage} onChange={(e) => update({ hero: { ...data.hero, profileImage: e.target.value } })} /></div>
            <div><label className={adminLabelClass}>Code Block Skills (comma separated)</label><input className={adminInputClass} value={data.hero.codeSkills.join(", ")} onChange={(e) => update({ hero: { ...data.hero, codeSkills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } })} /></div>
            <div><label className={adminLabelClass}>Code Window Title</label><input className={adminInputClass} value={data.hero.codeWindowTitle} onChange={(e) => update({ hero: { ...data.hero, codeWindowTitle: e.target.value } })} /></div>
            <h3 className="font-medium text-white">Code Block Variables</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={adminLabelClass}>Variable Name</label><input className={adminInputClass} value={data.heroCode.variableName} onChange={(e) => update({ heroCode: { ...data.heroCode, variableName: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Available Value</label><input className={adminInputClass} value={data.heroCode.availableValue} onChange={(e) => update({ heroCode: { ...data.heroCode, availableValue: e.target.value } })} /></div>
            </div>
          </>
        )}

        {tab === "pages" && (
          <>
            {Object.entries(data.homeSections).map(([key, section]) => (
              <div key={key} className="rounded-xl border border-slate-800 p-4 space-y-3">
                <h3 className="font-medium capitalize text-violet-400">{key} Section (Home)</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div><label className={adminLabelClass}>Label</label><input className={adminInputClass} value={section.label ?? ""} onChange={(e) => update({ homeSections: { ...data.homeSections, [key]: { ...section, label: e.target.value } } })} /></div>
                  <div><label className={adminLabelClass}>Title</label><input className={adminInputClass} value={section.title} onChange={(e) => update({ homeSections: { ...data.homeSections, [key]: { ...section, title: e.target.value } } })} /></div>
                  <div className="sm:col-span-3"><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={2} value={section.description ?? ""} onChange={(e) => update({ homeSections: { ...data.homeSections, [key]: { ...section, description: e.target.value } } })} /></div>
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-slate-800 p-4 space-y-3">
              <h3 className="font-medium text-violet-400">Contact Page</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><label className={adminLabelClass}>Title</label><input className={adminInputClass} value={data.contactPage.title} onChange={(e) => update({ contactPage: { ...data.contactPage, title: e.target.value } })} /></div>
                <div><label className={adminLabelClass}>Label</label><input className={adminInputClass} value={data.contactPage.label ?? ""} onChange={(e) => update({ contactPage: { ...data.contactPage, label: e.target.value } })} /></div>
                <div className="sm:col-span-2"><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={2} value={data.contactPage.description ?? ""} onChange={(e) => update({ contactPage: { ...data.contactPage, description: e.target.value } })} /></div>
                <div><label className={adminLabelClass}>Contact Info Heading</label><input className={adminInputClass} value={data.contactPage.contactInfoHeading} onChange={(e) => update({ contactPage: { ...data.contactPage, contactInfoHeading: e.target.value } })} /></div>
                <div><label className={adminLabelClass}>Connect Heading</label><input className={adminInputClass} value={data.contactPage.connectHeading} onChange={(e) => update({ contactPage: { ...data.contactPage, connectHeading: e.target.value } })} /></div>
                <div><label className={adminLabelClass}>Email Label</label><input className={adminInputClass} value={data.contactPage.emailLabel} onChange={(e) => update({ contactPage: { ...data.contactPage, emailLabel: e.target.value } })} /></div>
                <div><label className={adminLabelClass}>Phone Label</label><input className={adminInputClass} value={data.contactPage.phoneLabel} onChange={(e) => update({ contactPage: { ...data.contactPage, phoneLabel: e.target.value } })} /></div>
                <div><label className={adminLabelClass}>Location Label</label><input className={adminInputClass} value={data.contactPage.locationLabel} onChange={(e) => update({ contactPage: { ...data.contactPage, locationLabel: e.target.value } })} /></div>
              </div>
              <h4 className="font-medium text-white">Contact Form</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(data.contactPage.form).map(([key, value]) => (
                  <div key={key} className={key.includes("Message") || key.includes("Placeholder") && key === "messagePlaceholder" ? "sm:col-span-2" : ""}>
                    <label className={adminLabelClass}>{key.replace(/([A-Z])/g, " $1").trim()}</label>
                    {key.includes("Message") ? (
                      <textarea className={adminInputClass} rows={2} value={value} onChange={(e) => update({ contactPage: { ...data.contactPage, form: { ...data.contactPage.form, [key]: e.target.value } } })} />
                    ) : (
                      <input className={adminInputClass} value={value} onChange={(e) => update({ contactPage: { ...data.contactPage, form: { ...data.contactPage.form, [key]: e.target.value } } })} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 p-4 space-y-3">
              <h3 className="font-medium text-violet-400">CTA Block</h3>
              <div><label className={adminLabelClass}>Title</label><input className={adminInputClass} value={data.cta.title} onChange={(e) => update({ cta: { ...data.cta, title: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={2} value={data.cta.description} onChange={(e) => update({ cta: { ...data.cta, description: e.target.value } })} /></div>
            </div>
          </>
        )}

        {tab === "subpages" && (
          <>
            {Object.entries(data.pageHeadings).map(([key, section]) => (
              <div key={key} className="rounded-xl border border-slate-800 p-4 space-y-3">
                <h3 className="font-medium capitalize text-violet-400">{key} Page</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div><label className={adminLabelClass}>Label</label><input className={adminInputClass} value={section.label ?? ""} onChange={(e) => update({ pageHeadings: { ...data.pageHeadings, [key]: { ...section, label: e.target.value } } })} /></div>
                  <div><label className={adminLabelClass}>Title</label><input className={adminInputClass} value={section.title} onChange={(e) => update({ pageHeadings: { ...data.pageHeadings, [key]: { ...section, title: e.target.value } } })} /></div>
                  <div className="sm:col-span-3"><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={2} value={section.description ?? ""} onChange={(e) => update({ pageHeadings: { ...data.pageHeadings, [key]: { ...section, description: e.target.value } } })} /></div>
                </div>
              </div>
            ))}
            <h3 className="font-medium text-white">Experience Section Labels</h3>
            <ListEditor
              items={data.experienceSections.map((s) => ({ key: s.key, label: s.label }))}
              onChange={(items) => update({ experienceSections: items.map((i) => ({ key: i.key, label: i.label })) })}
              fields={[
                { key: "key", label: "Type key (work, internship, education, etc.)" },
                { key: "label", label: "Display Label" },
              ]}
            />
            <div className="rounded-xl border border-slate-800 p-4 space-y-3">
              <h3 className="font-medium text-violet-400">Services Page CTA</h3>
              <div><label className={adminLabelClass}>Title</label><input className={adminInputClass} value={data.pageCta.services.title} onChange={(e) => update({ pageCta: { ...data.pageCta, services: { ...data.pageCta.services, title: e.target.value } } })} /></div>
              <div><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={2} value={data.pageCta.services.description} onChange={(e) => update({ pageCta: { ...data.pageCta, services: { ...data.pageCta.services, description: e.target.value } } })} /></div>
            </div>
            <div className="rounded-xl border border-slate-800 p-4 space-y-3">
              <h3 className="font-medium text-violet-400">Skills Page CTA</h3>
              <div><label className={adminLabelClass}>Title</label><input className={adminInputClass} value={data.pageCta.skills.title} onChange={(e) => update({ pageCta: { ...data.pageCta, skills: { ...data.pageCta.skills, title: e.target.value } } })} /></div>
              <div><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={2} value={data.pageCta.skills.description} onChange={(e) => update({ pageCta: { ...data.pageCta, skills: { ...data.pageCta.skills, description: e.target.value } } })} /></div>
            </div>
          </>
        )}

        {tab === "buttons" && (
          <>
            <h3 className="font-medium text-white">Button Labels</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(data.buttons).map(([key, value]) => (
                <div key={key}>
                  <label className={adminLabelClass}>{key.replace(/([A-Z])/g, " $1").trim()}</label>
                  <input
                    className={adminInputClass}
                    value={value}
                    onChange={(e) => update({ buttons: { ...data.buttons, [key]: e.target.value } })}
                  />
                </div>
              ))}
            </div>
            <h3 className="font-medium text-white">UI Labels (Projects, Services, etc.)</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(data.labels).map(([key, value]) => (
                <div key={key}>
                  <label className={adminLabelClass}>{key.replace(/([A-Z])/g, " $1").trim()}</label>
                  <input
                    className={adminInputClass}
                    value={value}
                    onChange={(e) => update({ labels: { ...data.labels, [key]: e.target.value } })}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "adminlogin" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(data.adminLogin).map(([key, value]) => (
              <div key={key}>
                <label className={adminLabelClass}>{key.replace(/([A-Z])/g, " $1").trim()}</label>
                <input
                  className={adminInputClass}
                  value={value}
                  onChange={(e) => update({ adminLogin: { ...data.adminLogin, [key]: e.target.value } })}
                />
              </div>
            ))}
          </div>
        )}

        {tab === "notfound" && (
          <>
            <div><label className={adminLabelClass}>Error Code</label><input className={adminInputClass} value={data.notFound.errorCode} onChange={(e) => update({ notFound: { ...data.notFound, errorCode: e.target.value } })} /></div>
            <div><label className={adminLabelClass}>Title</label><input className={adminInputClass} value={data.notFound.title} onChange={(e) => update({ notFound: { ...data.notFound, title: e.target.value } })} /></div>
            <div><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={2} value={data.notFound.description} onChange={(e) => update({ notFound: { ...data.notFound, description: e.target.value } })} /></div>
            <div><label className={adminLabelClass}>Helper Text</label><input className={adminInputClass} value={data.notFound.helperText} onChange={(e) => update({ notFound: { ...data.notFound, helperText: e.target.value } })} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={adminLabelClass}>Primary Button</label><input className={adminInputClass} value={data.notFound.primaryLabel} onChange={(e) => update({ notFound: { ...data.notFound, primaryLabel: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Primary Link</label><input className={adminInputClass} value={data.notFound.primaryHref} onChange={(e) => update({ notFound: { ...data.notFound, primaryHref: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Secondary Button</label><input className={adminInputClass} value={data.notFound.secondaryLabel} onChange={(e) => update({ notFound: { ...data.notFound, secondaryLabel: e.target.value } })} /></div>
              <div><label className={adminLabelClass}>Secondary Link</label><input className={adminInputClass} value={data.notFound.secondaryHref} onChange={(e) => update({ notFound: { ...data.notFound, secondaryHref: e.target.value } })} /></div>
            </div>
          </>
        )}

        {tab === "about" && (
          <ListEditor
            items={data.aboutSections.map((s) => ({ title: s.title, content: s.content }))}
            onChange={(items) => update({ aboutSections: items.map((i) => ({ title: i.title, content: i.content })) })}
            fields={[
              { key: "title", label: "Section Title" },
              { key: "content", label: "Content", type: "textarea" },
            ]}
          />
        )}

        {tab === "legal" && (
          <>
            {(["privacyPolicy", "termsAndConditions"] as const).map((pageKey) => {
              const page = data.legal[pageKey];
              return (
                <div key={pageKey} className="space-y-4 rounded-xl border border-slate-800 p-4">
                  <h3 className="font-medium text-violet-400">{page.title}</h3>
                  <div><label className={adminLabelClass}>Page Title</label><input className={adminInputClass} value={page.title} onChange={(e) => update({ legal: { ...data.legal, [pageKey]: { ...page, title: e.target.value } } })} /></div>
                  <div><label className={adminLabelClass}>Last Updated</label><input className={adminInputClass} type="date" value={page.lastUpdated} onChange={(e) => update({ legal: { ...data.legal, [pageKey]: { ...page, lastUpdated: e.target.value } } })} /></div>
                  <ListEditor
                    items={page.sections.map((s) => ({ title: s.title, content: s.content }))}
                    onChange={(items) => update({ legal: { ...data.legal, [pageKey]: { ...page, sections: items.map((i) => ({ title: i.title, content: i.content })) } } })}
                    fields={[
                      { key: "title", label: "Section Title" },
                      { key: "content", label: "Content", type: "textarea" },
                    ]}
                  />
                </div>
              );
            })}
          </>
        )}

        <button onClick={save} disabled={saving} className={adminBtnPrimary}>
          {saving ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </>
  );
}
