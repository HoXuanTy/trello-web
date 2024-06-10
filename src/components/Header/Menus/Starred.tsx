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

function Starred() {
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
          id="starred-button"
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{   fontSize: "14px" }}
        >
          Starred
        </Button>
        <Menu
          id="starred-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "starred-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded" />
              <Box>
                <ListItemText>Project management</ListItemText>
                <ListItemText
                  sx={{
                    "& .MuiTypography-root": { fontSize: "12px" },
                    color: "gray",
                  }}
                >
                  Khong gian lam viec cua Ho Xuan Ty
                </ListItemText>
              </Box>
            </Stack>
          </MenuItem>
        </Menu>
      </>
    );
}

export default Starred