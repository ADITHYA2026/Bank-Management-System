import {
  Avatar,
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
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
function TopCustomersTable({ topCustomers = [] }) {
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
          Top Customers
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#64748B",
            mt: 0.5,
          }}
        >
          Customers with the highest transaction activity.
        </Typography>
      </Box>
      {topCustomers.length === 0 ? (
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
            No top customer data available.
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
                    width: 80,
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  Rank
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  Customer
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
              </TableRow>
            </TableHead>
            <TableBody>
              {topCustomers.map((customer, index) => (
                <TableRow key={customer.customerId} hover>
                  <TableCell>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: 14,
                        fontWeight: 700,
                        backgroundColor: index === 0 ? "#FEF3C7" : "#F1F5F9",
                        color: index === 0 ? "#B45309" : "#475569",
                      }}
                    >
                      {index + 1}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {index === 0 && (
                        <EmojiEventsOutlinedIcon
                          sx={{
                            color: "#D97706",
                          }}
                        />
                      )}
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#12355B",
                        }}
                      >
                        {customer.customerId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    {customer.transactionCount}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: "#12355B",
                    }}
                  >
                    {formatAmount(customer.totalAmount)}
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
export default TopCustomersTable;
