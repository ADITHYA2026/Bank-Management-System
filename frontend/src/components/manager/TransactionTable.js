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
function TransactionTable({
    transactions,
    onViewTransaction
}) {
    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    fontWeight: 700
                }}
            >
                Recent Transactions
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
                                Type
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                Amount
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                Customer
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                Description
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                Date
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
                        {transactions.map((transaction) => (
                            <TableRow
                                key={transaction.id}
                                hover
                            >
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            color:
                                                transaction.type ===
                                                "DEPOSIT"
                                                    ? "#16A34A"
                                                    : transaction.type ===
                                                      "WITHDRAW"
                                                    ? "#DC2626"
                                                    : "#2563EB"
                                        }}
                                    >
                                        {transaction.type}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    ₹
                                    {Number(
                                        transaction.amount || 0
                                    ).toLocaleString(
                                        "en-IN",
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }
                                    )}
                                </TableCell>
                                <TableCell>
                                    {transaction.customerId ||
                                        transaction.senderCustomerId ||
                                        "—"}
                                </TableCell>
                                <TableCell>
                                    {transaction.description || "—"}
                                </TableCell>
                                <TableCell>
                                    {transaction.timestamp
                                        ? new Date(
                                              transaction.timestamp
                                          ).toLocaleString("en-IN")
                                        : "—"}
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={
                                            <VisibilityIcon />
                                        }
                                        onClick={() =>
                                            onViewTransaction(
                                                transaction
                                            )
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
                                </TableCell>
                            </TableRow>
                        ))}
                        {transactions.length === 0 && (
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
                                        No transactions found.
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
export default TransactionTable;