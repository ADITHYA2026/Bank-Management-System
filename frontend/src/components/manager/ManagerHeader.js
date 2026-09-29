import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "../common/LogoutButton";
function ManagerHeader({ onMenuClick }) {
  const username = localStorage.getItem("username") || "Manager";
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
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
        {/* Brand */}
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
              Manager Portal
            </Typography>
          </Box>
        </Box>
        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Manager Information */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#12355B", lineHeight: 1.2 }}
              >
                {username}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B" }}>
                Manager
              </Typography>
            </Box>
          </Box>
          {/* Logout */}
          <LogoutButton />
          {/* Menu */}
          <IconButton
            onClick={onMenuClick}
            sx={{
              width: 42,
              height: 42,
              color: "#2563EB",
              backgroundColor: "#EFF6FF",
              border: "1px solid #D6E4FF",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#DBEAFE",
                borderColor: "#2563EB",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ManagerHeader;