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

import { Customer } from "@/schema";

import { CustomersListEmpty } from "./CustomersListEmpty";
import { CustomersListLoader } from "./CustomersListLoader";

type CustomerListProps = {
  customers?: Customer[];
  isLoading?: boolean;
  isError?: boolean;
  onClickEditCustomer: (customer: Customer) => void;
  onClickDeleteCustomer: (customerId: string) => void;
};

export const CustomersList = ({
  customers,
  isLoading,
  isError,
  onClickEditCustomer,
  onClickDeleteCustomer,
}: CustomerListProps) => {
  if (isLoading) {
    return <CustomersListLoader />;
  }

  if (!customers || customers.length === 0) {
    return <CustomersListEmpty isError={isError} />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customers table">
        <TableHead>
          <TableRow>
            {Object.keys(customers[0]).map(
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
          {customers.map((customer) => (
            <TableRow
              key={`tr-${customer.name}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{customer.type}</TableCell>
              <TableCell>{customer.name}</TableCell>
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
