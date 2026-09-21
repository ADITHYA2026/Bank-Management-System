import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
    getCustomerByAccountNumber
} from "../../services/customerService";
function CustomerVerification({
    onCustomerVerified
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            accountNumber: ""
        }
    });
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError("");
            const customer =
                await getCustomerByAccountNumber(
                    data.accountNumber.trim()
                );
            onCustomerVerified(customer);
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.message ||
                "Customer not found."
            );
            onCustomerVerified(null);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Paper
            elevation={0}
            sx={{
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
                        color: "#2563EB"
                    }}
                >
                    <PersonSearchIcon />
                </Box>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: "#2563EB"
                        }}
                    >
                        Verify Customer
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Search using the customer's account number.
                    </Typography>
                </Box>
            </Box>
            {/* Form */}
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    mt: 3,
                    display: "flex",
                    gap: 2,
                    flexDirection: {
                        xs: "column",
                        sm: "row"
                    }
                }}
            >
                <TextField
                    sx={{ width: "800px" }}
                    label="Customer Account Number"
                    placeholder="ACC10001"
                    {...register("accountNumber", {
                        required:
                            "Please enter an account number.",
                        validate: (value) =>
                            value.trim() !== "" ||
                            "Please enter an account number."
                    })}
                    error={!!errors.accountNumber}
                    helperText={
                        errors.accountNumber?.message
                    }
                />
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SearchIcon />}
                    disabled={loading}
                    sx={{
                        minWidth: 140,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600
                    }}
                >
                    {loading
                        ? "Verifying..."
                        : "Verify Customer"}
                </Button>
            </Box>
            {error && (
                <Alert
                    severity="error"
                    sx={{ mt: 2 }}
                >
                    {error}
                </Alert>
            )}
        </Paper>
    );
}
export default CustomerVerification;