import { Box, Paper, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
function TransactionTypeAnalysis({ typeAnalysis = [] }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };
  const getTypeDetails = (type) => {
    if (type === "DEPOSIT") {
      return {
        label: "Deposits",
        icon: <AddCircleOutlineOutlinedIcon />,
        backgroundColor: "#F0FDF4",
        iconColor: "#16A34A",
      };
    }
    if (type === "WITHDRAW") {
      return {
        label: "Withdrawals",
        icon: <ArrowUpwardOutlinedIcon />,
        backgroundColor: "#FFF7ED",
        iconColor: "#EA580C",
      };
    }
    if (type === "TRANSFER") {
      return {
        label: "Transfers",
        icon: <SwapHorizOutlinedIcon />,
        backgroundColor: "#F5F3FF",
        iconColor: "#7C3AED",
      };
    }
    return {
      label: type,
      icon: <SwapHorizOutlinedIcon />,
      backgroundColor: "#F8FAFC",
      iconColor: "#64748B",
    };
  };
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#12355B",
          mb: 3,
        }}
      >
        Transaction Type Analysis
      </Typography>
      {typeAnalysis.length === 0 ? (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#94A3B8",
            }}
          >
            No transaction type data available.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {typeAnalysis.map((item) => {
            const details = getTypeDetails(item.type);
            return (
              <Box
                key={item.type}
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: 2.5,
                  p: 2.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: details.backgroundColor,
                      color: details.iconColor,
                    }}
                  >
                    {details.icon}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "#334155",
                    }}
                  >
                    {details.label}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        mb: 0.5,
                      }}
                    >
                      Transactions
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#12355B",
                      }}
                    >
                      {item.transactionCount}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        mb: 0.5,
                      }}
                    >
                      Total Amount
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#12355B",
                      }}
                    >
                      {formatAmount(item.totalAmount)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Paper>
  );
}
export default TransactionTypeAnalysis;