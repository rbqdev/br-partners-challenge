import { Typography } from "@mui/material";

export const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) {
    return;
  }

  return (
    <Typography
      color="error"
      sx={(theme) => ({ fontSize: theme.typography.fontSize })}
    >
      {message}
    </Typography>
  );
};
