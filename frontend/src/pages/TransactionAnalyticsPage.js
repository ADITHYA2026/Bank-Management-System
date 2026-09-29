import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import ManagerHeader from "../components/manager/ManagerHeader";
import ManagerSidebar from "../components/manager/ManagerSidebar";
import AnalyticsFilters from "../components/manager/analytics/AnalyticsFilters";
import AnalyticsSummaryCards from "../components/manager/analytics/AnalyticsSummaryCards";
import TransactionTypeAnalysis from "../components/manager/analytics/TransactionTypeAnalysis";
import CustomerAnalysisTable from "../components/manager/analytics/CustomerAnalysisTable";
import DailyTransactionAnalysis from "../components/manager/analytics/DailyTransactionAnalysis";
import TopCustomersTable from "../components/manager/analytics/TopCustomersTable";
import TransactionTypeChart from "../components/manager/analytics/TransactionTypeChart";
import { getAnalytics } from "../services/analyticsService";
function TransactionAnalyticsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    type: "ALL",
  });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSidebarNavigation = (view) => {
    if (view === "analytics") {
      return;
    }
    navigate("/manager");
  };
  const handleFilterChange = (field, value) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [field]: value,
    }));
  };
  const handleApplyFilters = async () => {
    const requestData = {
      fromDate: filters.fromDate ? `${filters.fromDate}T00:00:00` : null,
      toDate: filters.toDate ? `${filters.toDate}T23:59:59` : null,
      type: filters.type || "ALL",
    };
    try {
      setLoading(true);
      setError("");
      const data = await getAnalytics(requestData);
      setAnalyticsData(data);
      console.log("Analytics response:", data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
      setAnalyticsData(null);
      setError("Unable to load transaction analytics.");
    } finally {
      setLoading(false);
    }
  };
  const handleResetFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      type: "ALL",
    });
    setAnalyticsData(null);
    setError("");
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F7FB",
      }}
    >
      <ManagerHeader onMenuClick={() => setSidebarOpen(true)} />
      <ManagerSidebar
        open={sidebarOpen}
        activeView="analytics"
        onChange={handleSidebarNavigation}
        onClose={() => setSidebarOpen(false)}
      />
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#12355B",
            mb: 1,
          }}
        >
          Transaction Analytics
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#64748B",
            mb: 4,
          }}
        >
          Analyze transaction activity and trends.
        </Typography>
        <AnalyticsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
        {analyticsData && (
          <>
            <AnalyticsSummaryCards analyticsData={analyticsData} />
            <TransactionTypeAnalysis
              typeAnalysis={analyticsData.typeAnalysis}
            />
            <CustomerAnalysisTable
              customerAnalysis={analyticsData.customerAnalysis}
            />
            <DailyTransactionAnalysis
              dateAnalysis={analyticsData.dateAnalysis}
            />
            <TopCustomersTable topCustomers={analyticsData.topCustomers} />
            <TransactionTypeChart typeAnalysis={analyticsData.typeAnalysis} />
          </>
        )}
        {loading && (
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              p: 4,
              minHeight: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#64748B",
                fontWeight: 500,
              }}
            >
              Loading analytics...
            </Typography>
          </Box>
        )}
        {error && (
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              p: 4,
              minHeight: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#DC2626",
                fontWeight: 500,
              }}
            >
              {error}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
export default TransactionAnalyticsPage;