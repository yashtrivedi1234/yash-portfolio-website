export const adminInputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500";

export const adminLabelClass = "mb-1.5 block text-sm font-medium text-slate-300";

export const adminCardClass = "rounded-2xl border border-slate-800 bg-slate-900/50 p-6";

export const adminBtnPrimary =
  "inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:opacity-50";

export const adminBtnSecondary =
  "inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800";

export const adminBtnDanger =
  "inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-500/10";

export function AdminPageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {description && <p className="mt-1 text-slate-400">{description}</p>}
    </div>
  );
}

export function AdminAlert({ type, message }: { type: "success" | "error"; message: string }) {
  const colors =
    type === "success"
      ? "border-green-500/30 bg-green-500/10 text-green-400"
      : "border-red-500/30 bg-red-500/10 text-red-400";
  return <div className={`mb-4 rounded-xl border px-4 py-3 text-sm ${colors}`}>{message}</div>;
}

export function AdminLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
    </div>
  );
}
