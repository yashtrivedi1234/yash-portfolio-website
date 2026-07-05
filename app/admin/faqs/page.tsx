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
import { notify } from "@/lib/toast";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ id?: string; question: string; answer: string } | null>(null);

  function load() {
    fetch("/api/admin/faqs").then((r) => r.json()).then(({ faqs }) => { setFaqs(faqs ?? []); setLoading(false); });
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    const url = editing.id ? `/api/admin/faqs/${editing.id}` : "/api/admin/faqs";
    const res = await fetch(url, { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) { notify.success("Saved!"); setEditing(null); load(); }
    else notify.error("Failed to save");
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <div className={adminToolbarClass}>
        <AdminPageHeader title="FAQs" description="Manage frequently asked questions." className="mb-0" />
        <button onClick={() => setEditing({ question: "", answer: "" })} className={`${adminBtnPrimary} shrink-0 self-start`}>+ Add FAQ</button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <div><label className={adminLabelClass}>Question</label><input className={adminInputClass} value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} /></div>
          <div><label className={adminLabelClass}>Answer</label><textarea className={adminInputClass} rows={4} value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} /></div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>Save</button>
            <button onClick={() => setEditing(null)} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className={`${adminCardClass} ${adminListRowClass}`}>
            <div className="min-w-0"><h3 className="font-medium text-white">{f.question}</h3><p className="line-clamp-1 text-sm text-slate-400">{f.answer}</p></div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button onClick={() => setEditing({ id: f.id, question: f.question, answer: f.answer })} className={adminBtnSecondary}>Edit</button>
              <button onClick={async () => { if (confirm("Delete?")) { await fetch(`/api/admin/faqs/${f.id}`, { method: "DELETE" }); load(); } }} className={adminBtnDanger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
