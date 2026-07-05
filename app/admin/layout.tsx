import { getSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/ToastProvider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <>
      {session ? <AdminShell admin={session}>{children}</AdminShell> : children}
      <ToastProvider />
    </>
  );
}
