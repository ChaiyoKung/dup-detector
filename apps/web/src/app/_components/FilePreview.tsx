import { useLookupFile } from "../../../hooks/useLookupFile";
import { LocalImage } from "../../../components/LocalImage";
import { LocalVideo } from "../../../components/LocalVideo";
import { LocalAudio } from "../../../components/LocalAudio";

export interface FilePreviewProps {
  path: string;
}

export function FilePreview({ path }: FilePreviewProps) {
  const { isLoading, error, data } = useLookupFile(path);

  if (isLoading) {
    return <div className="text-gray-400 text-center w-full">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (data === undefined) {
    return null;
  }

  if (data.startsWith("application")) {
    return (
      <div className="text-teal-500 bg-teal-100 rounded-xl border border-teal-300 border-dashed p-2 w-full">{data}</div>
    );
  }

  if (data.startsWith("text")) {
    return (
      <div className="text-gray-500 bg-gray-100 rounded-xl border border-gray-300 border-dashed p-2 w-full">{data}</div>
    );
  }

  if (data.startsWith("image")) {
    return <LocalImage path={path} alt={path} className="rounded-xl max-h-48" />;
  }

  if (data.startsWith("audio")) {
    return <LocalAudio path={path} controls className="rounded-xl max-h-48 max-w-full" />;
  }

  if (data.startsWith("video")) {
    return <LocalVideo path={path} controls className="rounded-xl max-h-48" />;
  }

  return (
    <div className="text-green-500 bg-green-100 rounded-xl border border-green-300 border-dashed p-2 w-full">
      {data}
    </div>
  );
}
