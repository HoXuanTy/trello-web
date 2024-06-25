import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { deepOrange, blue } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function WorkSpaces() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="workspaces-button"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ fontSize: "14px", color: "white" }}
      >
        Workspaces
      </Button>
      <Menu
        id="workspaces-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "workspaces-button",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: "12px", fontWeight: 600, margin: "16px 20px 8px" }}
        >
          Current Workspace
        </Typography>
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded">
              K
            </Avatar>
            <ListItemText>Ho Xuan Ty</ListItemText>
          </Stack>
        </MenuItem>
        <Divider />
        <Typography
          variant="h2"
          sx={{ fontSize: "12px", fontWeight: 600, margin: "16px 20px 8px" }}
        >
          Your Workspace
        </Typography>
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded">
              K
            </Avatar>
            <ListItemText>Ho Xuan Ty</ListItemText>
          </Stack>
        </MenuItem>
        <Typography
          variant="h2"
          sx={{ fontSize: "12px", fontWeight: 600, margin: "16px 20px 8px" }}
        >
          Guest Workspace
        </Typography>
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: blue[800] }} variant="rounded">
              T
            </Avatar>
            <ListItemText>Thu Huong</ListItemText>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}

export default WorkSpaces;
