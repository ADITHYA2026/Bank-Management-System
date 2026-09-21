import {
    Box,
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
function CustomerTable({ customers, onViewCustomer, onEditCustomer }) {
    return (
        <Box sx={{ mb: 5 }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    fontWeight: 700
                }}
            >
                Customers
            </Typography>
            <TableContainer
                component={Card}
                elevation={0}
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    overflowX: "auto"
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: "#F9FAFB"
                            }}
                        >
                            <TableCell sx={{ fontWeight: 700 }}>
                                Customer
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                Account Number
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                Phone
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ fontWeight: 700 }}
                            >
                                Balance
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 700 }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow
                                key={customer.id}
                                hover
                            >
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600
                                        }}
                                    >
                                        {customer.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {customer.accountNumber}
                                </TableCell>
                                <TableCell>
                                    {customer.email}
                                </TableCell>
                                <TableCell>
                                    {customer.phone}
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600
                                        }}
                                    >
                                        ₹
                                        {Number(
                                            customer.balance || 0
                                        ).toLocaleString(
                                            "en-IN",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }
                                        )}
                                    </Typography>
                                </TableCell>
                              <TableCell align="center">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: 1
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={
                                                <VisibilityIcon />
                                            }
                                            onClick={() =>
                                                onViewCustomer(customer)
                                            }
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: 2,
                                                color: "#2563EB",
                                                borderColor: "#BFDBFE"
                                            }}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={
                                                <EditIcon />
                                            }
                                            onClick={() =>
                                                onEditCustomer(customer)
                                            }
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: 2,
                                                color: "#059669",
                                                borderColor: "#A7F3D0"
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        {customers.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    align="center"
                                >
                                    <Typography
                                        color="text.secondary"
                                        sx={{
                                            py: 3
                                        }}
                                    >
                                        No customers found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default CustomerTable;