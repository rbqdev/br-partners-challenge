import { Button, Stack } from "@mui/material";

import { PageHeader } from "@/components/PageHeader";

import { Costumer } from "../sharedTypes";
import { CostumersList } from "./components/CostumersList";
import * as Styled from "./CostumersController.styles";
import { useGetCostumers } from "./hooks/useGetCostumers";

export const CostumersController = () => {
  const { costumers, isLoading, isError } = useGetCostumers();

  const handleClickEditCostumer = (costumer: Costumer) => {
    alert(`Costumer: ${costumer.name}`);
  };

  const handleClickDeleteCostumer = (costumerId: string) => {
    alert(`CostumerId: ${costumerId}`);
  };

  return (
    <Stack sx={(theme) => ({ height: "100%", gap: theme.spacing(4) })}>
      <PageHeader
        title="Costumers"
        action={<Button variant="contained">Create</Button>}
      />

      <Styled.Content>
        <CostumersList
          costumers={costumers}
          isLoading={isLoading}
          isError={isError}
          onClickEditCostumer={handleClickEditCostumer}
          onClickDeleteCostumer={handleClickDeleteCostumer}
        />
      </Styled.Content>
    </Stack>
  );
};
