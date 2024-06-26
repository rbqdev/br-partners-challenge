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
  const { isError, data, refetch, isFetching } = useQuery<T>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}${endpoint}`);
      const data = await response.json();
      return data;
    },
    enabled,
    retry: false,
  });

  return {
    isFetching,
    isError,
    data,
    refetch,
  };
};
