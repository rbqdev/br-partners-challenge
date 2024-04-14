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
    handleOpenDeleteCustomerDialog,
    handleClickDeleteCustomer,
    handleCloseDeleteCustomerDialog,
  } = useDeleteCustomer();

  const handleClickCreateCustomer = () => {
    navigate("/customers/create");
  };

  const handleClickEditCustomer = (customerId?: string) => {
    navigate(`/customers/edit/${customerId}`);
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
        errorMessage={isError ? "Something went wrong. Try later" : undefined}
        emptyMessage={isEmpty ? "No customers found" : undefined}
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
