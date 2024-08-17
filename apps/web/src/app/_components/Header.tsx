"use client";
import { useState } from "react";
import { useDataStore } from "../_stores/useDataStore";

export function Header() {
  const [dirPath, setDirPath] = useState<string>("");
  const fetchData = useDataStore((state) => state.fetchData);
  const isLoading = useDataStore((state) => state.isLoading);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(dirPath);
  };

  return (
    <header className="mx-auto p-4 bg-white rounded-bl-xl rounded-br-xl border-b text-center flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800">Dup-Detector</h1>
      <form onSubmit={handleSubmit} className="flex gap-1 items-end">
        <div className="flex flex-col">
          <label htmlFor="dir-path" className="text-gray-500">
            Enter directory absolute path:
          </label>
          <input
            type="text"
            name="dir-path"
            id="dir-path"
            placeholder="D:/Projects/dup-detector/apps/cli/demo"
            className="p-2 border bg-white rounded-xl bg-gray-50 outline-blue-500 text-gray-800"
            required
            disabled={isLoading}
            value={dirPath}
            onChange={(event) => setDirPath(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 border border-blue-500 text-white p-2 rounded-xl"
          disabled={isLoading}
        >
          Find
        </button>
      </form>
    </header>
  );
}
