import { useQuery } from "@tanstack/react-query";

import { baseUrl } from "@/constants";

type UseCustomQueryProps = {
  queryKey: string;
  endpoint: string;
  enabled?: boolean;
};

export const useCustomQuery = <T>({
  queryKey,
  endpoint,
  enabled,
}: UseCustomQueryProps) => {
  const { isLoading, isError, data, refetch } = useQuery<T>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}${endpoint}`);
      const data = await response.json();
      return data;
    },
    enabled,
  });

  return {
    isLoading,
    isError,
    data,
    refetch,
  };
};
