import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
function CustomerDetailsDialog({
    customer,
    transactions,
    loading,
    open,
    onClose
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    fontWeight: 700,
                    pb: 1
                }}
            >
                Customer Details
            </DialogTitle>
            <DialogContent dividers>
                {customer && (
                    <Box>
                        {/* CUSTOMER INFORMATION */}
                        <Card
                            elevation={0}
                            sx={{
                                backgroundColor: "#F8FAFC",
                                border: "1px solid #E5E7EB",
                                borderRadius: 3,
                                mb: 3
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2
                                    }}
                                >
                                    {customer.name}
                                </Typography>
                                <Grid
                                    container
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Customer ID
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        >
                                            {customer.id}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Account Number
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        >
                                            {customer.accountNumber}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Email
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        >
                                            {customer.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Phone
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        >
                                            {customer.phone}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Current Balance
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 700,
                                                color: "#2563EB"
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
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        {/* TRANSACTION HISTORY */}
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                mb: 2
                            }}
                        >
                            Transaction History
                        </Typography>
                        {loading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    py: 4
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
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
                                            <TableCell
                                                sx={{
                                                    fontWeight: 700
                                                }}
                                            >
                                                Type
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: 700
                                                }}
                                            >
                                                Amount
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: 700
                                                }}
                                            >
                                                Description
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: 700
                                                }}
                                            >
                                                Date
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transactions.map(
                                            (transaction) => (
                                                <TableRow
                                                    key={transaction.id}
                                                >
                                                    <TableCell>
                                                        <Typography
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
                                                            {
                                                                transaction.type
                                                            }
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        ₹
                                                        {Number(
                                                            transaction.amount ||
                                                                0
                                                        ).toLocaleString(
                                                            "en-IN",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            }
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            transaction.description ||
                                                            "—"
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {transaction.timestamp
                                                            ? new Date(
                                                                  transaction.timestamp
                                                              ).toLocaleString(
                                                                  "en-IN"
                                                              )
                                                            : "—"}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                        {transactions.length === 0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    align="center"
                                                >
                                                    <Typography
                                                        color="text.secondary"
                                                        sx={{
                                                            py: 3
                                                        }}
                                                    >
                                                        No transactions
                                                        found.
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        borderRadius: 2
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default CustomerDetailsDialog;