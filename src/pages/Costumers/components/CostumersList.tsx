import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Costumer } from "@/pages/sharedTypes";

import { CostumersListEmpty } from "./CostumersListEmpty";
import { CostumersListLoader } from "./CostumersListLoader";

type CostumerListProps = {
  costumers?: Costumer[];
  isLoading?: boolean;
  isError?: boolean;
  onClickEditCostumer: (costumer: Costumer) => void;
  onClickDeleteCostumer: (costumerId: string) => void;
};

export const CostumersList = ({
  costumers,
  isLoading,
  isError,
  onClickEditCostumer,
  onClickDeleteCostumer,
}: CostumerListProps) => {
  if (isLoading) {
    return <CostumersListLoader />;
  }

  if (!costumers || costumers.length === 0) {
    return <CostumersListEmpty isError={isError} />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Costumers Table">
        <TableHead>
          <TableRow>
            {Object.keys(costumers[0]).map(
              (key) =>
                key !== "id" && (
                  <TableCell
                    key={`th-${key}`}
                    sx={(theme) => {
                      return {
                        fontWeight: theme.typography.fontWeightBold,
                        textTransform: "capitalize",
                      };
                    }}
                  >
                    {key}
                  </TableCell>
                )
            )}
            <TableCell>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {costumers.map((costumer) => (
            <TableRow
              key={`tr-${costumer.name}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{costumer.type}</TableCell>
              <TableCell>{costumer.name}</TableCell>
              <TableCell>{costumer.document}</TableCell>
              <TableCell>{costumer.email}</TableCell>
              <TableCell>{costumer.phone}</TableCell>
              <TableCell sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  aria-label="edit costumer"
                  onClick={() => onClickEditCostumer(costumer)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete costumer"
                  onClick={() => onClickDeleteCostumer(costumer.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
