import {
    AppBar,
    Avatar,
    Box,
    Toolbar,
    Typography
} from "@mui/material";
function EmployeeHeader({ employee }) {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "#FFFFFF",
                color: "#12355B",
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
                {/* ================================================= */}
                {/* BRAND */}
                {/* ================================================= */}
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: 30,
                            color: "#000000"
                        }}
                    >
                        SecureBank
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: "#64748B",
                            fontSize: 15
                        }}
                    >
                        Employee Transaction Portal
                    </Typography>
                </Box>
                {/* ================================================= */}
                {/* EMPLOYEE INFORMATION */}
                {/* ================================================= */}
                {employee && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5
                        }}
                    >
                        <Box
                            sx={{
                                textAlign: "right"
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 700,
                                    color: "#12355B"
                                }}
                            >
                                {employee.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#64748B"
                                }}
                            >
                                {employee.employeeCode}
                            </Typography>
                        </Box>
                        {/* Employee Avatar */}
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                background:
                                    "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
                                color: "#FFFFFF",
                                fontSize: "0.9rem",
                                fontWeight: 700
                            }}
                        >
                            {employee.name
                                ?.charAt(0)
                                ?.toUpperCase()}
                        </Avatar>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}
export default EmployeeHeader;