"use client";
import { useState } from "react";
import { useDataStore } from "../_stores/useDataStore";
import { useCwd } from "../../../hooks/useCwd";

export function Header() {
  const [dirPath, setDirPath] = useState<string>("");
  const fetchData = useDataStore((state) => state.fetchData);
  const isLoading = useDataStore((state) => state.isLoading);
  const { data } = useCwd();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(dirPath);
  };

  return (
    <header className="mx-auto p-4 bg-white rounded-bl-xl rounded-br-xl border-b">
      <div className="container max-w-4xl mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Dup-Detector</h1>
        <form onSubmit={handleSubmit} className="flex gap-1 items-end w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="dir-path" className="text-gray-500 text-sm">
              Enter directory absolute path:
            </label>
            <input
              type="text"
              name="dir-path"
              id="dir-path"
              placeholder={data}
              className="p-2 border rounded-xl bg-gray-50 outline-blue-500 text-gray-800 w-full"
              required
              disabled={isLoading}
              value={dirPath}
              onChange={(event) => setDirPath(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors border border-blue-500 text-white py-2 px-4 rounded-xl"
            disabled={isLoading}
          >
            Find
          </button>
        </form>
      </div>
    </header>
  );
}
