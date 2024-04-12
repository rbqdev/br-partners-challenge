import { useNavigate } from "react-router-dom";

import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useSnackBar } from "@/hooks/useSnackBar";
import { Customer } from "@/schema";

export const useSaveCustomer = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const { setSnackBarMessage } = useSnackBar();

  const handleSuccessSavedCustomerMutation = () => {
    setSnackBarMessage(`Customer ${id ? "edited" : "created"}`);
    navigate("/");
  };

  const { mutation: saveCustomerMutation } = useCustomMutation<Customer>({
    onSuccess: handleSuccessSavedCustomerMutation,
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
