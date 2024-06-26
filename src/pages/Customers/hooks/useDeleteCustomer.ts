import { useState } from "react";

import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useSnackBar } from "@/hooks/useSnackBar";

export const useDeleteCustomer = () => {
  const [deleteCustomerDialogOpen, setDeleteCustomerDialogOpen] =
    useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<
    string | undefined
  >();

  const { showSnackBar } = useSnackBar();

  const { mutation: deleteCustomerMutation } = useCustomMutation({
    onSuccess: () => showSnackBar({ message: "Customer deleted" }),
  });

  const handleCloseDeleteCustomerDialog = () => {
    setDeleteCustomerDialogOpen(!deleteCustomerDialogOpen);
  };

  const handleOpenDeleteCustomerDialog = (customerId?: string) => {
    setSelectedCustomerId(customerId);
    setDeleteCustomerDialogOpen(true);
  };

  const handleClickDeleteCustomer = async ({
    callback,
  }: {
    callback: () => void;
  }) => {
    await deleteCustomerMutation.mutateAsync({
      endpoint: `/api/customers/delete/${selectedCustomerId}`,
      method: "DELETE",
    });
    callback();
    setDeleteCustomerDialogOpen(false);
  };

  return {
    deleteCustomerDialogOpen,
    deleteCustomerMutation,
    handleOpenDeleteCustomerDialog,
    handleCloseDeleteCustomerDialog,
    handleClickDeleteCustomer,
  };
};
