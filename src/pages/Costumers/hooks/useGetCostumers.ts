import { useQuery } from "@tanstack/react-query";

import { Costumer } from "@/pages/sharedTypes";

const costumersStorageKey = "costumersStorageKey";
const costumersQueryKey = "costumersQueryKey";

export const useGetCostumers = () => {
  const storagedCostumers = sessionStorage.getItem(costumersStorageKey);
  const storagedCostumersParsed = JSON.parse(storagedCostumers!) as Costumer[];

  const {
    isLoading,
    isError,
    data: costumers,
  } = useQuery<Costumer[]>({
    queryKey: [costumersQueryKey],
    queryFn: async () => {
      const response = await fetch("/api/costumers");
      const data = await response.json();
      /** Persist data */
      sessionStorage.setItem(costumersStorageKey, JSON.stringify(data));
      return data;
    },
    /** Get initial storage data */
    initialData: () => {
      return storagedCostumersParsed;
    },
    /** Disable query if there's storage data */
    enabled: !storagedCostumersParsed,
  });

  return {
    isLoading,
    isError,
    costumers,
  };
};
