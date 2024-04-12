import { LoadingButton } from "@mui/lab";
import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { FormState, UseFormRegister } from "react-hook-form";

import { TextMaskCustom } from "@/components/TextMaskCustomInput";
import { Customer, CustomerType } from "@/schema";

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
          label={isCompany ? "Company name" : "Name"}
          id="customer-name"
          defaultValue={customer?.name}
          error={!!formState?.errors?.name}
          {...formRegister("name")}
        />
        <Typography
          color="error"
          sx={(theme) => ({ fontSize: theme.typography.fontSize })}
        >
          {formState?.errors?.name?.message?.toString()}
        </Typography>
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
          <Typography
            color="error"
            sx={(theme) => ({ fontSize: theme.typography.fontSize })}
          >
            {formState?.errors?.tradeName?.message?.toString()}
          </Typography>
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
        <Typography
          color="error"
          sx={(theme) => ({ fontSize: theme.typography.fontSize })}
        >
          {formState?.errors?.document?.message?.toString()}
        </Typography>
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
        <Typography
          color="error"
          sx={(theme) => ({ fontSize: theme.typography.fontSize })}
        >
          {formState?.errors?.email?.message?.toString()}
        </Typography>
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
            inputComponent: TextMaskCustom as any,
          }}
          {...formRegister("phone")}
        />
        <Typography
          color="error"
          sx={(theme) => ({ fontSize: theme.typography.fontSize })}
        >
          {formState?.errors?.phone?.message?.toString()}
        </Typography>
      </Stack>

      <LoadingButton
        fullWidth
        type="submit"
        color="success"
        variant="contained"
        disabled={!formState.isValid || isSaving}
        loading={isSaving}
      >
        {customer ? "Edit" : "Create"}
      </LoadingButton>
    </Stack>
  );
};