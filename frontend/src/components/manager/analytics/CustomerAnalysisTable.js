import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
function CustomerAnalysisTable({ customerAnalysis = [] }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#12355B",
          }}
        >
          Customer Analysis
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#64748B",
            mt: 0.5,
          }}
        >
          Transaction activity grouped by customer.
        </Typography>
      </Box>
      {customerAnalysis.length === 0 ? (
        <Box
          sx={{
            py: 5,
            px: 3,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#94A3B8",
            }}
          >
            No customer data available.
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#F8FAFC",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  Customer ID
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  Transactions
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  Total Amount
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  Deposits
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  Withdrawals
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  Transfers
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerAnalysis.map((customer) => (
                <TableRow key={customer.customerId} hover>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#12355B",
                    }}
                  >
                    {customer.customerId}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#334155",
                    }}
                  >
                    {customer.transactionCount}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: "#12355B",
                    }}
                  >
                    {formatAmount(customer.totalAmount)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#16A34A",
                    }}
                  >
                    {customer.depositCount}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#EA580C",
                    }}
                  >
                    {customer.withdrawalCount}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#7C3AED",
                    }}
                  >
                    {customer.transferCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
export default CustomerAnalysisTable;