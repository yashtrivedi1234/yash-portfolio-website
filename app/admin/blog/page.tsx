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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
}

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  published: false,
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof emptyPost) & { id?: string } | null>(null);
  const [slugManual, setSlugManual] = useState(false);

  function load() {
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then(({ posts }) => {
        setPosts(posts ?? []);
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, []);

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

  async function handleSave() {
    if (!editing) return;
    const payload = {
      ...editing,
      coverImage: editing.coverImage || null,
    };
    const url = editing.id ? `/api/admin/blog/${editing.id}` : "/api/admin/blog";
    const res = await fetch(url, {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      notify.success("Blog post saved!");
      setEditing(null);
      setSlugManual(false);
      load();
    } else {
      const data = await res.json();
      notify.error(data.error ?? "Failed to save");
    }
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <div className={adminToolbarClass}>
        <AdminPageHeader title="Blog" description="Write articles for SEO and share your expertise." className="mb-0" />
        <button
          onClick={() => {
            setSlugManual(false);
            setEditing({ ...emptyPost });
          }}
          className={`${adminBtnPrimary} shrink-0 self-start`}
        >
          + New Post
        </button>
      </div>

      {editing && (
        <div className={`${adminCardClass} mb-6 space-y-4`}>
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
                onValueChange={(slug) => {
                  setSlugManual(true);
                  setEditing({ ...editing, slug });
                }}
              />
            </div>
          </div>
          <div>
            <label className={adminLabelClass}>Excerpt</label>
            <ValidatedTextarea fieldType="longText" className={adminInputClass} rows={2} value={editing.excerpt} onValueChange={(excerpt) => setEditing({ ...editing, excerpt })} />
          </div>
          <div>
            <label className={adminLabelClass}>Content</label>
            <ValidatedTextarea fieldType="longText" className={adminInputClass} rows={8} value={editing.content} onValueChange={(content) => setEditing({ ...editing, content })} />
          </div>
          <FileUploadField
            label="Cover Image (optional)"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            uploadType="og-image"
            currentUrl={editing.coverImage || undefined}
            onUploaded={(url) => setEditing({ ...editing, coverImage: url })}
          />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={editing.published}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              className="rounded"
            />
            Published
          </label>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleSave} className={adminBtnPrimary}>Save</button>
            <button onClick={() => { setEditing(null); setSlugManual(false); }} className={adminBtnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className={`${adminCardClass} ${adminListRowClass}`}>
            <div className="min-w-0">
              <h3 className="font-medium text-white">{post.title}</h3>
              <p className="text-sm text-slate-400">
                /blog/{post.slug} · {post.published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                onClick={() => {
                  setSlugManual(true);
                  setEditing({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    coverImage: post.coverImage ?? "",
                    published: post.published,
                  });
                }}
                className={adminBtnSecondary}
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (confirm("Delete this post?")) {
                    await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
                    load();
                  }
                }}
                className={adminBtnDanger}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
