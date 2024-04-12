import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Customer } from "@/schema";

import { CustomerDeleteDialog } from "./components/CustomerDeleteDialog";
import { CustomersTable } from "./components/CustomersTable";
import { useDeleteCustomer } from "./hooks/useDeleteCustomer";

export const CustomersController = () => {
  const navigate = useNavigate();

  const {
    data: customers = [],
    isFetching,
    isError,
    refetch: refetchCustomers,
  } = useCustomQuery<Customer[]>({
    queryKey: "customersQueryKey",
    endpoint: "/api/customers",
  });

  const isEmpty = !customers || customers?.length === 0;

  const {
    deleteCustomerDialogOpen,
    deleteCustomerMutation,
    setSelectedCustomerId,
    setDeleteCustomerDialogOpen,
    handleClickDeleteCustomer,
    handleCloseDeleteCustomerDialog,
  } = useDeleteCustomer();

  const handleClickCreateCustomer = () => {
    navigate("/customers/create");
  };

  const handleClickEditCustomer = (customerId?: string) => {
    navigate(`/customers/edit/${customerId}`);
  };

  const handleOpenDeleteCustomerDialog = (customerId?: string) => {
    setSelectedCustomerId(customerId);
    setDeleteCustomerDialogOpen(true);
  };

  return (
    <>
      <PageLayout
        headerElement={
          <PageHeader
            title="Customers"
            action={
              <Button variant="contained" onClick={handleClickCreateCustomer}>
                Create
              </Button>
            }
          />
        }
        isLoading={isFetching}
        isError={isError}
        isEmpty={isEmpty}
        errorMessage="Something went wrong. Try later"
        emptyMessage="No customers found"
      >
        <CustomersTable
          customers={customers}
          onClickEditCustomer={handleClickEditCustomer}
          onClickDeleteCustomer={handleOpenDeleteCustomerDialog}
        />
      </PageLayout>

      <CustomerDeleteDialog
        open={deleteCustomerDialogOpen}
        onClose={handleCloseDeleteCustomerDialog}
        onSubmit={() =>
          handleClickDeleteCustomer({
            callback: refetchCustomers,
          })
        }
        isPending={deleteCustomerMutation.isPending}
      />
    </>
  );
};
