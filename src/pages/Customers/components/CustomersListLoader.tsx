import { CircularProgress } from "@mui/material";

import { FullBoxWrapper as StyledFullBoxWrapper } from "./CustomersList.styles";

export const CustomersListLoader = () => {
  return (
    <StyledFullBoxWrapper>
      <CircularProgress />
    </StyledFullBoxWrapper>
  );
};
