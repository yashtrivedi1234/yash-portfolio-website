"use client";

import { useEffect, useRef, useState } from "react";
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
  title: string;
  image: string;
  liveUrl: string;
}

const emptyProject = {
  title: "",
  image: "/images/projects/ecommerce-dashboard.svg",
  liveUrl: "",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<(typeof emptyProject) & { id?: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function scrollToForm() {
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function openNewProject() {
    setEditing({ ...emptyProject });
    scrollToForm();
  }

  function openEditProject(p: Project) {
    setEditing({
      id: p.id,
      title: p.title,
      image: p.image,
      liveUrl: p.liveUrl,
    });
    scrollToForm();
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

    if (!editing.title.trim()) {
      notify.error("Project name is required");
      return;
    }
    if (!editing.image.trim()) {
      notify.error("Project image is required");
      return;
    }
    if (!editing.liveUrl.trim()) {
      notify.error("Live URL is required");
      return;
    }

    const payload = {
      title: editing.title,
      image: editing.image,
      liveUrl: editing.liveUrl,
    };

    const url = editing.id ? `/api/admin/projects/${editing.id}` : "/api/admin/projects";
    const method = editing.id ? "PUT" : "POST";

    setSaving(true);
    try {
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
        const data = await res.json();
        notify.error(data.error ?? "Failed to save project");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;

    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      notify.success("Project deleted");
      if (editing?.id === id) setEditing(null);
      loadProjects();
    } else {
      notify.error("Failed to delete project");
    }
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <div className={adminToolbarClass}>
        <AdminPageHeader
          title="Projects"
          description="Add projects with a name, image, and live URL."
          className="mb-0"
        />
        <button onClick={openNewProject} className={`${adminBtnPrimary} shrink-0 self-start`}>
          + Add Project
        </button>
      </div>

      {editing && (
        <div ref={formRef} className={`${adminCardClass} mb-6 space-y-4 scroll-mt-24`}>
          <h3 className="font-semibold text-white">{editing.id ? "Edit Project" : "New Project"}</h3>
          <div>
            <label className={adminLabelClass}>Project Name</label>
            <ValidatedInput
              fieldType="title"
              className={adminInputClass}
              value={editing.title}
              onValueChange={(title) => setEditing({ ...editing, title })}
              placeholder="E-Commerce Dashboard"
            />
          </div>
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
            <button onClick={handleSave} className={adminBtnPrimary} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setEditing(null)} className={adminBtnSecondary} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {projects.length === 0 && !editing ? (
        <div className={`${adminCardClass} py-12 text-center`}>
          <p className="font-medium text-white">No projects yet</p>
          <p className="mt-2 text-sm text-slate-400">Add your first project with a name, screenshot, and live URL.</p>
          <button onClick={openNewProject} className={`${adminBtnPrimary} mt-6`}>
            + Add Project
          </button>
        </div>
      ) : (
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className={`${adminCardClass} ${adminListRowClass} gap-4`}>
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-700">
                <Image src={p.image} alt="" fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{p.title}</p>
                <p className="truncate text-sm text-slate-400">{p.liveUrl}</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {p.liveUrl && p.liveUrl !== "#" ? (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={adminBtnSecondary}
                >
                  Open
                </a>
              ) : null}
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
      )}
    </>
  );
}
