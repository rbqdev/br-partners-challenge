import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Customer } from "@/schema";

type CustomerListProps = {
  customers: Customer[];
  onClickEditCustomer: (customer: Customer) => void;
  onClickDeleteCustomer: (customerId?: string) => void;
};

export const CustomersList = ({
  customers,
  onClickEditCustomer,
  onClickDeleteCustomer,
}: CustomerListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customers table">
        <TableHead>
          <TableRow>
            {Object.keys(customers[0]).map(
              (key, index) =>
                key !== "id" && (
                  <TableCell
                    key={`th-${key}-${index}`}
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
          {customers.map((customer, index) => (
            <TableRow
              key={`tr-${customer.name}-${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{customer.type}</TableCell>
              <TableCell>
                <Stack flexDirection="row" gap={1}>
                  <span>{customer.name}</span>
                  {customer?.tradeName && <span>({customer?.tradeName})</span>}
                </Stack>
              </TableCell>
              <TableCell>{customer.document}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit customer"
                  onClick={() => onClickEditCustomer(customer)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete customer"
                  onClick={() => onClickDeleteCustomer(customer.id)}
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
