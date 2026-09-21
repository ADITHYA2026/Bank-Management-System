import {
    Box,
    Button,
    Divider,
    Paper,
    Typography
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
function VerifiedCustomerCard({
    customer,
    confirmed,
    onConfirm
}) {
    if (!customer) {
        return null;
    }
    return (
        <Paper
            elevation={0}
            sx={{
                mt: 3,
                p: {
                    xs: 2.5,
                    md: 3
                },
                border: "1px solid #DCE6F2",
                borderRadius: 3,
                backgroundColor: "#FFFFFF"
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center"
                    },
                    flexDirection: {
                        xs: "column",
                        sm: "row"
                    },
                    gap: 2,
                    mb: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5
                    }}
                >
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#E8F1FB",
                            color: "#2563EB"
                        }}
                    >
                        <AccountBalanceWalletIcon />
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: "#2563EB"
                            }}
                        >
                            Customer Account
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Review customer information
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    variant="body2"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "success.main",
                        fontWeight: 600
                    }}
                >
                    <CheckCircleIcon fontSize="small" />
                    Verified
                </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            {/* Customer Details */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr"
                    },
                    gap: 3
                }}
            >
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Customer Name
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            mt: 0.3
                        }}
                    >
                        {customer.name}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Account Number
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            mt: 0.3
                        }}
                    >
                        {customer.accountNumber}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Email
                    </Typography>
                    <Typography sx={{ mt: 0.3 }}>
                        {customer.email}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Phone
                    </Typography>
                    <Typography sx={{ mt: 0.3 }}>
                        {customer.phone}
                    </Typography>
                </Box>
                {/* Balance */}
                <Box
                    sx={{
                        gridColumn: {
                            xs: "auto",
                            sm: "1 / -1"
                        },
                        mt: 1,
                        p: 2.5,
                        borderRadius: 2,
                        backgroundColor: "#F5F7FB",
                        border: "1px solid #E5E7EB"
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Current Account Balance
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "1.6rem",
                            color: "#2563EB",
                            mt: 0.5
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
                </Box>
            </Box>
            {!confirmed && (
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        mt: 3,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600
                    }}
                    onClick={onConfirm}
                >
                    Confirm Customer
                </Button>
            )}
            {confirmed && (
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#ECFDF5",
                        border: "1px solid #A7F3D0"
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: "#047857"
                        }}
                    >
                        Customer confirmed
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#065F46",
                            mt: 0.5
                        }}
                    >
                        Transaction operations are now available.
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}
export default VerifiedCustomerCard;