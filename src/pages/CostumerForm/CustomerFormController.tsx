import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { useSnackBar } from "@/hooks/useSnackBar";
import { Customer, CustomerSchema, CustomerType } from "@/schema";

import { CustomersListLoader } from "../Customers/components/CustomersListLoader";
import { CustomerForm } from "./components/CustomerForm";

export const CustomerFormController = () => {
  const { setSnackBarMessage } = useSnackBar();
  const navigate = useNavigate();
  const { id } = useParams();

  const { register, handleSubmit, formState, watch } = useForm<Customer>({
    mode: "onChange",
    resolver: zodResolver(CustomerSchema),
  });

  const { data: customer, isLoading } = useCustomQuery<Customer>({
    queryKey: `customerIdQuery-${id}`,
    endpoint: `/api/customers/${id}`,
    enabled: !!id,
  });

  const isCompany =
    watch("type") === CustomerType.PJ || customer?.type === CustomerType.PJ;

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

  const pageTitle = `${id ? "Edit" : "Create"} customer`;

  if (isLoading) {
    return <CustomersListLoader />;
  }

  return (
    <PageLayout headerElement={<PageHeader title={pageTitle} />}>
      <CustomerForm
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
