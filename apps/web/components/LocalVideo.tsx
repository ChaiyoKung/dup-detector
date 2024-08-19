import { useMemo } from "react";

export interface LocalVideoProps extends React.ComponentPropsWithoutRef<"video"> {
  path: string;
}

export function LocalVideo({ path, ...props }: LocalVideoProps) {
  const src = useMemo(() => `/api/files?path=${encodeURIComponent(path)}`, [path]);

  return <video src={src} {...props} />;
}
