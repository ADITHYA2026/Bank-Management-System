import { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Container,
    Grid,
    Typography
} from "@mui/material";
import ManagerHeader
    from "../components/manager/ManagerHeader";
import ManagerSidebar
    from "../components/manager/ManagerSidebar";
import ManagerSummaryCards
    from "../components/manager/ManagerSummaryCards";
import CustomerTable
    from "../components/manager/CustomerTable";
import TransactionTable
    from "../components/manager/TransactionTable";
import CustomerDetailsDialog
    from "../components/manager/CustomerDetailsDialog";
import TransactionDetailsDialog
    from "../components/manager/TransactionDetailsDialog";
import EditCustomerDialog
    from "../components/manager/EditCustomerDialog";
import {
    getDashboard,
    getManagerCustomers,
    getManagerTransactions,
    updateCustomer
} from "../services/managerService";
import {
    getCustomerTransactions
} from "../services/transactionService";
function ManagerPage() {
    const [dashboard, setDashboard] =
        useState(null);
    const [customers, setCustomers] =
        useState([]);
    const [transactions, setTransactions] =
        useState([]);
    const [loading, setLoading] =
        useState(true);
    const [error, setError] =
        useState("");
    const [activeView, setActiveView] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] =
        useState(null);
    const [customerTransactions, setCustomerTransactions] =
        useState([]);
    const [customerDetailsLoading, setCustomerDetailsLoading] =
        useState(false);
    const [selectedTransaction, setSelectedTransaction] =
        useState(null);
    const [selectedEditCustomer, setSelectedEditCustomer] =
        useState(null);
    const loadManagerData = async () => {
        try {
            setError("");
            const dashboardData =
                await getDashboard();
            const customersData =
                await getManagerCustomers();
            const transactionsData =
                await getManagerTransactions();
                setTransactions(
                [...transactionsData].sort(
                    (a, b) =>
                        new Date(b.timestamp) -
                        new Date(a.timestamp)
                )
            );
            setDashboard(dashboardData);
            setCustomers(customersData);
            setTransactions(
                [...transactionsData].sort(
                    (a, b) =>
                        new Date(b.timestamp) -
                        new Date(a.timestamp)
                )
            );
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.message ||
                "Unable to load manager dashboard."
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadManagerData();
    }, []);
    const handleViewCustomer =
        async (customer) => {
            try {
                setSelectedCustomer(customer);
                setCustomerDetailsLoading(true);
                const data =
                    await getCustomerTransactions(
                        customer.id
                    );
                setCustomerTransactions(
                    [...data].sort(
                        (a, b) =>
                            new Date(b.timestamp) -
                            new Date(a.timestamp)
                    )
                );
            } catch (error) {
                console.error(error);
                setCustomerTransactions([]);
            } finally {
                setCustomerDetailsLoading(false);
            }
        };
    const handleCloseCustomerDetails =
        () => {
            setSelectedCustomer(null);
            setCustomerTransactions([]);
        };
    const handleViewTransaction =
        (transaction) => {
            setSelectedTransaction(
                transaction
            );
        };
    const handleCloseTransactionDetails =
        () => {
            setSelectedTransaction(null);
        };
    const handleEditCustomer =
        (customer) => {
            setSelectedEditCustomer(
                customer
            );
        };
    const handleCustomerUpdated =
    async (updatedCustomer) => {

        try {

            const updatedCustomerFromBackend =
                await updateCustomer(
                    updatedCustomer.id,
                    {
                        name: updatedCustomer.name,
                        email: updatedCustomer.email,
                        phone: updatedCustomer.phone
                    }
                );

            setCustomers((previousCustomers) =>
                previousCustomers.map(
                    (customer) =>
                        customer.id ===
                        updatedCustomerFromBackend.id
                            ? updatedCustomerFromBackend
                            : customer
                )
            );

            if (
                selectedCustomer &&
                selectedCustomer.id ===
                updatedCustomerFromBackend.id
            ) {
                setSelectedCustomer(
                    updatedCustomerFromBackend
                );
            }

        } catch (error) {

            console.error(
                "Unable to update customer",
                error
            );

            throw error;
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
                    backgroundColor: "#F5F7FB"
                }}
            >
                <Box sx={{ textAlign: "center" }}>
                    <CircularProgress />
                    <Typography
                        sx={{ mt: 2 }}
                        color="text.secondary"
                    >
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
                    px: 2
                }}
            >
                <Typography
                    color="error"
                    variant="h6"
                >
                    {error}
                </Typography>
            </Box>
        );
    }
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#F5F7FB"
            }}
        >
            <ManagerHeader onMenuClick={() => setSidebarOpen(true)}/>
            <Container
                maxWidth="xl"
                sx={{
                    py: {
                        xs: 3,
                        md: 5
                    }
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 0.5
                        }}
                    >
                        Manager Dashboard
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        Monitor customers, transactions
                        and account balances.
                    </Typography>
                </Box>
                <ManagerSummaryCards
                    dashboard={dashboard}
                />
                <Box sx={{ mt: 3 }}>
                    {activeView === "dashboard" && (
                        <Box
                            sx={{
                                p: 4,
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #E5E7EB",
                                borderRadius: 3,
                                textAlign: "center"
                            }}
                        >
                        <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: "#12355B",
                                    mb: 1
                                }}
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
        <TransactionTable
            transactions={transactions}
            onViewTransaction={handleViewTransaction}
        />
    )}
</Box>
            </Container>
            <ManagerSidebar
                open={sidebarOpen}
                activeView={activeView}
                onChange={setActiveView}
                onClose={() => setSidebarOpen(false)}
            />
            <CustomerDetailsDialog
                customer={selectedCustomer}
                transactions={
                    customerTransactions
                }
                loading={
                    customerDetailsLoading
                }
                open={
                    Boolean(selectedCustomer)
                }
                onClose={
                    handleCloseCustomerDetails
                }
            />
            <TransactionDetailsDialog
                transaction={
                    selectedTransaction
                }
                open={
                    Boolean(selectedTransaction)
                }
                onClose={
                    handleCloseTransactionDetails
                }
            />
            <EditCustomerDialog
                customer={
                    selectedEditCustomer
                }
                open={
                    Boolean(
                        selectedEditCustomer
                    )
                }
                onClose={() =>
                    setSelectedEditCustomer(null)
                }
                onUpdated={
                    handleCustomerUpdated
                }
            />
        </Box>
    );
}
export default ManagerPage;