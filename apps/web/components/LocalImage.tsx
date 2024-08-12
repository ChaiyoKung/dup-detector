import { useMemo } from "react";
import { WithRequired } from "../types";

export interface LocalImageProps extends WithRequired<React.ComponentPropsWithoutRef<"img">, "alt"> {
  path: string;
}

export function LocalImage({ path, alt, ...props }: LocalImageProps) {
  const src = useMemo(() => `/api/files?path=${encodeURIComponent(path)}`, [path]);

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} {...props} />;
}
