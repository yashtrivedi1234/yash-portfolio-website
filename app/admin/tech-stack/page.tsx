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
  adminListRowClass,
} from "@/components/admin/AdminUI";

interface TechItem {
  id: string;
  name: string;
}

export default function AdminTechStackPage() {
  const [items, setItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<{ id: string; name: string } | null>(null);

  function load() {
    fetch("/api/admin/tech-stack").then((r) => r.json()).then(({ items: i }) => {
      setItems(i ?? []);
      setLoading(false);
    });
  }

  useEffect(() => { load(); }, []);

  async function addItem() {
    if (!newName.trim()) return;
    await fetch("/api/admin/tech-stack", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName.trim() }) });
    setNewName("");
    load();
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader title="Tech Stack Strip" description="Manage the scrolling tech stack on the home page." />

      <div className={`${adminCardClass} mb-6 flex flex-col gap-3 sm:flex-row`}>
        <input className={adminInputClass} placeholder="e.g. Next.js" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addItem()} />
        <button onClick={addItem} className={`${adminBtnPrimary} shrink-0`}>Add</button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`${adminCardClass} ${adminListRowClass} py-3`}>
            {editing?.id === item.id ? (
              <div className="flex w-full flex-col gap-2 sm:flex-row">
                <input className={adminInputClass} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                <div className="flex flex-wrap gap-2">
                <button onClick={async () => { await fetch(`/api/admin/tech-stack/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) }); setEditing(null); load(); }} className={adminBtnPrimary}>Save</button>
                <button onClick={() => setEditing(null)} className={adminBtnSecondary}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <span className="min-w-0 text-white">{item.name}</span>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button onClick={() => setEditing({ id: item.id, name: item.name })} className={adminBtnSecondary}>Edit</button>
                  <button onClick={async () => { if (confirm("Delete?")) { await fetch(`/api/admin/tech-stack/${item.id}`, { method: "DELETE" }); load(); } }} className={adminBtnDanger}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
