import { getSiteConfig } from "@/lib/data";
import { NavbarClient } from "@/components/NavbarClient";

export async function Navbar() {
  const config = await getSiteConfig();
  return <NavbarClient config={{ name: config.name, navLinks: config.navLinks, navbar: config.navbar }} />;
}
