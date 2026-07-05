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
      <div className="mb-8 flex items-center justify-between">
        <AdminPageHeader title="Services" description="Manage services offered on your portfolio." />
        <button onClick={() => setEditing({ title: "", description: "", icon: "globe", benefits: "" })} className={adminBtnPrimary}>+ Add Service</button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <div><label className={adminLabelClass}>Title</label><input className={adminInputClass} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
          <div><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={2} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div><label className={adminLabelClass}>Benefits (one per line)</label><textarea className={adminInputClass} rows={3} value={editing.benefits} onChange={(e) => setEditing({ ...editing, benefits: e.target.value })} /></div>
          <div className="flex gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>Save</button>
            <button onClick={() => setEditing(null)} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className={`${adminCardClass} flex items-center justify-between`}>
            <div><h3 className="font-medium text-white">{s.title}</h3><p className="text-sm text-slate-400 line-clamp-1">{s.description}</p></div>
            <div className="flex gap-2">
              <button onClick={() => setEditing({ id: s.id, title: s.title, description: s.description, icon: s.icon, benefits: s.benefits.join("\n") })} className={adminBtnSecondary}>Edit</button>
              <button onClick={async () => { if (confirm("Delete?")) { await fetch(`/api/admin/services/${s.id}`, { method: "DELETE" }); load(); } }} className={adminBtnDanger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
