import { useMemo } from "react";
import { FilePreview } from "./FilePreview";

export interface FileProps {
  path: string;
}

export function File({ path }: FileProps) {
  const checkboxId = useMemo(() => ["select-path", path].join("|"), [path]);

  return (
    <label
      htmlFor={checkboxId}
      className="flex flex-col gap-2 items-start justify-between border bg-white rounded-xl p-4 cursor-pointer"
    >
      <div className="flex items-start gap-2">
        <input type="checkbox" name="select-path" id={checkboxId} value={path} className="accent-blue-500 mt-[1px]" />
        <span className="text-gray-800 text-xs break-all">{path}</span>
      </div>
      <FilePreview path={path} />
    </label>
  );
}
