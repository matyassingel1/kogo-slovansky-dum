// Prefix for static assets referenced outside next/image (CSS bg, <video>, plain <img>).
// next/image + next/link handle basePath automatically; raw asset paths do not.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${p}`;
}
