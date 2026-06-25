"use client";

import Image from "next/image";
import { useState } from "react";
import { resolveBlogImage } from "@/utils/blogImageResolver";

const DEFAULT = "/blog/perfect-sensitivity.webp";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  className?: string;
  priority?: boolean;
}

export default function BlogImage({ src, ...props }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(() => resolveBlogImage(src));

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(DEFAULT)}
    />
  );
}
