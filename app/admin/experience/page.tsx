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

interface Experience {
  id: string;
  title: string;
  organization: string;
  location: string | null;
  period: string;
  description: string;
  type: string;
  technologies: string[];
}

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ id?: string; title: string; organization: string; location: string; period: string; description: string; type: string; technologies: string } | null>(null);

  function load() {
    fetch("/api/admin/experience").then((r) => r.json()).then(({ items }) => { setItems(items ?? []); setLoading(false); });
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    const payload = { ...editing, technologies: editing.technologies.split(",").map((s) => s.trim()).filter(Boolean), location: editing.location || null };
    const url = editing.id ? `/api/admin/experience/${editing.id}` : "/api/admin/experience";
    const res = await fetch(url, { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { notify.success("Saved!"); setEditing(null); load(); }
    else notify.error("Failed to save");
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <AdminPageHeader title="Experience" description="Manage work history, education, and certifications." />
        <button onClick={() => setEditing({ title: "", organization: "", location: "", period: "", description: "", type: "work", technologies: "" })} className={adminBtnPrimary}>+ Add Entry</button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={adminLabelClass}>Title</label><input className={adminInputClass} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
            <div><label className={adminLabelClass}>Organization</label><input className={adminInputClass} value={editing.organization} onChange={(e) => setEditing({ ...editing, organization: e.target.value })} /></div>
            <div><label className={adminLabelClass}>Period</label><input className={adminInputClass} value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} /></div>
            <div>
              <label className={adminLabelClass}>Type</label>
              <select className={adminInputClass} value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}>
                <option value="work">Work</option>
                <option value="internship">Internship</option>
                <option value="education">Education</option>
                <option value="certification">Certification</option>
                <option value="achievement">Achievement</option>
              </select>
            </div>
          </div>
          <div><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div className="flex gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>Save</button>
            <button onClick={() => setEditing(null)} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className={`${adminCardClass} flex items-center justify-between`}>
            <div><h3 className="font-medium text-white">{item.title}</h3><p className="text-sm text-slate-400">{item.organization} · {item.period} · {item.type}</p></div>
            <div className="flex gap-2">
              <button onClick={() => setEditing({ id: item.id, title: item.title, organization: item.organization, location: item.location ?? "", period: item.period, description: item.description, type: item.type, technologies: item.technologies.join(", ") })} className={adminBtnSecondary}>Edit</button>
              <button onClick={async () => { if (confirm("Delete?")) { await fetch(`/api/admin/experience/${item.id}`, { method: "DELETE" }); load(); } }} className={adminBtnDanger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
