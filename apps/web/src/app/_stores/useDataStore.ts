import { create } from "zustand";
import { extractErrorMessage } from "../../../utils/extract-error-message";

export interface DataStore {
  data: string[][] | undefined;
  error: string | undefined;
  isLoading: boolean;
  fetchData: (dirPath: string) => void;
  deleteData: (filePath: string) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: undefined,
  error: undefined,
  isLoading: false,
  fetchData: async (dirPath) => {
    try {
      set({ data: undefined, error: undefined, isLoading: true });
      const response = await fetch(`/api/find-duplicate-files?dirPath=${encodeURIComponent(dirPath)}`);
      const body = await response.json();
      if (!response.ok) throw new Error(body.message);
      set({ data: body.data });
    } catch (error) {
      console.error(error);
      const errorMessage = extractErrorMessage(error);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteData: async (filePath) => {
    try {
      const response = await fetch("/api/files", {
        method: "DELETE",
        body: JSON.stringify({ path: filePath }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.message);
      set((state) => ({ data: state.data?.map((paths) => paths.filter((path) => path !== filePath)) }));
    } catch (error) {
      console.error(error);
    }
  },
}));
