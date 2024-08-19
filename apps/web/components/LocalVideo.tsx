import { useMemo } from "react";

interface LocalVideoProps extends React.ComponentPropsWithoutRef<"video"> {
  path: string;
}

export default function LocalVideo({ path, ...props }: LocalVideoProps) {
  const src = useMemo(() => `/api/files?path=${encodeURIComponent(path)}`, [path]);

  return <video src={src} {...props} />;
}
