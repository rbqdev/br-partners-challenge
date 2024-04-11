import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { FormState, UseFormRegister, UseFormWatch } from "react-hook-form";

import { Customer, CustomerType } from "@/schema";

type CustomerFormProps = {
  customer?: Customer;
  formRegister: UseFormRegister<Customer>;
  formState: FormState<Customer>;
  watch: UseFormWatch<Customer>;
  onSubmit: () => void;
};

export const CustomerForm = ({
  customer,
  formRegister,
  formState,
  watch,
  onSubmit,
}: CustomerFormProps) => {
  const isCompany = watch("type") === CustomerType.PJ;

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
          type="number"
          label="Phone"
          helperText="(xx) xxxxx-xxxx"
          id="customer-phone"
          defaultValue={customer?.phone}
          error={!!formState?.errors?.phone}
          {...formRegister("phone", { valueAsNumber: true })}
        />
        <Typography
          color="error"
          sx={(theme) => ({ fontSize: theme.typography.fontSize })}
        >
          {formState?.errors?.phone?.message?.toString()}
        </Typography>
      </Stack>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        disabled={!formState.isValid}
      >
        {customer ? "Edit" : "Create"}
      </Button>
    </Stack>
  );
};
