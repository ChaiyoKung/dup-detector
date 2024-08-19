import { useDataStore } from "../_stores/useDataStore";
import { FilePreview } from "./FilePreview";

export interface FileProps {
  path: string;
  showDelete?: boolean;
}

export function File({ path, showDelete = false }: FileProps) {
  const deleteFile = useDataStore((state) => state.deleteData);

  return (
    <div className="flex flex-col gap-2 justify-between border bg-white rounded-xl p-4">
      <div className="flex items-start gap-2">
        <div className="text-gray-800 text-xs break-all w-full">{path}</div>
        {showDelete && (
          <button
            className="text-xs bg-red-500 hover:bg-red-600 transition-colors border border-red-500 text-white px-2 py-1 rounded-full"
            onClick={() => deleteFile(path, true)}
          >
            Del
          </button>
        )}
      </div>
      <FilePreview path={path} />
    </div>
  );
}
