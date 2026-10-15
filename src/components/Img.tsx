import NextImage, { ImageProps } from "next/image";
import { asset } from "@/lib/asset";

// next/image in static export does NOT prefix basePath onto image src (known GH Pages bug),
// so we prefix it ourselves. Use <Img> everywhere instead of next/image directly.
export default function Img({ src, ...props }: ImageProps) {
  const finalSrc = typeof src === "string" ? asset(src) : src;
  return <NextImage src={finalSrc} {...props} />;
}
