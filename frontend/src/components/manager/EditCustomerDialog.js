import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
function EditCustomerDialog({ customer, open, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", phone: "" },
  });
  // Load customer details
  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
      });
    }
    setError("");
  }, [customer, reset]);
  // Save customer
  const handleSave = async (data) => {
    try {
      setLoading(true);
      setError("");
      await onUpdated({
        id: customer.id,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
      });
      onClose();
    } catch (error) {
      console.error("Unable to update customer", error);
      setError(error.response?.data?.message || "Unable to update customer.");
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
      {/* Drawer Header */}
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
            Edit Customer
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.3 }}>
            Update customer information
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
              Customer Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Modify the customer's basic information.
            </Typography>
          </Box>
        </Box>
        {/* Customer Identification */}
        <Box
          sx={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E5E7EB",
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          {/* Account Number */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              Account Number
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 0.5, fontWeight: 600, color: "#12355B" }}
            >
              {customer?.accountNumber || "—"}
            </Typography>
          </Box>
          {/* Customer ID */}
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              Customer ID
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 0.5, fontWeight: 600, color: "#12355B" }}
            >
              {customer?.id || "—"}
            </Typography>
          </Box>
        </Box>
        {/* Name */}
        <TextField
          fullWidth
          label="Customer Name"
          {...register("name", {
            required: "Customer name is required.",
            validate: (value) =>
              value.trim() !== "" || "Customer name is required.",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ mb: 2 }}
        />
        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email", {
            required: "Customer email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />
        {/* Phone */}
        <TextField
          fullWidth
          label="Phone"
          {...register("phone", {
            required: "Customer phone is required.",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must contain 10 digits.",
            },
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
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
        {/* Bottom Actions */}
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
            disabled={loading}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              backgroundColor: "#4F46E5",
              "&:hover": { backgroundColor: "#4338CA" },
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
export default EditCustomerDialog;