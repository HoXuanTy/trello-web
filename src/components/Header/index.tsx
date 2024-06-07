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
import TrelloIcon from "@/assets/trello.svg?react";
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
        backgroundColor: "primary.dark",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AppsIcon />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{ fontSize: 20 }}
          />
          <Typography
            component="span"
            sx={{ fontSize: "21px", fontWeight: "bold" }}
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
          sx={{ color: "#fff", textTransform: "capitalize", fontSize: "14px" }}
        >
          Create
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "23ch" },
            "& .MuiInputBase-input": {
              py: 0.5,
              px: 1,
              
            },
            "& .MuiInputAdornment-root": {
              marginRight: 0
            },
            "& .MuiInputBase-root": {
              paddingLeft: 1
            }
          }}
          noValidate
          autoComplete="on"
        >
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{fontSize: '20px'}}/>
                </InputAdornment>
              ),
            }}
            sx={{padding:0}}
            variant="outlined"
          />
        </Box>
        <SelectMode />
        <Tooltip title="Notifications">
          <Badge color="info" variant="dot" sx={{ cursor: "pointer" }}>
            <IconButton size="small">
              <NotificationsOutlinedIcon />
            </IconButton>
          </Badge>
        </Tooltip>
        <Tooltip title="Information">
          <IconButton size="small">
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
}

export default AppHeader;
