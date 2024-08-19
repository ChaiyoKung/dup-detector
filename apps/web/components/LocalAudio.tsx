import { useMemo } from "react";

interface LocalAudioProps extends React.ComponentPropsWithoutRef<"audio"> {
  path: string;
}

export function LocalAudio({ path, ...props }: LocalAudioProps) {
  const src = useMemo(() => `/api/files?path=${encodeURIComponent(path)}`, [path]);

  return <audio src={src} {...props} />;
}
