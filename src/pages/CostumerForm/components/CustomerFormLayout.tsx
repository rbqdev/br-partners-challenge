import { LoadingButton } from "@mui/lab";
import { MenuItem, Stack, TextField } from "@mui/material";
import { FormState, UseFormRegister } from "react-hook-form";

import { TextMaskCustomInput } from "@/components/TextMaskCustomInput";
import { Customer, CustomerType } from "@/schema";

import { ErrorMessage } from "./ErrorMessage";

type CustomerFormLayoutProps = {
  customer?: Customer;
  isCompany: boolean;
  isSaving?: boolean;
  formState: FormState<Customer>;
  formRegister: UseFormRegister<Customer>;
  onSubmit: () => void;
};

export const CustomerFormLayout = ({
  customer,
  isCompany,
  isSaving,
  formState,
  formRegister,
  onSubmit,
}: CustomerFormLayoutProps) => {
  return (
    <Stack gap={2} component="form" noValidate onSubmit={onSubmit}>
      <Stack>
        <TextField
          select
          label="Type"
          id="customer-type"
          defaultValue={customer?.type ?? "PF"}
          error={!!formState?.errors?.type}
          {...formRegister("type")}
        >
          <MenuItem value={CustomerType.PF}>Individual</MenuItem>
          <MenuItem value={CustomerType.PJ}>Company</MenuItem>
        </TextField>
      </Stack>

      <Stack>
        <TextField
          required
          label={isCompany ? "Company Name" : "Name"}
          id="customer-name"
          defaultValue={customer?.name}
          error={!!formState?.errors?.name}
          {...formRegister("name")}
        />
        <ErrorMessage message={formState?.errors?.name?.message?.toString()} />
      </Stack>

      {isCompany && (
        <Stack>
          <TextField
            required
            label="Trade Name"
            id="customer-trade-name"
            defaultValue={customer?.tradeName}
            error={!!formState?.errors?.tradeName}
            {...formRegister("tradeName")}
          />
          <ErrorMessage
            message={formState?.errors?.tradeName?.message?.toString()}
          />
        </Stack>
      )}

      <Stack>
        <TextField
          required
          type="number"
          label="Document"
          id="customer-document"
          defaultValue={customer?.document}
          error={!!formState?.errors?.document}
          {...formRegister("document", { valueAsNumber: true })}
        />
        <ErrorMessage
          message={formState?.errors?.document?.message?.toString()}
        />
      </Stack>

      <Stack>
        <TextField
          required
          label="Email"
          id="customer-email"
          defaultValue={customer?.email}
          error={!!formState?.errors?.email}
          {...formRegister("email")}
        />
        <ErrorMessage message={formState?.errors?.email?.message?.toString()} />
      </Stack>

      <Stack>
        <TextField
          required
          label="Phone"
          helperText={!formState?.errors?.phone ? "(xx) xxxxx-xxxx" : ""}
          id="customer-phone"
          defaultValue={customer?.phone}
          error={!!formState?.errors?.phone}
          InputProps={{
            // eslint-disable-next-line
            inputComponent: TextMaskCustomInput as any,
          }}
          {...formRegister("phone")}
        />
        <ErrorMessage message={formState?.errors?.phone?.message?.toString()} />
      </Stack>

      <LoadingButton
        fullWidth
        type="submit"
        color="success"
        variant="contained"
        disabled={!formState.isValid || isSaving}
        loading={isSaving}
        data-testid="submit-button"
      >
        {customer ? "Edit" : "Create"}
      </LoadingButton>
    </Stack>
  );
};
