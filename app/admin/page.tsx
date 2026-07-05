import Link from "next/link";
import { getAdminStats } from "@/lib/data";
import { AdminPageHeader } from "@/components/admin/AdminUI";

export default async function AdminDashboard() {
  let stats = { projects: 0, services: 0, messages: 0, unread: 0 };

  try {
    stats = await getAdminStats();
  } catch {
    // DB not connected yet
  }

  const cards = [
    { label: "Projects", value: stats.projects, href: "/admin/projects", color: "text-violet-400" },
    { label: "Services", value: stats.services, href: "/admin/services", color: "text-indigo-400" },
    { label: "Messages", value: stats.messages, href: "/admin/messages", color: "text-blue-400" },
    { label: "Unread", value: stats.unread, href: "/admin/messages", color: "text-amber-400" },
  ];

  const quickLinks = [
    { href: "/admin/site", label: "Site Settings", desc: "Name, bio, social links, SEO" },
    { href: "/admin/projects", label: "Manage Projects", desc: "Add, edit, or remove portfolio projects" },
    { href: "/admin/experience", label: "Experience", desc: "Work history, education, certifications" },
    { href: "/admin/faqs", label: "FAQs", desc: "Update frequently asked questions" },
  ];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Welcome back! Manage your entire portfolio website from here."
      />

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-violet-500/30"
          >
            <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
            <div className="mt-1 text-sm text-slate-400">{card.label}</div>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-violet-500/30"
          >
            <h3 className="font-medium text-white">{link.label}</h3>
            <p className="mt-1 text-sm text-slate-400">{link.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
