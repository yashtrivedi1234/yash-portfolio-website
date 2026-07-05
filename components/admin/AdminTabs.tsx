"use client";

import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

export function AdminTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-800 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            active === tab.id
              ? "bg-violet-500/15 text-violet-400"
              : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function ListEditor({
  items,
  onChange,
  fields,
}: {
  items: Record<string, string>[];
  onChange: (items: Record<string, string>[]) => void;
  fields: { key: string; label: string; type?: "text" | "textarea" }[];
}) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 space-y-3">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-xs font-medium text-slate-400">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white"
                  rows={3}
                  value={item[f.key] ?? ""}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], [f.key]: e.target.value };
                    onChange(next);
                  }}
                />
              ) : (
                <input
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white"
                  value={item[f.key] ?? ""}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], [f.key]: e.target.value };
                    onChange(next);
                  }}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="text-xs text-red-400 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, Object.fromEntries(fields.map((f) => [f.key, ""]))])}
        className="text-sm text-violet-400 hover:underline"
      >
        + Add item
      </button>
    </div>
  );
}
