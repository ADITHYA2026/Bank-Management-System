import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import LogoutButton from "../common/LogoutButton";
function EmployeeHeader({ employee }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#12355B",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 76,
          px: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* BRAND */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: 18,
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.20)",
            }}
          >
            S
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 22, md: 26 },
                lineHeight: 1.1,
                color: "#0F172A",
              }}
            >
              SecureBank
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#64748B", fontSize: 13 }}
            >
              Employee Transaction Portal
            </Typography>
          </Box>
        </Box>
        {/* EMPLOYEE INFORMATION + LOGOUT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
          }}
        >
          {employee && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  textAlign: "right",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#12355B" }}
                >
                  {employee.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748B" }}>
                  {employee.employeeCode}
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  background:
                    "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.18)",
                }}
              >
                {employee.name?.charAt(0)?.toUpperCase()}
              </Avatar>
            </Box>
          )}
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default EmployeeHeader;
