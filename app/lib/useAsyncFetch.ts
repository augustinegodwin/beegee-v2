// hooks/useFetch.ts (Renamed from useAppwrite to be more generic for your platform)
import { useCallback, useEffect, useState } from "react";

interface UseFetchOptions<T, P> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseFetchReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}

const useFetch = <T, P extends Record<string, any>>({
  fn,
  params = {} as P,
  skip = false,
}: UseFetchOptions<T, P>): UseFetchReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        
        // On web, we usually log this or use a toast library like 'react-hot-toast'
        console.error("Fetch Error:", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]); // Refetch if 'skip' status changes

  const refetch = async (newParams?: P) => {
    await fetchData(newParams || params);
  };

  return { data, loading, error, refetch };
};

export default useFetch;