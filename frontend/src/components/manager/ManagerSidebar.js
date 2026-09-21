import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
function ManagerSidebar({
    open,
    activeView,
    onChange,
    onClose
}) {
    const handleNavigation = (view) => {
        onChange(view);
        onClose();
    };
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDrawer-paper": {
                    width: "400px",
                    height: "100vh",
                    borderRadius: "5px 0 0 5px",
                    boxShadow: "-8px 0 30px rgba(0,0,0,0.12)"
                }
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
                    backgroundColor: "#4F46E5 ",
                    color: "#FFFFFF"
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        Manager Navigation
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            opacity: 0.8,
                            mt: 0.3
                        }}
                    >
                        Manage SecureBank
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: "#FFFFFF"
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            {/* Navigation */}
            <List sx={{ p: 2 }}>
                {/* Dashboard */}
                <ListItemButton
                    selected={activeView === "dashboard"}
                    onClick={() => handleNavigation("dashboard")}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        py: 1.5,
                        "&.Mui-selected": {
                            backgroundColor: "#E8F1FB",
                            color: "#4F46E5 "
                        },
                        "&.Mui-selected:hover": {
                            backgroundColor: "#DCEBFA"
                        }
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 42,
                            color:
                                activeView === "dashboard"
                                    ? "#4F46E5 "
                                    : "#6B7280"
                        }}
                    >
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Dashboard"
                        secondary="Overview and summary"
                        primaryTypographyProps={{
                            fontWeight: 600
                        }}
                    />
                </ListItemButton>
                {/* Customers */}
                <ListItemButton
                    selected={activeView === "customers"}
                    onClick={() => handleNavigation("customers")}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        py: 1.5,
                        "&.Mui-selected": {
                            backgroundColor: "#E8F1FB",
                            color: "#4F46E5 "
                        },
                        "&.Mui-selected:hover": {
                            backgroundColor: "#DCEBFA"
                        }
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 42,
                            color:
                                activeView === "customers"
                                    ? "#4F46E5 "
                                    : "#6B7280"
                        }}
                    >
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Customers"
                        secondary="View and manage customers"
                        primaryTypographyProps={{
                            fontWeight: 600
                        }}
                    />
                </ListItemButton>
                {/* Transactions */}
                <ListItemButton
                    selected={activeView === "transactions"}
                    onClick={() => handleNavigation("transactions")}
                    sx={{
                        borderRadius: 2,
                        py: 1.5,
                        "&.Mui-selected": {
                            backgroundColor: "#E8F1FB",
                            color: "#4F46E5 "
                        },
                        "&.Mui-selected:hover": {
                            backgroundColor: "#DCEBFA"
                        }
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 42,
                            color:
                                activeView === "transactions"
                                    ? "#4F46E5 "
                                    : "#6B7280"
                        }}
                    >
                        <ReceiptLongIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Transactions"
                        secondary="View all transactions"
                        primaryTypographyProps={{
                            fontWeight: 600
                        }}
                    />
                </ListItemButton>
            </List>
            {/* Bottom information */}
            <Box
                sx={{
                    mt: "auto",
                    p: 3
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#F5F7FB",
                        border: "1px solid #E5E7EB"
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        SecureBank Manager Portal
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 0.5,
                            fontWeight: 600,
                            color: "#4F46E5 "
                        }}
                    >
                        Phase 1 Management System
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
}
export default ManagerSidebar;