import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Typography
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TransactionSuccessDialog from "../components/employee/TransactionSuccessDialog";
import EmployeeHeader from "../components/employee/EmployeeHeader";
import CustomerVerification from "../components/employee/CustomerVerification";
import VerifiedCustomerCard from "../components/employee/VerifiedCustomerCard";
import TransactionActions from "../components/employee/TransactionActions";
import { getEmployee } from "../services/employeeService";
function EmployeePage() {
    const employeeId = "employee001";
    const [employee, setEmployee] = useState(null);
    const [verifiedCustomer, setVerifiedCustomer] = useState(null);
    const [customerConfirmed, setCustomerConfirmed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [completedTransaction, setCompletedTransaction] = useState(null);
    useEffect(() => {
        const loadEmployee = async () => {
            try {
                const data = await getEmployee(employeeId);
                setEmployee(data);
            } catch (error) {
                console.error(
                    "Unable to load employee",
                    error
                );
            } finally {
                setLoading(false);
            }
        };
        loadEmployee();
    }, []);
    /*
     * Customer Verification
     */
    const handleCustomerVerified = (customer) => {
        setVerifiedCustomer(customer);
        setCustomerConfirmed(false);
    };
    /*
     * Customer Confirmation
     */
    const handleConfirmCustomer = () => {
        setCustomerConfirmed(true);
    };
    /*
     * Transaction Success
     */
    const handleTransactionSuccess = (transaction) => {
        setCompletedTransaction(transaction);
        setSuccessDialogOpen(true);
    };
    /*
     * Reset Employee Workflow
     *
     * After completing a transaction,
     * employee can start again by entering
     * another customer account number.
     */
    const resetEmployeeWorkflow = () => {
        setSuccessDialogOpen(false);
        setCompletedTransaction(null);
        setVerifiedCustomer(null);
        setCustomerConfirmed(false);
    };
    /*
     * Loading Screen
     */
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
                <Box
                    sx={{
                        textAlign: "center"
                    }}
                >
                    <CircularProgress
                        sx={{
                            color: "#2563EB"
                        }}
                    />
                    <Typography
                        sx={{
                            mt: 2,
                            color: "#64748B"
                        }}
                    >
                        Loading employee portal...
                    </Typography>
                </Box>
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
            {/* ================================================= */}
            {/* EMPLOYEE HEADER */}
            {/* ================================================= */}
            <EmployeeHeader
                employee={employee}
            />
            <Container
                maxWidth="xl"
                sx={{
                    py: {
                        xs: 3,
                        md: 5
                    }
                }}
            >
                {/* ================================================= */}
                {/* PAGE HEADING */}
                {/* ================================================= */}
                <Box
                    sx={{
                        mb: 4
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: "#000000",
                            mb: 0.5
                        }}
                    >
                        Employee Transaction Portal
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#64748B"
                        }}
                    >
                        Verify a customer and securely perform
                        account transactions.
                    </Typography>
                </Box>
                {/* ================================================= */}
                {/* WORKFLOW INFORMATION */}
                {/* ================================================= */}
                <Grid
                    container
                    spacing={3}
                    sx={{
                        mb: 3,
                        flexWrap: "nowrap"
                    }}
                >
                    {/* ================================================= */}
                    {/* STEP 1 */}
                    {/* ================================================= */}
                    <Grid
                        item
                        xs={4}
                    >
                        <Card
                            elevation={0}
                            sx={{
                                height: "100%",
                                background: "linear-gradient(135deg, #EAF2FF 0%, #EEF0FF 100%)",
                                border: "1px solid #D6E4FF",
                                borderRadius: 3,
                                transition:
                                    "transform 0.2s ease, box-shadow 0.2s ease",
                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow:
                                        "0 8px 20px rgba(37, 99, 235, 0.10)"
                                }
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: 3
                                }}
                            >
                                <Box
                                    sx={{
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
                                    }}
                                >
                                    <PersonIcon
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
                                    Step 1 — Verify Customer
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#64748B",
                                        lineHeight: 1.6
                                    }}
                                >
                                    Enter the customer's account
                                    number and retrieve their
                                    account information.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* ================================================= */}
                    {/* STEP 2 */}
                    {/* ================================================= */}
                    <Grid
                        item
                        xs={4}
                    >
                        <Card
                            elevation={0}
                            sx={{
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
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: 3
                                }}
                            >
                                <Box
                                    sx={{
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
                                    }}
                                >
                                    <VerifiedUserIcon
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
                                    Step 2 — Confirm Customer
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#64748B",
                                        lineHeight: 1.6
                                    }}
                                >
                                    Review the customer's details
                                    before allowing transaction
                                    operations.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* ================================================= */}
                    {/* STEP 3 */}
                    {/* ================================================= */}
                    <Grid
                        item
                        xs={4}
                    >
                        <Card
                            elevation={0}
                            sx={{
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
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: 3
                                }}
                            >
                                <Box
                                    sx={{
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
                                    }}
                                >
                                    <SwapHorizIcon
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
                                    Step 3 — Perform Transaction
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#64748B",
                                        lineHeight: 1.6
                                    }}
                                >
                                    Deposit, withdraw or transfer
                                    money for the verified customer.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {/* ================================================= */}
                {/* CUSTOMER VERIFICATION */}
                {/* ================================================= */}
                <CustomerVerification
                    onCustomerVerified={
                        handleCustomerVerified
                    }
                />
                {/* ================================================= */}
                {/* VERIFIED CUSTOMER */}
                {/* ================================================= */}
                {verifiedCustomer && (
                    <VerifiedCustomerCard
                        customer={verifiedCustomer}
                        confirmed={customerConfirmed}
                        onConfirm={
                            handleConfirmCustomer
                        }
                    />
                )}
                {/* ================================================= */}
                {/* TRANSACTION ACTIONS */}
                {/* ================================================= */}
                {customerConfirmed && employee && (
                    <TransactionActions
                        customer={verifiedCustomer}
                        employeeId={employee.id}
                        onTransactionSuccess={
                            handleTransactionSuccess
                        }
                    />
                )}
            </Container>
            {/* ================================================= */}
            {/* TRANSACTION SUCCESS DIALOG */}
            {/* ================================================= */}
            <TransactionSuccessDialog
                open={successDialogOpen}
                transaction={completedTransaction}
                onNewTransaction={
                    resetEmployeeWorkflow
                }
                onDone={
                    resetEmployeeWorkflow
                }
            />
        </Box>
    );
}
export default EmployeePage;