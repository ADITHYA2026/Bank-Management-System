import {
    Box,
    Card,
    CardContent,
    Typography
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
function ManagerSummaryCards({ dashboard }) {
    const cardStyle = {
        height: "100%",
        background:
            "linear-gradient(135deg, #EAF2FF 0%, #EEF0FF 100%)",
        border: "1px solid #D6E4FF",
        borderRadius: 3,
        transition:
            "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
            transform: "translateY(-3px)",
            boxShadow:
                "0 8px 20px rgba(37, 99, 235, 0.10)"
        }
    };
    const iconStyle = {
        width: 48,
        height: 48,
        borderRadius: 2,
        backgroundColor:
            "rgba(37, 99, 235, 0.10)",
        color: "#2563EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2
    };
    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, minmax(0, 1fr))"
                },
                gap: 3,
                mb: 3
            }}
        >
            {/* ================================================= */}
            {/* TOTAL CUSTOMERS */}
            {/* ================================================= */}
            <Card
                elevation={0}
                sx={cardStyle}
            >
                <CardContent
                    sx={{
                        p: 3
                    }}
                >
                    <Box sx={iconStyle}>
                        <PeopleIcon
                            sx={{
                                fontSize: 26
                            }}
                        />
                    </Box>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 700,
                            color: "#12355B",
                            mb: 0.8
                        }}
                    >
                        Total Customers
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: "#12355B"
                        }}
                    >
                        {dashboard?.totalCustomers ?? 0}
                    </Typography>
                </CardContent>
            </Card>
            {/* ================================================= */}
            {/* TOTAL TRANSACTIONS */}
            {/* ================================================= */}
            <Card
                elevation={0}
                sx={cardStyle}
            >
                <CardContent
                    sx={{
                        p: 3
                    }}
                >
                    <Box sx={iconStyle}>
                        <ReceiptLongIcon
                            sx={{
                                fontSize: 26
                            }}
                        />
                    </Box>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 700,
                            color: "#12355B",
                            mb: 0.8
                        }}
                    >
                        Total Transactions
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: "#12355B"
                        }}
                    >
                        {dashboard?.totalTransactions ?? 0}
                    </Typography>
                </CardContent>
            </Card>
            {/* ================================================= */}
            {/* TOTAL BALANCE */}
            {/* ================================================= */}
            <Card
                elevation={0}
                sx={cardStyle}
            >
                <CardContent
                    sx={{
                        p: 3
                    }}
                >
                    <Box sx={iconStyle}>
                        <AccountBalanceWalletIcon
                            sx={{
                                fontSize: 26
                            }}
                        />
                    </Box>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 700,
                            color: "#12355B",
                            mb: 0.8
                        }}
                    >
                        Total Balance
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: "#12355B"
                        }}
                    >
                        ₹
                        {Number(
                            dashboard?.totalBalance || 0
                        ).toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
export default ManagerSummaryCards;