import { Box, Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function TransactionTypeChart({ typeAnalysis = [] }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };
  const chartData = typeAnalysis.map((item) => ({
    type:
      item.type === "DEPOSIT"
        ? "Deposits"
        : item.type === "WITHDRAW"
          ? "Withdrawals"
          : item.type === "TRANSFER"
            ? "Transfers"
            : item.type,
    transactionCount: item.transactionCount,
    totalAmount: item.totalAmount,
  }));
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
      }}
    >
      {" "}
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "#12355B", mb: 0.5 }}
      >
        {" "}
        Transaction Type Chart{" "}
      </Typography>{" "}
      <Typography variant="body2" sx={{ color: "#64748B", mb: 3 }}>
        {" "}
        Comparison of transaction amount by type.{" "}
      </Typography>{" "}
      {chartData.length === 0 ? (
        <Box
          sx={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Typography sx={{ color: "#94A3B8" }}>
            {" "}
            No transaction data available.{" "}
          </Typography>{" "}
        </Box>
      ) : (
        <Box sx={{ width: "100%", height: 320 }}>
          {" "}
          <ResponsiveContainer width="100%" height="100%">
            {" "}
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            >
              {" "}
              <CartesianGrid strokeDasharray="3 3" vertical={false} />{" "}
              <XAxis dataKey="type" tick={{ fill: "#64748B" }} />{" "}
              <YAxis tick={{ fill: "#64748B" }} />{" "}
              <Tooltip
                formatter={(value) => [formatAmount(value), "Total Amount"]}
              />{" "}
              <Bar
                dataKey="totalAmount"
                name="Total Amount"
                fill="#4F46E5"
                radius={[6, 6, 0, 0]}
                barSize={55}
              />{" "}
            </BarChart>{" "}
          </ResponsiveContainer>{" "}
        </Box>
      )}{" "}
    </Paper>
  );
}
export default TransactionTypeChart;