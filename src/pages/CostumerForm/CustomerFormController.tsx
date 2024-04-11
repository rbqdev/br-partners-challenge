import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Customer, CustomerSchema } from "@/schema";

import { CustomersListLoader } from "../Customers/components/CustomersListLoader";
import { CustomerForm } from "./components/CustomerForm";

export const CustomerFormController = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { register, handleSubmit, formState, watch } = useForm<Customer>({
    mode: "onChange",
    resolver: zodResolver(CustomerSchema),
  });

  const { data: customer, isLoading } = useCustomQuery<Customer>({
    queryKey: "customerIdQuery",
    endpoint: `/api/customers/${id}`,
    enabled: !!id,
  });

  const { mutation: createCustomerMutation } = useCustomMutation<Customer>({
    onSuccess: () => navigate("/"),
  });

  const handleSubmitCustomerForm = async (data: Customer) => {
    await createCustomerMutation.mutateAsync({
      endpoint: `/api/customers/create`,
      body: data,
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
        watch={watch}
        onSubmit={handleSubmit(handleSubmitCustomerForm)}
      />
    </PageLayout>
  );
};
