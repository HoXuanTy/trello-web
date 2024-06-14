import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BoltIcon from "@mui/icons-material/Bolt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import FilterCard from "./MenuBoards/FilterCard";
import CustomizeView from "./MenuBoards/CustomizeView";
import ChangeVisibility from "./MenuBoards/ChangeVisibility";
import GroupAvatar from "@/components/GroupAvatars/GroupAvatar";
import ShareBoard from "./MenuBoards/ShareBoard";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
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
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#0E4473" : "#0B50AD",
        borderBottom: "1px solid #ffffff29"
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
        <CustomizeView />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title="calendar">
          <CalendarMonthIcon sx={{ color: "#fff" }} />
        </Tooltip>
        <Tooltip title="Automation">
          <BoltIcon sx={{ color: "#fff" }} />
        </Tooltip>
        <FilterCard />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ borderColor: "rgba(255 255 255 / 0.13)" }}
        />
        <GroupAvatar />
        <ShareBoard />
        <MoreHorizOutlinedIcon sx={{ color: "#fff" }} />
      </Box>
    </Box>
  );
}

export default BoardBar;
