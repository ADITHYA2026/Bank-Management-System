import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
function ManagerHeader({ onMenuClick }) {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                borderBottom: "1px solid #E5E7EB"
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    minHeight: 72
                }}
            >
                {/* Brand */}
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: 30,
                        }}
                    >
                        SecureBank
                    </Typography>
                    <Typography 
                        variant="caption"
                        sx={{
                            color: "text.secondary",
                            fontSize: "15px"
                        }}
                    >
                        Manager Portal
                    </Typography>
                </Box>
                {/* Right Menu */}
                <IconButton
                    onClick={onMenuClick}
                    sx={{
                        color: "#000000",
                        border: "1px solid #E5E7EB",
                        borderRadius: 2,
                        "&:hover": {
                            backgroundColor: "#F5F7FB"
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
export default ManagerHeader;