import { Button } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Customer } from "@/schema";

import { CustomerDeleteDialog } from "./components/CustomerDeleteDialog";
import { CustomersList } from "./components/CustomersList";
import { CustomersListEmpty } from "./components/CustomersListEmpty";
import { CustomersListLoader } from "./components/CustomersListLoader";
import { useDeleteCustomer } from "./hooks/useDeleteCustomer";

export const CustomersController = () => {
  const navigate = useNavigate();
  const {
    data: customers,
    isFetching,
    isError,
    refetch: refetchCustomers,
  } = useCustomQuery<Customer[]>({
    queryKey: "customersQueryKey",
    endpoint: "/api/customers",
  });
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

  const mainChildrenElement = useMemo(() => {
    const handleClickEditCustomer = (customer: Customer) => {
      navigate(`/customers/edit/${customer.id}`);
    };

    const handleOpenDeleteCustomerDialog = (customerId?: string) => {
      setSelectedCustomerId(customerId);
      setDeleteCustomerDialogOpen(true);
    };

    if (isFetching) {
      return <CustomersListLoader />;
    }

    const isEmpty = !customers || customers.length === 0;

    if (isError || isEmpty) {
      return <CustomersListEmpty />;
    }

    return (
      <CustomersList
        customers={customers}
        onClickEditCustomer={handleClickEditCustomer}
        onClickDeleteCustomer={handleOpenDeleteCustomerDialog}
      />
    );
  }, [
    customers,
    isError,
    isFetching,
    navigate,
    setDeleteCustomerDialogOpen,
    setSelectedCustomerId,
  ]);

  return (
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
    >
      <>
        {mainChildrenElement}

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
    </PageLayout>
  );
};
