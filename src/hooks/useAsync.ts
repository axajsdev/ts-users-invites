import { useCallback, useEffect, useState } from "react";

interface UseAsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export const useAsync = <T>(callback: () => Promise<T>, immediate = false) => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const refetch = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));

    try {
      const data = await callback();
      setState((prevState) => ({ ...prevState, data, error: null }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        data: null,
        error: error instanceof Error ? error : new Error("Request failed"),
      }));
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [callback]);

  useEffect(() => {
    if (immediate) {
      refetch();
    }
  }, [immediate, refetch]);

  const { data, error, loading } = state;

  return { data, error, loading, refetch };
};
