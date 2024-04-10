import { Typography } from "@mui/material";

import { FullBoxWrapper as StyledFullBoxWrapper } from "./CustomersList.styles";

export const CustomersListEmpty = ({ isError }: { isError?: boolean }) => {
  return (
    <StyledFullBoxWrapper>
      <Typography variant="h2" fontSize={56}>
        {isError ? "Something went wrong. Try Later" : "No customers found"}
      </Typography>
    </StyledFullBoxWrapper>
  );
};
