"use client"
import { useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/extract-error-message";

export default function useLookupFile(path: string) {
  const [data, setData] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAsync = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/files/lookup?path=${encodeURIComponent(path)}`);
        const body = await response.json();
        if (!response.ok) throw new Error(body.message);
        setData(body.data);
      } catch (error) {
        const errorMessage = extractErrorMessage(error);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadAsync();
  }, [path]);

  return { data, error, isLoading };
}
