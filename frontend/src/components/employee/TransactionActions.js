import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Alert,
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import {
    AddCircleOutlineOutlined as AddCircleOutlineIcon,
    ArrowUpward as ArrowUpwardIcon,
    SwapHoriz as SwapHorizIcon,
    AccountBalanceWallet as AccountBalanceWalletIcon
} from "@mui/icons-material";

import {
    deposit,
    withdraw,
    transfer
} from "../../services/transactionService";

function TransactionActions({
    customer,
    employeeId,
    onTransactionSuccess
}) {
    const [type, setType] = useState("DEPOSIT");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            amount: "",
            receiverAccountNumber: "",
            description: ""
        }
    });

    const onSubmit = async (data) => {
        setMessage("");
        setError("");

        const numericAmount = Number(data.amount);

        try {
            setLoading(true);

            let transaction;

            if (type === "DEPOSIT") {
                transaction = await deposit({
                    customerId: customer.id,
                    employeeId: employeeId,
                    amount: numericAmount,
                    description: data.description || ""
                });
            } else if (type === "WITHDRAW") {
                transaction = await withdraw({
                    customerId: customer.id,
                    employeeId: employeeId,
                    amount: numericAmount,
                    description: data.description || ""
                });
            } else {
                transaction = await transfer({
                    senderCustomerId: customer.id,
                    employeeId: employeeId,
                    receiverAccountNumber:
                        data.receiverAccountNumber.trim(),
                    amount: numericAmount,
                    description: data.description || ""
                });
            }

            setMessage(
                `${type} completed successfully.`
            );

            reset({
                amount: "",
                receiverAccountNumber: "",
                description: ""
            });

            if (onTransactionSuccess) {
                onTransactionSuccess(transaction);
            }
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Transaction failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                mt: 3,
                p: {
                    xs: 2.5,
                    md: 3
                },
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                backgroundColor: "#FFFFFF"
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1
                }}
            >
                <Box
                    sx={{
                        width: 46,
                        height: 46,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#E8F1FB",
                        color: "#4F46E5"
                    }}
                >
                    <AccountBalanceWalletIcon />
                </Box>

                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: "#4F46E5"
                        }}
                    >
                        Perform Transaction
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Process a transaction for the verified customer.
                    </Typography>
                </Box>
            </Box>

            {/* Success Message */}
            {message && (
                <Alert
                    severity="success"
                    sx={{ mt: 3 }}
                >
                    {message}
                </Alert>
            )}

            {/* Error Message */}
            {error && (
                <Alert
                    severity="error"
                    sx={{ mt: 3 }}
                >
                    {error}
                </Alert>
            )}

            {/* Form */}
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    mt: 3,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr"
                    },
                    gap: 2
                }}
            >
                {/* Transaction Type */}
                <TextField
                    select
                    label="Transaction Type"
                    value={type}
                    onChange={(event) =>
                        setType(event.target.value)
                    }
                >
                    <MenuItem value="DEPOSIT">
                        Deposit
                    </MenuItem>

                    <MenuItem value="WITHDRAW">
                        Withdraw
                    </MenuItem>

                    <MenuItem value="TRANSFER">
                        Transfer
                    </MenuItem>
                </TextField>

                {/* Amount */}
                <TextField
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    {...register("amount", {
                        required:
                            "Please enter an amount.",
                        validate: (value) =>
                            Number(value) > 0 ||
                            "Amount must be greater than zero."
                    })}
                    error={!!errors.amount}
                    helperText={
                        errors.amount?.message
                    }
                    inputProps={{
                        min: 1,
                        step: "0.01"
                    }}
                />

                {/* Receiver Account Number */}
                {type === "TRANSFER" && (
                    <TextField
                        label="Receiver Account Number"
                        placeholder="ACC10002"
                        {...register(
                            "receiverAccountNumber",
                            {
                                required:
                                    "Please enter the receiver account number.",
                                validate: (value) =>
                                    value.trim() !== "" ||
                                    "Please enter the receiver account number."
                            }
                        )}
                        error={
                            !!errors.receiverAccountNumber
                        }
                        helperText={
                            errors
                                .receiverAccountNumber
                                ?.message
                        }
                    />
                )}

                {/* Description */}
                <TextField
                    label="Description"
                    placeholder="Optional"
                    {...register("description")}
                />

                {/* Submit */}
                <Box
                    sx={{
                        gridColumn: {
                            xs: "auto",
                            sm: "1 / -1"
                        }
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600
                        }}
                        startIcon={
                            type === "DEPOSIT"
                                ? <AddCircleOutlineIcon />
                                : type === "WITHDRAW"
                                    ? <ArrowUpwardIcon />
                                    : <SwapHorizIcon />
                        }
                    >
                        {loading
                            ? "Processing..."
                            : `Perform ${type}`}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default TransactionActions;