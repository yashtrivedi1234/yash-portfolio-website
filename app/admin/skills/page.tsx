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

interface Skill {
  id: string;
  name: string;
}

interface Category {
  id: string;
  category: string;
  description: string;
  skills: Skill[];
}

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCat, setEditingCat] = useState<{ id?: string; category: string; description: string } | null>(null);
  const [newSkill, setNewSkill] = useState<{ categoryId: string; name: string } | null>(null);

  function load() {
    fetch("/api/admin/skills/categories").then((r) => r.json()).then(({ categories: c }) => {
      setCategories(c ?? []);
      setLoading(false);
    });
  }

  useEffect(() => { load(); }, []);

  async function saveCategory() {
    if (!editingCat) return;
    const url = editingCat.id ? `/api/admin/skills/categories/${editingCat.id}` : "/api/admin/skills/categories";
    const res = await fetch(url, { method: editingCat.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingCat) });
    if (res.ok) { notify.success("Saved!"); setEditingCat(null); load(); }
    else notify.error("Failed");
  }

  async function addSkill() {
    if (!newSkill) return;
    const res = await fetch("/api/admin/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newSkill) });
    if (res.ok) { setNewSkill(null); load(); }
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <AdminPageHeader title="Skills" description="Manage skill categories and individual skills." />
        <button onClick={() => setEditingCat({ category: "", description: "" })} className={adminBtnPrimary}>+ Add Category</button>
      </div>

      {editingCat && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <div><label className={adminLabelClass}>Category Name</label><input className={adminInputClass} value={editingCat.category} onChange={(e) => setEditingCat({ ...editingCat, category: e.target.value })} /></div>
          <div><label className={adminLabelClass}>Description</label><textarea className={adminInputClass} rows={2} value={editingCat.description} onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })} /></div>
          <div className="flex gap-3">
            <button onClick={saveCategory} className={adminBtnPrimary}>Save</button>
            <button onClick={() => setEditingCat(null)} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className={adminCardClass}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">{cat.category}</h3>
                <p className="text-sm text-slate-400">{cat.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingCat({ id: cat.id, category: cat.category, description: cat.description })} className={adminBtnSecondary}>Edit</button>
                <button onClick={async () => { if (confirm("Delete category and all skills?")) { await fetch(`/api/admin/skills/categories/${cat.id}`, { method: "DELETE" }); load(); } }} className={adminBtnDanger}>Delete</button>
              </div>
            </div>
            <div className="space-y-2">
              {cat.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between rounded-lg border border-slate-800 px-4 py-2">
                  <span className="text-sm text-white">{skill.name}</span>
                  <button onClick={async () => { await fetch(`/api/admin/skills/${skill.id}`, { method: "DELETE" }); load(); }} className="text-xs text-red-400">Remove</button>
                </div>
              ))}
            </div>
            {newSkill?.categoryId === cat.id ? (
              <div className="mt-3 flex gap-2">
                <input className={adminInputClass} placeholder="Skill name" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} />
                <button onClick={addSkill} className={adminBtnPrimary}>Add</button>
                <button onClick={() => setNewSkill(null)} className={adminBtnSecondary}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setNewSkill({ categoryId: cat.id, name: "" })} className="mt-3 text-sm text-violet-400 hover:underline">+ Add skill</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
