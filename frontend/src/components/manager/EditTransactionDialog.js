import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { updateTransaction } from "../../services/managerService";
import { getCustomer } from "../../services/customerService";
import { getEmployee } from "../../services/employeeService";
function EditTransactionDialog({ transaction, open, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [loadingEmployee, setLoadingEmployee] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      amount: "",
      customerAccountNumber: "",
      senderAccountNumber: "",
      receiverAccountNumber: "",
      description: "",
    },
  });
  const transactionType = watch("type");
  // Load existing transaction values
  useEffect(() => {
    const loadTransactionDetails = async () => {
      if (!transaction) {
        return;
      }
      try {
        setError("");
        setLoadingAccounts(true);
        setLoadingEmployee(true);
        let customerAccountNumber = "";
        let senderAccountNumber = "";
        let receiverAccountNumber = "";
        const originalTransactionType = transaction.type
          ? String(transaction.type).trim().toUpperCase()
          : "";
        // Load original employee
        if (transaction.employeeId) {
          try {
            const employeeData = await getEmployee(transaction.employeeId);
            setEmployee(employeeData);
          } catch (employeeError) {
            console.error("Unable to load original employee", employeeError);
            setEmployee(null);
          }
        } else {
          setEmployee(null);
        }
        // Deposit / Withdraw
        if (
          originalTransactionType === "DEPOSIT" ||
          originalTransactionType === "WITHDRAW"
        ) {
          if (transaction.customerId) {
            const customer = await getCustomer(transaction.customerId);
            customerAccountNumber = customer?.accountNumber || "";
          }
        }
        // Transfer
        if (originalTransactionType === "TRANSFER") {
          if (transaction.senderCustomerId) {
            const senderCustomer = await getCustomer(
              transaction.senderCustomerId,
            );
            senderAccountNumber = senderCustomer?.accountNumber || "";
          }
          if (transaction.receiverCustomerId) {
            const receiverCustomer = await getCustomer(
              transaction.receiverCustomerId,
            );
            receiverAccountNumber = receiverCustomer?.accountNumber || "";
          }
        }
        // Load old values
        reset({
          type: originalTransactionType,
          amount:
            transaction.amount !== undefined && transaction.amount !== null
              ? transaction.amount
              : "",
          customerAccountNumber,
          senderAccountNumber,
          receiverAccountNumber,
          description: transaction.description || "",
        });
      } catch (error) {
        console.error("Unable to load transaction details", error);
        setError("Unable to load the customer account details.");
        const originalTransactionType = transaction.type
          ? String(transaction.type).trim().toUpperCase()
          : "";
        reset({
          type: originalTransactionType,
          amount: transaction.amount ?? "",
          customerAccountNumber: "",
          senderAccountNumber: "",
          receiverAccountNumber: "",
          description: transaction.description || "",
        });
      } finally {
        setLoadingAccounts(false);
        setLoadingEmployee(false);
      }
    };
    loadTransactionDetails();
  }, [transaction, reset]);
  // Format date
  const formatDateTime = (timestamp) => {
    if (!timestamp) {
      return "—";
    }
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "—";
    }
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // Get error message
  const getErrorMessage = (error) => {
    const responseData = error?.response?.data;
    if (responseData && typeof responseData.message === "string") {
      return responseData.message;
    }
    if (responseData && typeof responseData.error === "string") {
      return responseData.error;
    }
    if (typeof responseData === "string") {
      return responseData;
    }
    if (typeof error?.message === "string") {
      return error.message;
    }
    return "Unable to update transaction.";
  };
  // Save transaction
  const handleSave = async (data) => {
    try {
      setLoading(true);
      setError("");
      const requestData = {
        type: data.type,
        amount: Number(data.amount),
        customerAccountNumber: data.customerAccountNumber?.trim() || null,
        senderAccountNumber: data.senderAccountNumber?.trim() || null,
        receiverAccountNumber: data.receiverAccountNumber?.trim() || null,
        description: data.description?.trim() || "",
      };
      console.log("Updating transaction:", transaction.id);
      console.log("Update request:", requestData);
      /*
       * We intentionally DO NOT send:
       * - Transaction ID
       * - Employee ID
       * - Timestamp
       * - Updated By
       * Backend handles these.
       */
      const updatedTransaction = await updateTransaction(
        transaction.id,
        requestData,
      );
      console.log("New transaction:", updatedTransaction);
      await onUpdated(updatedTransaction);
      onClose();
    } catch (error) {
      console.error("Unable to update transaction", error);
      console.error("Backend response:", error?.response?.data);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  // Close drawer
  const handleClose = () => {
    if (loading) {
      return;
    }
    setError("");
    onClose();
  };
  // Original employee display
  const getOriginalEmployee = () => {
    if (!employee) {
      if (loadingEmployee) {
        return "Loading...";
      }
      return "—";
    }
    /*
     * Standard display:
     * EMP001
     * employeeCode is the human-readable
     * employee identifier.
     */
    return employee.employeeCode || employee.name || employee.id || "—";
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "500px",
          height: "100vh",
          borderRadius: "5px 0 0 5px",
          boxShadow: "-8px 0 30px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#4F46E5",
          color: "#FFFFFF",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Edit Transaction
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.3 }}>
            Update transaction information
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "#FFFFFF" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit(handleSave)}
        sx={{
          p: 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Section Heading */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              backgroundColor: "#E8F1FB",
              color: "#4F46E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EditIcon />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#12355B" }}
            >
              Transaction Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Modify the transaction information.
            </Typography>
          </Box>
        </Box>
        {/* Non-editable Information */}
        <Box
          sx={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E5E7EB",
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          {/* Transaction ID */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              Transaction ID
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 0.5,
                fontWeight: 600,
                color: "#12355B",
                wordBreak: "break-all",
              }}
            >
              {transaction?.id || "—"}
            </Typography>
          </Box>
          {/* Original Employee */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              Originally Performed By
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 0.5, fontWeight: 600, color: "#12355B" }}
            >
              {getOriginalEmployee()}
            </Typography>
          </Box>
          {/* Updated By */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              Updated By
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 0.5, fontWeight: 600, color: "#16A34A" }}
            >
              {transaction?.updatedBy || "—"}
            </Typography>
          </Box>
          {/* Status */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              Status
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 0.5,
                fontWeight: 600,
                color: transaction?.status === "EDITED" ? "#DC2626" : "#16A34A",
              }}
            >
              {transaction?.status || "ACTIVE"}
            </Typography>
          </Box>
          {/* Date & Time */}
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              Date & Time
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 0.5, fontWeight: 600, color: "#12355B" }}
            >
              {formatDateTime(transaction?.timestamp)}
            </Typography>
          </Box>
        </Box>
        {/* Transaction Type */}
        <Controller
          name="type"
          control={control}
          rules={{ required: "Transaction type is required." }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Transaction Type"
              error={!!errors.type}
              helperText={errors.type?.message}
              sx={{ mb: 2 }}
            >
              <MenuItem value="DEPOSIT">Deposit</MenuItem>
              <MenuItem value="WITHDRAW">Withdraw</MenuItem>
              <MenuItem value="TRANSFER">Transfer</MenuItem>
            </TextField>
          )}
        />
        {/* Amount */}
        <TextField
          fullWidth
          label="Amount"
          type="number"
          slotProps={{ inputLabel: { shrink: true } }}
          inputProps={{ min: 0.01, step: "0.01" }}
          {...register("amount", {
            required: "Amount is required.",
            valueAsNumber: true,
            validate: (value) =>
              value > 0 || "Amount must be greater than zero.",
          })}
          error={!!errors.amount}
          helperText={errors.amount?.message}
          sx={{ mb: 2 }}
        />
        {/* Deposit / Withdraw Account */}
        {(transactionType === "DEPOSIT" || transactionType === "WITHDRAW") && (
          <TextField
            fullWidth
            label="Customer Account Number"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("customerAccountNumber", {
              required: "Customer account number is required.",
            })}
            error={!!errors.customerAccountNumber}
            helperText={
              loadingAccounts
                ? "Loading account number..."
                : errors.customerAccountNumber?.message
            }
            disabled={loadingAccounts}
            sx={{ mb: 2 }}
          />
        )}
        {/* Transfer Accounts */}
        {transactionType === "TRANSFER" && (
          <>
            <TextField
              fullWidth
              label="Sender Account Number"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("senderAccountNumber", {
                required: "Sender account number is required.",
              })}
              error={!!errors.senderAccountNumber}
              helperText={
                loadingAccounts
                  ? "Loading account number..."
                  : errors.senderAccountNumber?.message
              }
              disabled={loadingAccounts}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Receiver Account Number"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("receiverAccountNumber", {
                required: "Receiver account number is required.",
              })}
              error={!!errors.receiverAccountNumber}
              helperText={
                loadingAccounts
                  ? "Loading account number..."
                  : errors.receiverAccountNumber?.message
              }
              disabled={loadingAccounts}
              sx={{ mb: 2 }}
            />
          </>
        )}
        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          multiline
          minRows={3}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("description")}
          sx={{ mb: 2 }}
        />
        {/* Error */}
        {error && (
          <Box
            sx={{
              mt: 1,
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: "#FEF2F2",
              border: "1px solid #FECACA",
            }}
          >
            <Typography variant="body2" sx={{ color: "#B91C1C" }}>
              {error}
            </Typography>
          </Box>
        )}
        {/* Buttons */}
        <Box
          sx={{
            mt: "auto",
            pt: 3,
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={loading}
            sx={{ textTransform: "none", borderRadius: 2, fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={
              loading || loadingAccounts || transaction?.status === "EDITED"
            }
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              backgroundColor: "#16A34A",
              "&:hover": { backgroundColor: "#15803D" },
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
export default EditTransactionDialog;