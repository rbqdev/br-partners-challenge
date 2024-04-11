import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Customer } from "@/schema";

import { CustomerDeleteDialog } from "./components/CustomerDeleteDialog";
import { CustomersList } from "./components/CustomersList";
import { CustomersListEmpty } from "./components/CustomersListEmpty";
import { CustomersListLoader } from "./components/CustomersListLoader";

export const CustomersController = () => {
  const [deleteCustomerDialogOpen, setDeleteCustomerDialogOpen] =
    useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<
    string | undefined
  >();
  const navigate = useNavigate();
  const {
    data: customers,
    isLoading,
    isError,
    refetch: refetchCustomers,
  } = useCustomQuery<Customer[]>({
    queryKey: "customersQueryKey",
    endpoint: "/api/customers",
  });

  const { mutation: deleteCustomerMutation } = useCustomMutation({
    onSuccess: () => alert("Customer Deleted"),
  });

  const handleCloseDeleteCustomerDialog = () => {
    setDeleteCustomerDialogOpen(!deleteCustomerDialogOpen);
  };

  const handleClickCreateCustomer = () => {
    navigate("/customer/create");
  };

  const handleClickDeleteCustomer = async () => {
    await deleteCustomerMutation.mutateAsync({
      endpoint: `/api/customers/delete/${selectedCustomerId}`,
      method: "DELETE",
    });
    refetchCustomers();
    handleCloseDeleteCustomerDialog();
  };

  const childrenElement = useMemo(() => {
    const handleClickEditCustomer = (customer: Customer) => {
      navigate(`/customer/edit/${customer.id}`);
    };

    const handleOpenDeleteCustomerDialog = (customerId?: string) => {
      setSelectedCustomerId(customerId);
      setDeleteCustomerDialogOpen(true);
    };

    if (isLoading) {
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
  }, [customers, isError, isLoading, navigate]);

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
        {childrenElement}

        <CustomerDeleteDialog
          open={deleteCustomerDialogOpen}
          onClose={handleCloseDeleteCustomerDialog}
          onSubmit={handleClickDeleteCustomer}
        />
      </>
    </PageLayout>
  );
};
