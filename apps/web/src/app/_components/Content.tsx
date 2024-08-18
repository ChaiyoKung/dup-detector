"use client";
import { useDataStore } from "../_stores/useDataStore";
import { DuplicateFiles } from "./DuplicateFiles";

export function Content() {
  const data = useDataStore((state) => state.data);
  const error = useDataStore((state) => state.error);
  const isLoading = useDataStore((state) => state.isLoading);

  if (isLoading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (data === undefined) {
    return null;
  }

  if (data.length === 0) {
    return <div className="text-center text-gray-800">No duplicate files found</div>;
  }

  return data.map((paths, index) => (
    <DuplicateFiles key={paths.join("|")} title={`No. ${index + 1}`} filePaths={paths} />
  ));
}
