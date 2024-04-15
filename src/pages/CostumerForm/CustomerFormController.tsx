import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Customer } from "@/schema";

import { CustomerFormLayout } from "./components/CustomerFormLayout";
import { useCustomerForm } from "./hooks/useCustomerForm";
import { useSaveCustomer } from "./hooks/useSaveCustomer";

export const CustomerFormController = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: customer,
    isFetching: isFetchingCustomer,
    isError,
  } = useCustomQuery<Customer>({
    queryKey: `customerIdQuery-${id}`,
    endpoint: `/api/customers/${id}`,
    enabled: !!id,
  });

  const { register, formState, handleSubmit, isCompany } = useCustomerForm({
    customerType: customer?.type,
  });

  const { saveCustomerMutation, handleSubmitCustomerForm } = useSaveCustomer({
    id,
  });

  const pageTitle = `${id ? "Edit" : "Create"} customer`;

  return (
    <PageLayout
      headerElement={<PageHeader title={pageTitle} />}
      isLoading={isFetchingCustomer}
      errorMessage={isError ? "No customer found with provided ID" : undefined}
      errorAction={
        <Button variant="contained" onClick={() => navigate("/")}>
          Go Back
        </Button>
      }
    >
      <CustomerFormLayout
        customer={customer}
        formRegister={register}
        formState={formState}
        isCompany={isCompany}
        isSaving={saveCustomerMutation.isPending}
        onSubmit={handleSubmit(handleSubmitCustomerForm)}
      />
    </PageLayout>
  );
};
