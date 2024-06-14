import Box from "@mui/material/Box";
import SelectMode from "@/components/SelectMode";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import SvgIcon from "@mui/material/SvgIcon";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import TrelloIcon from "@/assets/icons/trello.svg?react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import WorkSpaces from "./Menus/WorkSpaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import Profile from "./Menus/Profile";

function AppHeader() {
  return (
    <Box
      px={2}
      sx={{
        height: (theme) => theme.trello.headerHeight,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#1d2125" : "#08479e",
        borderBottom: "1px solid #ffffff29"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AppsIcon sx={{ color: "white", fontSize: "20px" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{ fontSize: 20, color: "white" }}
          />
          <Typography
            component="span"
            sx={{ fontSize: "21px", fontWeight: "bold", color: "white" }}
          >
            Trello
          </Typography>
        </Box>

        <WorkSpaces />
        <Recent />
        <Starred />
        <Templates />
        <Button
          variant="outlined"
          sx={{
            fontSize: "14px",
            color: "white",
            border: "none",
            "&:hover": { border: "none" },
            bgcolor: "#fff3",
          }}
        >
          Create
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "23ch" },
            "& .MuiOutlinedInput-input": {
              py: 0.8,
              px: 1,
            },
            "& .MuiInputAdornment-root": {
              marginRight: 0,
            },
            "& .MuiInputBase-root": {
              paddingLeft: 1,
            },
          }}
          noValidate
          autoComplete="on"
        >
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: "20px", color: "white" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              padding: 0,
              "& input": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            variant="outlined"
          />
        </Box>
        <SelectMode />
        <Tooltip title="Notifications">
          <IconButton>
            <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
              <NotificationsOutlinedIcon
                sx={{ color: "white", fontSize: "20px" }}
              />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Information">
          <IconButton>
            <HelpOutlineIcon sx={{ color: "white", fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
}

export default AppHeader;
