import { CircularProgress } from "@mui/material";

import { FullWrapper } from "./CostumersList.styles";

export const CostumersListLoader = () => {
  return (
    <FullWrapper>
      <CircularProgress />
    </FullWrapper>
  );
};
