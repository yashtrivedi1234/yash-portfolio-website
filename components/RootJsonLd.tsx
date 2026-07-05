import { JsonLd } from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/data";
import { createPersonSchema, createWebsiteSchema } from "@/lib/seo";

export async function RootJsonLd() {
  const config = await getSiteConfig();
  return <JsonLd data={[createPersonSchema(config), createWebsiteSchema(config)]} />;
}
