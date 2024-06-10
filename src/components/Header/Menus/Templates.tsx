import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Avatar from "@mui/material/Avatar";

import { deepOrange } from "@mui/material/colors";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function Templates() {
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
        onClick={handleClick}
        sx={{   fontSize: "14px" }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Templates
      </Button>
      <Menu
        id="templates-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "templates-button",
        }}
      >
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded" />
            <Box>
              <ListItemText>Project management</ListItemText>
            </Box>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Templates;
