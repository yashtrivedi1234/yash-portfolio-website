import { fetchFaviconResponse } from "@/lib/favicon";

export const revalidate = 60;

export default function AppleIcon() {
  return fetchFaviconResponse();
}
