import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

import StarOutlineIcon from "@mui/icons-material/StarOutline";

import ChangeVisibility from "./MenuBoards/ChangeVisibility";
function BoardBar() {
  return (
    <Box
      px={2}
      sx={{
        height: (theme) => theme.trello.boardHeight,
        backgroundColor: "primary.dark",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Chip
          label="Project management"
          sx={{
            fontSize: "18px",
            color: "#fff",
            bgcolor: "inherit",
            fontWeight: "900",
            "&:hover": {
              bgcolor: "#a6c5e229",
            },
            borderRadius: "4px",
            textTransform: "capitalize",
          }}
        />
        <IconButton
          disableRipple
          sx={{
            "&:hover": {
              bgcolor: "#a6c5e229",
            },
            borderRadius: "4px",
          }}
        >
          <StarOutlineIcon
            sx={{
              fontSize: "18px",
              color: "#fff",
              "&:hover": {
                transform: "scale(1.2)",
                cursor: "pointer",
              },
              height: "100%",
            }}
          />
        </IconButton>
        <ChangeVisibility />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}></Box>
    </Box>
  );
}

export default BoardBar;
