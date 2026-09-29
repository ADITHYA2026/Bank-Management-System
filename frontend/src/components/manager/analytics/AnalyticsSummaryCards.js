import { Box, Paper, Typography } from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
function AnalyticsSummaryCards({ analyticsData }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };
  const cards = [
    {
      title: "Total Transactions",
      value: analyticsData?.totalTransactions || 0,
      subtitle: "Transactions",
      icon: <AssessmentOutlinedIcon />,
      backgroundColor: "#EEF2FF",
      iconColor: "#4F46E5",
    },
    {
      title: "Total Amount",
      value: formatAmount(analyticsData?.totalAmount),
      subtitle: "Transaction value",
      icon: <AccountBalanceWalletOutlinedIcon />,
      backgroundColor: "#EFF6FF",
      iconColor: "#2563EB",
    },
    {
      title: "Deposits",
      value: analyticsData?.totalDeposits || 0,
      subtitle: formatAmount(analyticsData?.totalDepositAmount),
      icon: <AddCircleOutlineOutlinedIcon />,
      backgroundColor: "#F0FDF4",
      iconColor: "#16A34A",
    },
    {
      title: "Withdrawals",
      value: analyticsData?.totalWithdrawals || 0,
      subtitle: formatAmount(analyticsData?.totalWithdrawalAmount),
      icon: <ArrowUpwardOutlinedIcon />,
      backgroundColor: "#FFF7ED",
      iconColor: "#EA580C",
    },
    {
      title: "Transfers",
      value: analyticsData?.totalTransfers || 0,
      subtitle: formatAmount(analyticsData?.totalTransferAmount),
      icon: <SwapHorizOutlinedIcon />,
      backgroundColor: "#F5F3FF",
      iconColor: "#7C3AED",
    },
  ];
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "repeat(5, 1fr)",
        },
        gap: 2,
        mb: 3,
      }}
    >
      {cards.map((card) => (
        <Paper
          key={card.title}
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: "#64748B",
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#12355B",
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                {card.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#94A3B8",
                }}
              >
                {card.subtitle}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: card.backgroundColor,
                color: card.iconColor,
                flexShrink: 0,
              }}
            >
              {card.icon}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
export default AnalyticsSummaryCards;