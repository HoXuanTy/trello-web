import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

function SideBar() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ marginTop: "14px", marginLeft: "15px" }}>
      <Tooltip title="Expand sidebar">
        <IconButton
          onClick={handleDrawerOpen}
          sx={{
            '& .css-zs3zq1-MuiButtonBase-root-MuiIconButton-root':{
                padding:"0px !important"
            }
          }}
        >
          <KeyboardArrowRightOutlinedIcon sx={{ fontSize: "24px" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default SideBar;
