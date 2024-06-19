import { useState } from "react";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";

import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import PersonAdd from "@mui/icons-material/PersonAdd";

import Image1 from "@/assets/image/image1.jpg";
import { deepOrange } from "@mui/material/colors";
function Profile() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account">
        <IconButton onClick={handleClick} size="small">
          <Avatar sx={{ width: "24px", height: "24px" }} src={Image1} />
        </IconButton>
      </Tooltip>
      <Menu
        id="workspaces-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "workspaces-button",
        }}
        sx={{ "& .MuiMenu-list": { px: 1 } }}
      >
        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 700,
            margin: "16px 20px 8px",
          }}
        >
          Account
        </Typography>
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{ bgcolor: deepOrange[500], width: "40px", height: "40px" }}
              variant="circular"
              sizes="medium"
              src={Image1}
            />
            <Box>
              <Typography>Ho Xuan Ty</Typography>
              <Typography sx={{ fontSize: "12px", color: "gray" }}>
                hoxuanty@gmail.com
              </Typography>
            </Box>
          </Stack>
        </MenuItem>
        <Divider />
        <Typography
          variant="h2"
          sx={{
            fontSize: "12px",
            fontWeight: 600,
            margin: "16px 20px 8px",
            textTransform: "uppercase",
          }}
        >
          Trello
        </Typography>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Profile;
