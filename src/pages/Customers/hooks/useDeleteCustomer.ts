import { useState } from "react";

import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useSnackBar } from "@/hooks/useSnackBar";

export const useDeleteCustomer = () => {
  const { setSnackBarMessage } = useSnackBar();
  const [deleteCustomerDialogOpen, setDeleteCustomerDialogOpen] =
    useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<
    string | undefined
  >();

  const { mutation: deleteCustomerMutation } = useCustomMutation({
    onSuccess: () => setSnackBarMessage("Customer deleted"),
  });

  const handleCloseDeleteCustomerDialog = () => {
    setDeleteCustomerDialogOpen(!deleteCustomerDialogOpen);
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
    setSelectedCustomerId,
    setDeleteCustomerDialogOpen,
    handleCloseDeleteCustomerDialog,
    handleClickDeleteCustomer,
  };
};
