import { create } from "zustand";
import { extractErrorMessage } from "../../../utils/extract-error-message";

export interface DataStore {
  data: string[][] | undefined;
  error: string | undefined;
  isLoading: boolean;
  fetchData: (dirPath: string) => void;
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
}));
