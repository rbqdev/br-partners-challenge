import { Typography } from "@mui/material";

import { FullWrapper } from "./CostumersList.styles";

export const CostumersListEmpty = ({ isError }: { isError?: boolean }) => {
  return (
    <FullWrapper>
      <Typography variant="h2" fontSize={56}>
        {isError ? "Something went wrong. Try Later" : "No costumers found"}
      </Typography>
    </FullWrapper>
  );
};
