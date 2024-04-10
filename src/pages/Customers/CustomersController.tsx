import { Button, Stack } from "@mui/material";

import { PageHeader } from "@/components/PageHeader";
import { Customer } from "@/schema";

import { CustomersList } from "./components/CustomersList";
import * as Styled from "./CustomersController.styles";
import { useGetCustomers } from "./hooks/useGetCustomers";

export const CustomersController = () => {
  const { customers, isLoading, isError } = useGetCustomers();

  const handleClickEditCustomer = (customer: Customer) => {
    alert(`Customer: ${customer.name}`);
  };

  const handleClickDeleteCustomer = (customerId: string) => {
    alert(`CustomerId: ${customerId}`);
  };

  return (
    <Stack sx={(theme) => ({ height: "100%", gap: theme.spacing(4) })}>
      <PageHeader
        title="Customers"
        action={<Button variant="contained">Create</Button>}
      />

      <Styled.Content>
        <CustomersList
          customers={customers}
          isLoading={isLoading}
          isError={isError}
          onClickEditCustomer={handleClickEditCustomer}
          onClickDeleteCustomer={handleClickDeleteCustomer}
        />
      </Styled.Content>
    </Stack>
  );
};
