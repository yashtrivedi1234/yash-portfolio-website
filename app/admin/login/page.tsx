import { AdminLoginClient } from "@/components/admin/AdminLoginClient";
import { getSiteConfig } from "@/lib/data";

export default async function AdminLoginPage() {
  const config = await getSiteConfig();

  return (
    <AdminLoginClient
      login={config.adminLogin}
      avatarUrl={config.hero.profileImage}
      name={config.name}
    />
  );
}
