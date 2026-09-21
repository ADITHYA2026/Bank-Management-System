import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography
} from "@mui/material";
function TransactionDetailsDialog({
    transaction,
    open,
    onClose
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                sx={{
                    fontWeight: 700
                }}
            >
                Transaction Details
            </DialogTitle>
            <DialogContent dividers>
                {transaction && (
                    <Box>
                        <Card
                            elevation={0}
                            sx={{
                                backgroundColor: "#F8FAFC",
                                border: "1px solid #E5E7EB",
                                borderRadius: 3
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems: "center",
                                        mb: 3
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700
                                        }}
                                    >
                                        {transaction.type}
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
                                            transaction.amount || 0
                                        ).toLocaleString(
                                            "en-IN",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }
                                        )}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Grid
                                    container
                                    spacing={2}
                                >
                                    {/* TRANSACTION ID */}
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Transaction ID
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        >
                                            {transaction.id}
                                        </Typography>
                                    </Grid>
                                    {/* CUSTOMER ID */}
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Customer ID
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        >
                                            {transaction.customerId ||
                                                transaction.senderCustomerId ||
                                                "—"}
                                        </Typography>
                                    </Grid>
                                    {/* DESCRIPTION */}
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Description
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        >
                                            {transaction.description ||
                                                "—"}
                                        </Typography>
                                    </Grid>
                                    {/* DATE */}
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Date & Time
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        >
                                            {transaction.timestamp
                                                ? new Date(
                                                      transaction.timestamp
                                                  ).toLocaleString(
                                                      "en-IN"
                                                  )
                                                : "—"}
                                        </Typography>
                                    </Grid>
                                    {/* TRANSFER DETAILS */}
                                    {transaction.type ===
                                        "TRANSFER" && (
                                        <>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Sender
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {
                                                        transaction.senderCustomerId
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Receiver
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {
                                                        transaction.receiverCustomerId
                                                    }
                                                </Typography>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </CardContent>
                        </Card>
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
export default TransactionDetailsDialog;