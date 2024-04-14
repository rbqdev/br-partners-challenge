import { useMutation } from "@tanstack/react-query";

import { baseUrl } from "@/constants";

type UseCustomMutationProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useCustomMutation = <T>({
  onSuccess,
  onError,
}: UseCustomMutationProps) => {
  const mutation = useMutation({
    onSuccess,
    onError,
    mutationFn: async ({
      endpoint,
      body,
      method,
    }: {
      endpoint: string;
      method?: string;
      body?: T;
    }) => {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: { "Content-type": "application/json; charset=UTF-8" },
        method: method ?? "POST",
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();

      return data;
    },
    retry: false,
  });

  return {
    mutation,
  };
};
