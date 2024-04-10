import { useQuery } from "@tanstack/react-query";

import { Customer } from "@/schema";

const customersStorageKey = "customersStorageKey";
const customersQueryKey = "customersQueryKey";

export const useGetCustomers = () => {
  const storagedCustomers = sessionStorage.getItem(customersStorageKey);
  const storagedCustomersParsed = JSON.parse(storagedCustomers!) as Customer[];

  const {
    isLoading,
    isError,
    data: customers,
  } = useQuery<Customer[]>({
    queryKey: [customersQueryKey],
    queryFn: async () => {
      const response = await fetch("/api/customers");
      const data = await response.json();
      /** Persist data */
      sessionStorage.setItem(customersStorageKey, JSON.stringify(data));
      return data;
    },
    /** Get initial storage data */
    initialData: () => {
      return storagedCustomersParsed;
    },
    /** Disable query if there's storage data */
    enabled: !storagedCustomersParsed,
  });

  return {
    isLoading,
    isError,
    customers,
  };
};
