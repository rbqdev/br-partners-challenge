import { useNavigate } from "react-router-dom";

import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useSnackBar } from "@/hooks/useSnackBar";
import { Customer } from "@/schema";

export const useSaveCustomer = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();

  const handleSuccessSavedCustomerMutation = () => {
    showSnackBar({ message: `Customer ${id ? "edited" : "created"}` });
    navigate("/");
  };

  const { mutation: saveCustomerMutation } = useCustomMutation<Customer>({
    onSuccess: handleSuccessSavedCustomerMutation,
    onError: () =>
      showSnackBar({
        message: "Something went wrong trying to create customer.",
        variant: "error",
      }),
  });

  const handleSubmitCustomerForm = async (data: Customer) => {
    const endpoint = `/api/customers/${id ? `edit/${id}` : "create"}`;
    const method = id ? "PUT" : "POST";
    await saveCustomerMutation.mutateAsync({
      endpoint,
      body: data,
      method,
    });
  };

  return {
    saveCustomerMutation,
    handleSubmitCustomerForm,
  };
};
