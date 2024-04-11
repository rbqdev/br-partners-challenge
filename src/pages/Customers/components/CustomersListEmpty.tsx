import { Typography } from "@mui/material";

import { FullBoxWrapper as StyledFullBoxWrapper } from "./CustomersList.styles";

export const CustomersListEmpty = () => {
  return (
    <StyledFullBoxWrapper>
      <Typography variant="h2" fontSize={56}>
        No customers found
      </Typography>
    </StyledFullBoxWrapper>
  );
};
