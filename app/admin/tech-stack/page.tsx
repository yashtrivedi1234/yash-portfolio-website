"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
} from "@/components/admin/AdminUI";
import { FileUploadField } from "@/components/admin/FileUploadField";
import { ValidatedInput } from "@/components/ValidatedField";
import { TechIcon } from "@/lib/tech-icons";

interface TechItem {
  id: string;
  name: string;
  logo: string | null;
}

const emptyForm = { name: "", logo: "" };

export default function AdminTechStackPage() {
  const [items, setItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState(emptyForm);
  const [editing, setEditing] = useState<{ id: string; name: string; logo: string } | null>(null);

  function load() {
    fetch("/api/admin/tech-stack")
      .then((r) => r.json())
      .then(({ items: i }) => {
        setItems(i ?? []);
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, []);

  async function addItem() {
    if (!newItem.name.trim()) return;
    await fetch("/api/admin/tech-stack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newItem.name.trim(),
        logo: newItem.logo || null,
      }),
    });
    setNewItem(emptyForm);
    setAdding(false);
    load();
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title="Tech Stack Strip"
        description="Manage the scrolling tech stack on the home page. Upload logos or use built-in icons when no logo is set."
      />

      <div className="mb-6">
        {!adding ? (
          <button onClick={() => setAdding(true)} className={adminBtnPrimary}>
            + Add Tech
          </button>
        ) : (
          <div className={`${adminCardClass} space-y-4`}>
            <h3 className="font-semibold text-white">New Tech Item</h3>
            <div>
              <label className={adminLabelClass}>Name</label>
              <ValidatedInput
                fieldType="techName"
                className={adminInputClass}
                placeholder="e.g. Next.js"
                value={newItem.name}
                onValueChange={(name) => setNewItem({ ...newItem, name })}
              />
            </div>
            <FileUploadField
              label="Logo (optional)"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              uploadType="tech-stack"
              previewShape="square"
              currentUrl={newItem.logo || undefined}
              onUploaded={(url) => setNewItem({ ...newItem, logo: url })}
            />
            <div className="flex flex-wrap gap-2">
              <button onClick={addItem} className={adminBtnPrimary}>
                Save
              </button>
              <button
                onClick={() => {
                  setAdding(false);
                  setNewItem(emptyForm);
                }}
                className={adminBtnSecondary}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`${adminCardClass} ${adminListRowClass} py-3`}>
            {editing?.id === item.id ? (
              <div className="w-full space-y-4">
                <div>
                  <label className={adminLabelClass}>Name</label>
                  <ValidatedInput
                    fieldType="techName"
                    className={adminInputClass}
                    value={editing.name}
                    onValueChange={(name) => setEditing({ ...editing, name })}
                  />
                </div>
                <FileUploadField
                  label="Logo (optional)"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  uploadType="tech-stack"
                  previewShape="square"
                  currentUrl={editing.logo || undefined}
                  onUploaded={(url) => setEditing({ ...editing, logo: url })}
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={async () => {
                      await fetch(`/api/admin/tech-stack/${item.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: editing.name,
                          logo: editing.logo || null,
                        }),
                      });
                      setEditing(null);
                      load();
                    }}
                    className={adminBtnPrimary}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditing(null)} className={adminBtnSecondary}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-800/60 text-violet-400">
                    {item.logo ? (
                      <Image src={item.logo} alt="" fill className="object-contain p-1" />
                    ) : (
                      <TechIcon name={item.name} className="h-5 w-5" />
                    )}
                  </span>
                  <span className="min-w-0 text-white">{item.name}</span>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    onClick={() =>
                      setEditing({ id: item.id, name: item.name, logo: item.logo ?? "" })
                    }
                    className={adminBtnSecondary}
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Delete?")) {
                        await fetch(`/api/admin/tech-stack/${item.id}`, { method: "DELETE" });
                        load();
                      }
                    }}
                    className={adminBtnDanger}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
