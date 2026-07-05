"use client";

import { useEffect, useState } from "react";
import {
  AdminLoading,
  AdminPageHeader,
  adminBtnDanger,
  adminBtnPrimary,
  adminBtnSecondary,
  adminCardClass,
  adminInputClass,
  adminLabelClass,
  adminListRowClass,
  adminToolbarClass,
} from "@/components/admin/AdminUI";
import { ValidatedInput, ValidatedTextarea } from "@/components/ValidatedField";
import { notify } from "@/lib/toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ id?: string; name: string; role: string; company: string; content: string; avatar: string; rating: number } | null>(null);

  function load() {
    fetch("/api/admin/testimonials").then((r) => r.json()).then(({ testimonials }) => { setTestimonials(testimonials ?? []); setLoading(false); });
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    const url = editing.id ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials";
    const res = await fetch(url, { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) { notify.success("Saved!"); setEditing(null); load(); }
    else notify.error("Failed to save");
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <div className={adminToolbarClass}>
        <AdminPageHeader title="Testimonials" description="Manage work highlights and testimonials." className="mb-0" />
        <button onClick={() => setEditing({ name: "", role: "", company: "", content: "", avatar: "/images/avatars/avatar-1.svg", rating: 5 })} className={`${adminBtnPrimary} shrink-0 self-start`}>+ Add</button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={adminLabelClass}>Name</label><ValidatedInput fieldType="personName" className={adminInputClass} value={editing.name} onValueChange={(name) => setEditing({ ...editing, name })} /></div>
            <div><label className={adminLabelClass}>Role</label><ValidatedInput fieldType="title" className={adminInputClass} value={editing.role} onValueChange={(role) => setEditing({ ...editing, role })} /></div>
          </div>
          <div><label className={adminLabelClass}>Content</label><ValidatedTextarea fieldType="longText" className={adminInputClass} rows={3} value={editing.content} onValueChange={(content) => setEditing({ ...editing, content })} /></div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>Save</button>
            <button onClick={() => setEditing(null)} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className={`${adminCardClass} ${adminListRowClass}`}>
            <div className="min-w-0"><h3 className="font-medium text-white">{t.name}</h3><p className="line-clamp-2 text-sm text-slate-400">{t.content}</p></div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button onClick={() => setEditing({ id: t.id, name: t.name, role: t.role, company: t.company, content: t.content, avatar: t.avatar, rating: t.rating })} className={adminBtnSecondary}>Edit</button>
              <button onClick={async () => { if (confirm("Delete?")) { await fetch(`/api/admin/testimonials/${t.id}`, { method: "DELETE" }); load(); } }} className={adminBtnDanger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
