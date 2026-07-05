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
} from "@/components/admin/AdminUI";
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
      <div className="mb-8 flex items-center justify-between">
        <AdminPageHeader title="Testimonials" description="Manage work highlights and testimonials." />
        <button onClick={() => setEditing({ name: "", role: "", company: "", content: "", avatar: "/images/avatars/avatar-1.svg", rating: 5 })} className={adminBtnPrimary}>+ Add</button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={adminLabelClass}>Name</label><input className={adminInputClass} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div><label className={adminLabelClass}>Role</label><input className={adminInputClass} value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></div>
          </div>
          <div><label className={adminLabelClass}>Content</label><textarea className={adminInputClass} rows={3} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></div>
          <div className="flex gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>Save</button>
            <button onClick={() => setEditing(null)} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className={`${adminCardClass} flex items-center justify-between`}>
            <div><h3 className="font-medium text-white">{t.name}</h3><p className="text-sm text-slate-400 line-clamp-2">{t.content}</p></div>
            <div className="flex gap-2">
              <button onClick={() => setEditing({ id: t.id, name: t.name, role: t.role, company: t.company, content: t.content, avatar: t.avatar, rating: t.rating })} className={adminBtnSecondary}>Edit</button>
              <button onClick={async () => { if (confirm("Delete?")) { await fetch(`/api/admin/testimonials/${t.id}`, { method: "DELETE" }); load(); } }} className={adminBtnDanger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
