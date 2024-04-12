import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Customer, CustomerSchema, CustomerType } from "@/schema";

export const useCustomerForm = ({
  customerType,
}: {
  customerType?: CustomerType;
}) => {
  const { register, handleSubmit, formState, watch } = useForm<Customer>({
    mode: "onChange",
    resolver: zodResolver(CustomerSchema),
  });

  const isCompany =
    watch("type") === CustomerType.PJ || customerType === CustomerType.PJ;

  return {
    register,
    handleSubmit,
    formState,
    watch,
    isCompany,
  };
};
