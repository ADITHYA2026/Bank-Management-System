import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("employeeId");
    navigate("/login");
  };
  return (
    <Button
      onClick={handleLogout}
      variant="outlined"
      startIcon={<LogoutIcon />}
      sx={{
        color: "#2563EB",
        borderColor: "#D6E4FF",
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        px: 2,
        "&:hover": {
          backgroundColor: "#EFF6FF",
          borderColor: "#2563EB",
        },
      }}
    >
      Logout
    </Button>
  );
}
export default LogoutButton;