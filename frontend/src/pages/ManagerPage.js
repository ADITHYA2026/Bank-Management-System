import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import EditTransactionDialog from "../components/manager/EditTransactionDialog";
import ManagerHeader from "../components/manager/ManagerHeader";
import ManagerSidebar from "../components/manager/ManagerSidebar";
import ManagerSummaryCards from "../components/manager/ManagerSummaryCards";
import CustomerTable from "../components/manager/CustomerTable";
import TransactionTable from "../components/manager/TransactionTable";
import CustomerDetailsDialog from "../components/manager/CustomerDetailsDialog";
import TransactionDetailsDialog from "../components/manager/TransactionDetailsDialog";
import EditCustomerDialog from "../components/manager/EditCustomerDialog";
import {
  getDashboard,
  getManagerCustomers,
  getManagerTransactions,
  updateCustomer,
} from "../services/managerService";
import { getCustomerTransactions } from "../services/transactionService";
function ManagerPage() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerTransactions, setCustomerTransactions] = useState([]);
  const [customerDetailsLoading, setCustomerDetailsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedEditCustomer, setSelectedEditCustomer] = useState(null);
  const [selectedEditTransaction, setSelectedEditTransaction] = useState(null);
  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionTotalPages, setTransactionTotalPages] = useState(0);
  const [transactionTotalElements, setTransactionTotalElements] = useState(0);
  const handleSidebarNavigation = (view) => {
    if (view === "analytics") {
      navigate("/manager/analytics");
      return;
    }
    setActiveView(view);
  };
  const loadManagerData = async () => {
    try {
      setError("");
      const dashboardData = await getDashboard();
      const customersData = await getManagerCustomers();
      const transactionsData = await getManagerTransactions(0, 10);
      setDashboard(dashboardData);
      setCustomers(customersData);
      setTransactions(transactionsData.content || []);
      setTransactionTotalPages(transactionsData.totalPages || 0);
      setTransactionTotalElements(transactionsData.totalElements || 0);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Unable to load manager dashboard.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadManagerData();
  }, []);
  // Load transactions for selected page
  const loadTransactions = async (page) => {
    try {
      const transactionsData = await getManagerTransactions(page - 1, 10);
      setTransactions(transactionsData.content || []);
      setTransactionTotalPages(transactionsData.totalPages || 0);
      setTransactionTotalElements(transactionsData.totalElements || 0);
    } catch (error) {
      console.error("Unable to load transactions", error);
    }
  };
  // Handle pagination
  const handleTransactionPageChange = (event, value) => {
    setTransactionPage(value);
    loadTransactions(value);
  };
  const handleViewCustomer = async (customer) => {
    try {
      setSelectedCustomer(customer);
      setCustomerDetailsLoading(true);
      const data = await getCustomerTransactions(customer.id);
      setCustomerTransactions(
        [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
      );
    } catch (error) {
      console.error(error);
      setCustomerTransactions([]);
    } finally {
      setCustomerDetailsLoading(false);
    }
  };
  const handleCloseCustomerDetails = () => {
    setSelectedCustomer(null);
    setCustomerTransactions([]);
  };
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
  };
  const handleCloseTransactionDetails = () => {
    setSelectedTransaction(null);
  };
  const handleEditCustomer = (customer) => {
    setSelectedEditCustomer(customer);
  };
  const handleEditTransaction = (transaction) => {
    setSelectedEditTransaction(transaction);
  };
  const handleCustomerUpdated = async (updatedCustomer) => {
    try {
      const updatedCustomerFromBackend = await updateCustomer(
        updatedCustomer.id,
        {
          name: updatedCustomer.name,
          email: updatedCustomer.email,
          phone: updatedCustomer.phone,
        },
      );
      setCustomers((previousCustomers) =>
        previousCustomers.map((customer) =>
          customer.id === updatedCustomerFromBackend.id
            ? updatedCustomerFromBackend
            : customer,
        ),
      );
      if (
        selectedCustomer &&
        selectedCustomer.id === updatedCustomerFromBackend.id
      ) {
        setSelectedCustomer(updatedCustomerFromBackend);
      }
    } catch (error) {
      console.error("Unable to update customer", error);
      throw error;
    }
  };
  const handleTransactionUpdated = (updatedTransaction) => {
    setTransactions((previousTransactions) => {
      const updatedList = [
        ...previousTransactions.filter(
          (transaction) => transaction.id !== selectedEditTransaction?.id,
        ),
        updatedTransaction,
      ];
      return updatedList.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
      );
    });
    if (
      selectedTransaction &&
      selectedTransaction.id === selectedEditTransaction?.id
    ) {
      setSelectedTransaction(updatedTransaction);
    }
  };
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F7FB",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }} color="text.secondary">
            Loading manager dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F7FB",
          px: 2,
        }}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7FB" }}>
      <ManagerHeader onMenuClick={() => setSidebarOpen(true)} />
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Manager Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor customers, transactions and account balances.
          </Typography>
        </Box>
        <ManagerSummaryCards dashboard={dashboard} />
        <Box sx={{ mt: 3 }}>
          {activeView === "dashboard" && (
            <Box
              sx={{
                p: 4,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#12355B", mb: 1 }}
              >
                Manager Dashboard
              </Typography>
              <Typography color="text.secondary">
                Use the navigation menu to view customers or transactions.
              </Typography>
            </Box>
          )}
          {activeView === "customers" && (
            <CustomerTable
              customers={customers}
              onViewCustomer={handleViewCustomer}
              onEditCustomer={handleEditCustomer}
            />
          )}
          {activeView === "transactions" && (
            <>
              <TransactionTable
                transactions={transactions}
                onViewTransaction={handleViewTransaction}
                onEditTransaction={handleEditTransaction}
              />
              {transactionTotalElements > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Showing page {transactionPage} of {transactionTotalPages}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total transactions: {transactionTotalElements}
                  </Typography>
                </Box>
              )}
              {transactionTotalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 3,
                    mb: 2,
                  }}
                >
                  <Pagination
                    count={transactionTotalPages}
                    page={transactionPage}
                    onChange={handleTransactionPageChange}
                    color="primary"
                    shape="rounded"
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
      <ManagerSidebar
        open={sidebarOpen}
        activeView={activeView}
        onChange={handleSidebarNavigation}
        onClose={() => setSidebarOpen(false)}
      />
      <CustomerDetailsDialog
        customer={selectedCustomer}
        transactions={customerTransactions}
        loading={customerDetailsLoading}
        open={Boolean(selectedCustomer)}
        onClose={handleCloseCustomerDetails}
      />
      <TransactionDetailsDialog
        transaction={selectedTransaction}
        open={Boolean(selectedTransaction)}
        onClose={handleCloseTransactionDetails}
      />
      <EditCustomerDialog
        customer={selectedEditCustomer}
        open={Boolean(selectedEditCustomer)}
        onClose={() => setSelectedEditCustomer(null)}
        onUpdated={handleCustomerUpdated}
      />
      <EditTransactionDialog
        transaction={selectedEditTransaction}
        open={Boolean(selectedEditTransaction)}
        onClose={() => setSelectedEditTransaction(null)}
        onUpdated={handleTransactionUpdated}
      />
    </Box>
  );
}
export default ManagerPage;