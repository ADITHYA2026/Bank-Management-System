import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
function AnalyticsFilters({ filters, onFilterChange, onApply, onReset }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
        }}
      >
        <FilterAltOutlinedIcon
          sx={{ color: "#4F46E5" }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#12355B",
          }}
        >
          Filters
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 0.8,
              fontWeight: 600,
              color: "#475569",
            }}
          >
            From Date
          </Typography>
          <TextField
            fullWidth
            type="date"
            value={filters.fromDate}
            onChange={(event) => onFilterChange("fromDate", event.target.value)}
            inputProps={{
              max: filters.toDate || undefined,
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 0.8,
              fontWeight: 600,
              color: "#475569",
            }}
          >
            To Date
          </Typography>
          <TextField
            fullWidth
            type="date"
            value={filters.toDate}
            onChange={(event) => onFilterChange("toDate", event.target.value)}
            inputProps={{
              min: filters.fromDate || undefined,
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 0.8,
              fontWeight: 600,
              color: "#475569",
            }}
          >
            Transaction Type
          </Typography>
          <TextField
            fullWidth
            select
            value={filters.type}
            onChange={(event) => onFilterChange("type", event.target.value)}
          >
            <MenuItem value="ALL">All Transactions</MenuItem>
            <MenuItem value="DEPOSIT">Deposits</MenuItem>
            <MenuItem value="WITHDRAW">Withdrawals</MenuItem>
            <MenuItem value="TRANSFER">Transfers</MenuItem>
          </TextField>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
          mt: 3,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<RestartAltIcon />}
          onClick={onReset}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
            color: "#475569",
            borderColor: "#CBD5E1",
            "&:hover": {
              borderColor: "#94A3B8",
              backgroundColor: "#F8FAFC",
            },
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          startIcon={<FilterAltOutlinedIcon />}
          onClick={onApply}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
            backgroundColor: "#4F46E5",
            "&:hover": {
              backgroundColor: "#4338CA",
            },
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Paper>
  );
}
export default AnalyticsFilters;