import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
function ShareBoard() {
  return (
    <>
      <Tooltip title="Share">
        <Chip
          icon={<PersonAddAltOutlinedIcon />}
          label="Share"
          sx={{
            borderRadius: "4px",
            bgcolor: "#DCDFE4",
            fontWeight: "500",
            fontSize: "14px",
            "& .MuiChip-label": {
              padding: 0,
            },
            "& .MuiChip-icon": {
              mx: 0,
              marginRight: "6px",
              color: "#333",
            },
            px: "12px",
            color: "#333"
          }}
        />
      </Tooltip>
    </>
  );
}

export default ShareBoard;
