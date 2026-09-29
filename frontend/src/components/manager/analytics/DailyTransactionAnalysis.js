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
function DailyTransactionAnalysis({ dateAnalysis = [] }) {
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
          Daily Transaction Analysis
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#64748B",
            mt: 0.5,
          }}
        >
          Transaction activity grouped by date.
        </Typography>
      </Box>
      {dateAnalysis.length === 0 ? (
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
            No daily transaction data available.
          </Typography>
        </Box>
      ) : (
        <TableContainer
          sx={{
            maxHeight: 400,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                    backgroundColor: "#F8FAFC",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                    backgroundColor: "#F8FAFC",
                  }}
                >
                  Transactions
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                    backgroundColor: "#F8FAFC",
                  }}
                >
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dateAnalysis.map((item) => (
                <TableRow key={item.date} hover>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#12355B",
                    }}
                  >
                    {item.date}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#334155",
                    }}
                  >
                    {item.transactionCount}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: "#12355B",
                    }}
                  >
                    {formatAmount(item.totalAmount)}
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
export default DailyTransactionAnalysis;