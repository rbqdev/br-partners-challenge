import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack gap={4} alignItems="center" justifyContent="center" height="100%">
      <Typography variant="h1" fontSize={32}>
        Page not found!
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Back
      </Button>
    </Stack>
  );
};
