import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Customer, CustomerSchema, CustomerType } from "@/schema";

import { CustomersListLoader } from "../Customers/components/CustomersListLoader";
import { CustomerFormLayout } from "./components/CustomerFormLayout";
import { useSaveCustomer } from "./hooks/useSaveCustomer";

export const CustomerFormController = () => {
  const { id } = useParams();
  const { data: customer, isFetching: isFetchingCustomer } =
    useCustomQuery<Customer>({
      queryKey: `customerIdQuery-${id}`,
      endpoint: `/api/customers/${id}`,
      enabled: !!id,
    });

  const { saveCustomerMutation, handleSubmitCustomerForm } = useSaveCustomer({
    id,
  });

  const { register, handleSubmit, formState, watch } = useForm<Customer>({
    mode: "onChange",
    resolver: zodResolver(CustomerSchema),
  });

  const isCompany =
    watch("type") === CustomerType.PJ || customer?.type === CustomerType.PJ;

  const pageTitle = `${id ? "Edit" : "Create"} customer`;

  if (isFetchingCustomer) {
    return <CustomersListLoader />;
  }

  return (
    <PageLayout headerElement={<PageHeader title={pageTitle} />}>
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
