import { Button } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Customer } from "@/schema";

import { CustomersList } from "./components/CustomersList";
import { CustomersListEmpty } from "./components/CustomersListEmpty";
import { CustomersListLoader } from "./components/CustomersListLoader";

export const CustomersController = () => {
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

  const handleClickCreateCustomer = () => {
    navigate("/customer/create");
  };

  const childrenElement = useMemo(() => {
    const handleClickEditCustomer = (customer: Customer) => {
      navigate(`/customer/edit/${customer.id}`);
    };

    const handleClickDeleteCustomer = async (customerId?: string) => {
      await deleteCustomerMutation.mutateAsync({
        endpoint: `/api/customers/delete/${customerId}`,
        method: "DELETE",
      });

      refetchCustomers();
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
        onClickDeleteCustomer={handleClickDeleteCustomer}
      />
    );
  }, [
    customers,
    deleteCustomerMutation,
    isError,
    isLoading,
    navigate,
    refetchCustomers,
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
      {childrenElement}
    </PageLayout>
  );
};
