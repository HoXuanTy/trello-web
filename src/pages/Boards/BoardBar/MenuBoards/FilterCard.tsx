import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

import FilterListIcon from "@mui/icons-material/FilterList";
function FilterCard() {
  return (
    <>
      <Tooltip title="Filter cards">
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          sx={{
            borderRadius: "4px",
            bgcolor: "inherit",
            fontWeight: "500",
            fontSize: "14px",
            px: 1,
            "& .MuiChip-label": {
              padding: 0,
            },
            "& .MuiChip-icon": {
              mx: 0,
              marginRight: "6px",
              color: "#fff",
            },
            color: "#fff",
            "&:hover": {
              bgcolor: "#a6c5e229",
            },
          }}
        />
      </Tooltip>
    </>
  );
}

export default FilterCard;
