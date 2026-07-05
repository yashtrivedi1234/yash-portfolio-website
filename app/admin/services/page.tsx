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

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ id?: string; title: string; description: string; icon: string; benefits: string } | null>(null);

  function load() {
    fetch("/api/admin/services").then((r) => r.json()).then(({ services }) => {
      setServices(services ?? []);
      setLoading(false);
    });
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    const payload = { ...editing, benefits: editing.benefits.split("\n").map((s) => s.trim()).filter(Boolean) };
    const url = editing.id ? `/api/admin/services/${editing.id}` : "/api/admin/services";
    const res = await fetch(url, { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { notify.success("Saved!"); setEditing(null); load(); }
    else notify.error("Failed to save");
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <div className={adminToolbarClass}>
        <AdminPageHeader title="Services" description="Manage services offered on your portfolio." className="mb-0" />
        <button onClick={() => setEditing({ title: "", description: "", icon: "globe", benefits: "" })} className={`${adminBtnPrimary} shrink-0 self-start`}>+ Add Service</button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <div><label className={adminLabelClass}>Title</label><ValidatedInput fieldType="title" className={adminInputClass} value={editing.title} onValueChange={(title) => setEditing({ ...editing, title })} /></div>
          <div><label className={adminLabelClass}>Description</label><ValidatedTextarea fieldType="longText" className={adminInputClass} rows={2} value={editing.description} onValueChange={(description) => setEditing({ ...editing, description })} /></div>
          <div><label className={adminLabelClass}>Benefits (one per line)</label><ValidatedTextarea fieldType="longText" className={adminInputClass} rows={3} value={editing.benefits} onValueChange={(benefits) => setEditing({ ...editing, benefits })} /></div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>Save</button>
            <button onClick={() => setEditing(null)} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className={`${adminCardClass} ${adminListRowClass}`}>
            <div className="min-w-0"><h3 className="font-medium text-white">{s.title}</h3><p className="line-clamp-1 text-sm text-slate-400">{s.description}</p></div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button onClick={() => setEditing({ id: s.id, title: s.title, description: s.description, icon: s.icon, benefits: s.benefits.join("\n") })} className={adminBtnSecondary}>Edit</button>
              <button onClick={async () => { if (confirm("Delete?")) { await fetch(`/api/admin/services/${s.id}`, { method: "DELETE" }); load(); } }} className={adminBtnDanger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
