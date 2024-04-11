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
  const isCompany = watch("type") === CustomerType.PJ;

  const { data: customer, isLoading } = useCustomQuery<Customer>({
    queryKey: `customerIdQuery-${id}`,
    endpoint: `/api/customers/${id}`,
    enabled: !!id,
  });

  const handleSuccessCreateCustomerMutation = () => {
    setSnackBarMessage(`Customer ${id ? "edited" : "created"}`);
    navigate("/");
  };

  const { mutation: createCustomerMutation } = useCustomMutation<Customer>({
    onSuccess: handleSuccessCreateCustomerMutation,
  });

  const handleSubmitCustomerForm = async (data: Customer) => {
    const endpoint = `/api/customers/${id ? `edit/${id}` : "create"}`;
    const method = id ? "PUT" : "POST";
    await createCustomerMutation.mutateAsync({
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
        onSubmit={handleSubmit(handleSubmitCustomerForm)}
      />
    </PageLayout>
  );
};
