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
  adminToolbarClass,
} from "@/components/admin/AdminUI";
import { FileUploadField } from "@/components/admin/FileUploadField";
import { ValidatedInput } from "@/components/ValidatedField";
import { notify } from "@/lib/toast";

interface Project {
  id: string;
  image: string;
  liveUrl: string;
}

const emptyProject = {
  image: "/images/projects/ecommerce-dashboard.svg",
  liveUrl: "",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof emptyProject) & { id?: string } | null>(null);

  function openNewProject() {
    setEditing({ ...emptyProject });
  }

  function openEditProject(p: Project) {
    setEditing({
      id: p.id,
      image: p.image,
      liveUrl: p.liveUrl,
    });
  }

  function loadProjects() {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then(({ projects }) => {
        setProjects(projects ?? []);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleSave() {
    if (!editing) return;

    if (!editing.image.trim()) {
      notify.error("Project image is required");
      return;
    }
    if (!editing.liveUrl.trim()) {
      notify.error("Live URL is required");
      return;
    }

    const payload = {
      image: editing.image,
      liveUrl: editing.liveUrl,
    };

    const url = editing.id ? `/api/admin/projects/${editing.id}` : "/api/admin/projects";
    const method = editing.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      notify.success(editing.id ? "Project updated!" : "Project created!");
      setEditing(null);
      loadProjects();
    } else {
      notify.error("Failed to save project");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    loadProjects();
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <div className={adminToolbarClass}>
        <AdminPageHeader
          title="Projects"
          description="Add projects with an image and live URL only."
          className="mb-0"
        />
        <button onClick={openNewProject} className={`${adminBtnPrimary} shrink-0 self-start`}>
          + Add Project
        </button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <h3 className="font-semibold text-white">{editing.id ? "Edit Project" : "New Project"}</h3>
          <FileUploadField
            label="Project Image"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            uploadType="project"
            currentUrl={editing.image}
            onUploaded={(url) => setEditing({ ...editing, image: url })}
          />
          <div>
            <label className={adminLabelClass}>Image URL</label>
            <ValidatedInput
              fieldType="url"
              className={adminInputClass}
              value={editing.image}
              onValueChange={(image) => setEditing({ ...editing, image })}
            />
          </div>
          <div>
            <label className={adminLabelClass}>Live URL</label>
            <ValidatedInput
              fieldType="url"
              className={adminInputClass}
              value={editing.liveUrl}
              onValueChange={(liveUrl) => setEditing({ ...editing, liveUrl })}
              placeholder="https://example.com"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>
              Save
            </button>
            <button onClick={() => setEditing(null)} className={adminBtnSecondary}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className={`${adminCardClass} ${adminListRowClass} gap-4`}>
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-700">
                <Image src={p.image} alt="" fill className="object-cover" />
              </div>
              <p className="truncate text-sm text-slate-400">{p.liveUrl}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button onClick={() => openEditProject(p)} className={adminBtnSecondary}>
                Edit
              </button>
              <button onClick={() => handleDelete(p.id)} className={adminBtnDanger}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
