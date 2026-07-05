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
      <div className={adminToolbarClass}>
        <AdminPageHeader title="Experience" description="Manage work history, education, and certifications." className="mb-0" />
        <button onClick={() => setEditing({ title: "", organization: "", location: "", period: "", description: "", type: "work", technologies: "" })} className={`${adminBtnPrimary} shrink-0 self-start`}>+ Add Entry</button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={adminLabelClass}>Title</label><ValidatedInput fieldType="title" className={adminInputClass} value={editing.title} onValueChange={(title) => setEditing({ ...editing, title })} /></div>
            <div><label className={adminLabelClass}>Organization</label><ValidatedInput fieldType="shortText" className={adminInputClass} value={editing.organization} onValueChange={(organization) => setEditing({ ...editing, organization })} /></div>
            <div><label className={adminLabelClass}>Period</label><ValidatedInput fieldType="shortText" className={adminInputClass} value={editing.period} onValueChange={(period) => setEditing({ ...editing, period })} /></div>
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
          <div><label className={adminLabelClass}>Description</label><ValidatedTextarea fieldType="longText" className={adminInputClass} rows={3} value={editing.description} onValueChange={(description) => setEditing({ ...editing, description })} /></div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>Save</button>
            <button onClick={() => setEditing(null)} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className={`${adminCardClass} ${adminListRowClass}`}>
            <div className="min-w-0"><h3 className="font-medium text-white">{item.title}</h3><p className="text-sm text-slate-400">{item.organization} · {item.period} · {item.type}</p></div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button onClick={() => setEditing({ id: item.id, title: item.title, organization: item.organization, location: item.location ?? "", period: item.period, description: item.description, type: item.type, technologies: item.technologies.join(", ") })} className={adminBtnSecondary}>Edit</button>
              <button onClick={async () => { if (confirm("Delete?")) { await fetch(`/api/admin/experience/${item.id}`, { method: "DELETE" }); load(); } }} className={adminBtnDanger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
