import { File } from "./File";

export interface DuplicateFilesProps {
  title: string;
  filePaths: string[];
}

export function DuplicateFiles({ title, filePaths }: DuplicateFilesProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-bold border-b-2 border-blue-500 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-2">
        {filePaths.map((path) => (
          <File key={path} path={path} showDelete={filePaths.length > 1} />
        ))}
      </div>
    </section>
  );
}
