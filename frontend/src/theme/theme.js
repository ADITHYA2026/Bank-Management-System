import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    palette: {
        primary: {
            main: "#2563EB"
        },
        secondary: {
            main: "#7C3AED"
        },
        background: {
            default: "#F5F7FB",
            paper: "#FFFFFF"
        },
        success: {
            main: "#16A34A"
        },
        error: {
            main: "#DC2626"
        }
    },
    typography: {
        fontFamily: [
            "Inter",
            "Roboto",
            "Arial",
            "sans-serif"
        ].join(","),
        h4: {
            fontWeight: 700
        },
        h5: {
            fontWeight: 700
        },
        h6: {
            fontWeight: 600
        }
    },
    shape: {
        borderRadius: 12
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 10
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16
                }
            }
        }
    }
});
export default theme;