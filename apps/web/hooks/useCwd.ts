"use client";
import { useEffect, useState } from "react";
import { extractErrorMessage } from "../utils/extract-error-message";

export default function useCwd() {
  const [data, setData] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAsync = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/cwd");
        const body = await response.json();
        if (!response.ok) throw new Error(body.message);
        setData(body.data);
      } catch (error) {
        console.error(error);
        const errorMessage = extractErrorMessage(error);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadAsync();
  }, []);

  return { data, error, isLoading };
}
