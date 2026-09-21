import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Typography
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
function TransactionSuccessDialog({
    open,
    transaction,
    onNewTransaction,
    onDone
}) {
    if (!transaction) {
        return null;
    }
    return (
        <Dialog
            open={open}
            onClose={onDone}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: "hidden"
                }
            }}
        >
            <DialogContent
                sx={{
                    p: 0
                }}
            >
                {/* ================================================= */}
                {/* SUCCESS HEADER */}
                {/* ================================================= */}
                <Box
                    sx={{
                        background:
                            "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
                        color: "#FFFFFF",
                        textAlign: "center",
                        px: 3,
                        py: 4
                    }}
                >
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            backgroundColor:
                                "rgba(255,255,255,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2
                        }}
                    >
                        <CheckCircleIcon
                            sx={{
                                fontSize: 42,
                                color: "#FFFFFF"
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        Transaction Successful
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 1,
                            color:
                                "rgba(255,255,255,0.85)"
                        }}
                    >
                        The transaction has been completed
                        successfully.
                    </Typography>
                </Box>
                {/* ================================================= */}
                {/* TRANSACTION DETAILS */}
                {/* ================================================= */}
                <Box
                    sx={{
                        p: 3
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr"
                            },
                            gap: 2
                        }}
                    >
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Transaction Type
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 0.3,
                                    fontWeight: 600,
                                    color: "#12355B"
                                }}
                            >
                                {transaction.type}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Amount
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 0.3,
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
                        <Box
                            sx={{
                                gridColumn: {
                                    xs: "auto",
                                    sm: "1 / -1"
                                }
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Transaction ID
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 0.3,
                                    fontWeight: 600
                                }}
                            >
                                {transaction.id || "—"}
                            </Typography>
                        </Box>
                    </Box>
                    {/* ================================================= */}
                    {/* ACTION BUTTONS */}
                    {/* ================================================= */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1.5,
                            mt: 4,
                            flexDirection: {
                                xs: "column-reverse",
                                sm: "row"
                            }
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<CloseIcon />}
                            onClick={onDone}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                color: "#12355B",
                                borderColor: "#D1D5DB"
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={onNewTransaction}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                background:
                                    "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)"
                            }}
                        >
                            New Transaction
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
export default TransactionSuccessDialog;