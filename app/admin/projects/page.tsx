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
import { FileUploadField } from "@/components/admin/FileUploadField";
import { ValidatedInput, ValidatedTextarea } from "@/components/ValidatedField";
import { notify } from "@/lib/toast";
import { slugify } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  category: string;
  year: string;
  status: string;
  featured: boolean;
  liveUrl: string;
  features: string[];
  problem?: string | null;
  solution?: string | null;
  result?: string | null;
  metrics?: { label: string; value: string }[] | null;
  gallery?: string[];
}

const emptyProject = {
  title: "",
  slug: "",
  description: "",
  longDescription: "",
  image: "/images/projects/ecommerce-dashboard.svg",
  techStack: "",
  category: "Web Application",
  year: new Date().getFullYear().toString(),
  status: "Completed",
  featured: false,
  liveUrl: "#",
  features: "",
  problem: "",
  solution: "",
  result: "",
  metrics: "",
  gallery: "",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof emptyProject) & { id?: string } | null>(null);
  const [slugManual, setSlugManual] = useState(false);

  function openNewProject() {
    setSlugManual(false);
    setEditing({ ...emptyProject });
  }

  function openEditProject(p: Project) {
    setSlugManual(true);
    setEditing({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      longDescription: p.longDescription,
      image: p.image,
      techStack: p.techStack.join(", "),
      category: p.category,
      year: p.year,
      status: p.status,
      featured: p.featured,
      liveUrl: p.liveUrl,
      features: p.features.join("\n"),
      problem: p.problem ?? "",
      solution: p.solution ?? "",
      result: p.result ?? "",
      metrics: (p.metrics ?? []).map((m) => `${m.value}|${m.label}`).join("\n"),
      gallery: (p.gallery ?? []).join("\n"),
    });
  }

  function handleTitleChange(title: string) {
    setEditing((prev) =>
      prev
        ? {
            ...prev,
            title,
            slug: slugManual ? prev.slug : slugify(title),
          }
        : prev
    );
  }

  function handleSlugChange(slug: string) {
    setSlugManual(true);
    setEditing((prev) => (prev ? { ...prev, slug } : prev));
  }

  function loadProjects() {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then(({ projects }) => {
        setProjects(projects ?? []);
        setLoading(false);
      });
  }

  useEffect(() => { loadProjects(); }, []);

  async function handleSave() {
    if (!editing) return;

    const payload = {
      ...editing,
      techStack: editing.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      features: editing.features.split("\n").map((s) => s.trim()).filter(Boolean),
      problem: editing.problem || null,
      solution: editing.solution || null,
      result: editing.result || null,
      metrics: editing.metrics
        ? editing.metrics.split("\n").map((line) => {
            const [value, ...rest] = line.split("|");
            return { value: value?.trim() ?? "", label: rest.join("|").trim() };
          }).filter((m) => m.label && m.value)
        : null,
      gallery: editing.gallery.split("\n").map((s) => s.trim()).filter(Boolean),
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
      setSlugManual(false);
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
        <AdminPageHeader title="Projects" description="Manage your portfolio projects." className="mb-0" />
        <button onClick={openNewProject} className={`${adminBtnPrimary} shrink-0 self-start`}>
          + Add Project
        </button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
          <h3 className="font-semibold text-white">{editing.id ? "Edit Project" : "New Project"}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={adminLabelClass}>Title</label>
              <ValidatedInput fieldType="title" className={adminInputClass} value={editing.title} onValueChange={handleTitleChange} />
            </div>
            <div>
              <label className={adminLabelClass}>Slug</label>
              <ValidatedInput
                fieldType="slug"
                className={adminInputClass}
                value={editing.slug}
                onValueChange={handleSlugChange}
                placeholder="Auto-generated from title"
              />
              {!slugManual && editing.title && (
                <p className="mt-1 text-xs text-slate-500">Auto-generated from title</p>
              )}
            </div>
          </div>
          <div>
            <label className={adminLabelClass}>Description</label>
            <ValidatedTextarea fieldType="longText" className={adminInputClass} rows={2} value={editing.description} onValueChange={(description) => setEditing({ ...editing, description })} />
          </div>
          <div>
            <label className={adminLabelClass}>Long Description</label>
            <ValidatedTextarea fieldType="longText" className={adminInputClass} rows={3} value={editing.longDescription} onValueChange={(longDescription) => setEditing({ ...editing, longDescription })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={adminLabelClass}>Category</label>
              <ValidatedInput fieldType="shortText" className={adminInputClass} value={editing.category} onValueChange={(category) => setEditing({ ...editing, category })} />
            </div>
            <div>
              <label className={adminLabelClass}>Year</label>
              <ValidatedInput fieldType="year" className={adminInputClass} value={editing.year} onValueChange={(year) => setEditing({ ...editing, year })} />
            </div>
            <div>
              <label className={adminLabelClass}>Status</label>
              <select className={adminInputClass} value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Featured</option>
              </select>
            </div>
          </div>
          <div>
            <label className={adminLabelClass}>Tech Stack (comma separated)</label>
            <ValidatedInput fieldType="techStack" className={adminInputClass} value={editing.techStack} onValueChange={(techStack) => setEditing({ ...editing, techStack })} />
          </div>
          <div>
            <label className={adminLabelClass}>Features (one per line)</label>
            <ValidatedTextarea fieldType="longText" className={adminInputClass} rows={3} value={editing.features} onValueChange={(features) => setEditing({ ...editing, features })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={adminLabelClass}>Problem</label>
              <ValidatedTextarea fieldType="longText" className={adminInputClass} rows={3} value={editing.problem} onValueChange={(problem) => setEditing({ ...editing, problem })} />
            </div>
            <div>
              <label className={adminLabelClass}>Solution</label>
              <ValidatedTextarea fieldType="longText" className={adminInputClass} rows={3} value={editing.solution} onValueChange={(solution) => setEditing({ ...editing, solution })} />
            </div>
            <div>
              <label className={adminLabelClass}>Result</label>
              <ValidatedTextarea fieldType="longText" className={adminInputClass} rows={3} value={editing.result} onValueChange={(result) => setEditing({ ...editing, result })} />
            </div>
          </div>
          <div>
            <label className={adminLabelClass}>Metrics (value|label per line, e.g. 99.9%|Uptime SLA)</label>
            <ValidatedTextarea fieldType="metricsBlock" className={adminInputClass} rows={3} value={editing.metrics} onValueChange={(metrics) => setEditing({ ...editing, metrics })} />
          </div>
          <div>
            <label className={adminLabelClass}>Gallery URLs (one per line)</label>
            <ValidatedTextarea fieldType="urlList" className={adminInputClass} rows={2} value={editing.gallery} onValueChange={(gallery) => setEditing({ ...editing, gallery })} />
          </div>
          <FileUploadField
            label="Project Image"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            uploadType="project"
            currentUrl={editing.image}
            onUploaded={(url) => setEditing({ ...editing, image: url })}
          />
          <div>
            <label className={adminLabelClass}>Image Path</label>
            <ValidatedInput fieldType="url" className={adminInputClass} value={editing.image} onValueChange={(image) => setEditing({ ...editing, image })} />
          </div>
          <div>
            <label className={adminLabelClass}>Live URL</label>
            <ValidatedInput fieldType="url" className={adminInputClass} value={editing.liveUrl} onValueChange={(liveUrl) => setEditing({ ...editing, liveUrl })} />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded" />
            Featured project
          </label>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>Save</button>
            <button onClick={() => { setEditing(null); setSlugManual(false); }} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className={`${adminCardClass} ${adminListRowClass} gap-4`}>
            <div className="min-w-0">
              <h3 className="font-medium text-white">{p.title}</h3>
              <p className="text-sm text-slate-400">{p.category} · {p.year} · {p.status}{p.featured && " · Featured"}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                onClick={() => openEditProject(p)}
                className={adminBtnSecondary}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(p.id)} className={adminBtnDanger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
