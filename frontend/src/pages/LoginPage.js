import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../services/authService";
function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }
    try {
      setLoading(true);
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      if (data.employeeId) {
        localStorage.setItem("employeeId", data.employeeId);
      }
      if (data.role === "MANAGER") {
        navigate("/manager");
      } else if (data.role === "EMPLOYEE") {
        navigate("/employee");
      } else {
        setError("Invalid user role.");
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Invalid username or password.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F7FB",
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 420,
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Typography variant="h4" fontWeight={700} color="#2563EB">
            Secure Bank of India
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            Sign in to continue
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin="normal"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              marginTop: 3,
              padding: 1.4,
              borderRadius: 2,
              backgroundColor: "#2563EB",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
export default LoginPage;