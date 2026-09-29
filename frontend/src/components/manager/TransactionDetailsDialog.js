import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { getEmployee } from "../../services/employeeService";
function TransactionDetailsDialog({ transaction, open, onClose }) {
  const [employee, setEmployee] = useState(null);
  const [loadingEmployee, setLoadingEmployee] = useState(false);
  // Load original employee
  useEffect(() => {
    const loadEmployee = async () => {
      if (!transaction || !transaction.employeeId) {
        setEmployee(null);
        return;
      }
      try {
        setLoadingEmployee(true);
        const employeeData = await getEmployee(transaction.employeeId);
        setEmployee(employeeData);
      } catch (error) {
        console.error("Unable to load original employee", error);
        setEmployee(null);
      } finally {
        setLoadingEmployee(false);
      }
    };
    loadEmployee();
  }, [transaction]);
  // Original employee display
  const getOriginalEmployee = () => {
    if (loadingEmployee) {
      return "Loading...";
    }
    if (!employee) {
      return "—";
    }
    return employee.employeeCode || employee.name || employee.id || "—";
  };
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
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>Transaction Details</DialogTitle>
      <DialogContent dividers>
        {transaction && (
          <Box>
            <Card
              elevation={0}
              sx={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
              }}
            >
              <CardContent>
                {/* Type + Amount */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {transaction.type}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#2563EB" }}
                  >
                    ₹
                    {Number(transaction.amount || 0).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {/* Transaction ID */}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Transaction ID
                    </Typography>
                    <Typography
                      sx={{ fontWeight: 600, wordBreak: "break-all" }}
                    >
                      {transaction.id}
                    </Typography>
                  </Grid>
                  {/* Original Employee */}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Originally Performed By
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {getOriginalEmployee()}
                    </Typography>
                  </Grid>
                  {/* Updated By */}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Updated By
                    </Typography>
                    <Typography sx={{ fontWeight: 600, color: "#16A34A" }}>
                      {transaction.updatedBy || "—"}
                    </Typography>
                  </Grid>
                  {/* Status */}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color:
                          transaction.status === "EDITED"
                            ? "#DC2626"
                            : "#16A34A",
                      }}
                    >
                      {transaction.status || "ACTIVE"}
                    </Typography>
                  </Grid>
                  {/* Customer ID */}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Customer ID
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {transaction.customerId ||
                        transaction.senderCustomerId ||
                        "—"}
                    </Typography>
                  </Grid>
                  {/* Description */}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Description
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {transaction.description || "—"}
                    </Typography>
                  </Grid>
                  {/* Date & Time */}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Date & Time
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {formatDateTime(transaction.timestamp)}
                    </Typography>
                  </Grid>
                  {/* Transfer Details */}
                  {transaction.type === "TRANSFER" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="text.secondary">
                          Sender
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                          {transaction.senderCustomerId}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="text.secondary">
                          Receiver
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                          {transaction.receiverCustomerId}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default TransactionDetailsDialog;