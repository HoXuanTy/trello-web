// import { MouseEvent, useState } from "react";

import Chip from "@mui/material/Chip";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import Menu from "@mui/material/Menu";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Checkbox from "@mui/material/Checkbox";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";

import SvgIcon from "@mui/material/SvgIcon";
import ListIcon from "@/assets/icons/list.svg?react";
// import TableIcon from "@/assets/icons/table.svg?react";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// import CloseIcon from "@mui/icons-material/Close";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function CustomizeView() {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);

  // // const handleChange = (event: MouseEvent<HTMLButtonElement>) => {
  // //   setAnchorEl(event.currentTarget);
  // // };

  // // const handleClose = () => {
  // //   setAnchorEl(null);
  // // };

  return (
    <>
      <Tooltip title="Board">
        <Chip
          icon={<SvgIcon component={ListIcon} inheritViewBox />}
          label="Board"
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
            color:"#333"
          }}
        />
      </Tooltip>
      {/* <Button disableRipple onClick={handleChange} sx={{padding:0, minWidth:0}}>
        <Tooltip title="Customize Views">
          <IconButton
            sx={{
              borderRadius: "4px",
              "&:hover": {
                bgcolor: "#a6c5e229",
              },
              cursor: "pointer",
              padding: "6px",
            }}
            disableRipple
          >
            <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: "30px" }} />
          </IconButton>
        </Tooltip>
      </Button> */}
      {/* <Menu
        open={open}
        anchorEl={anchorEl}
        sx={{
          "& .MuiList-root": {
            width: "304px",
          },
        }}
        onClose={handleClose}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={1}
        >
          <Typography sx={{ flex: 1, textAlign: "center", fontSize: "14px" }}>
            Add and edit views
          </Typography>
          <IconButton
            sx={{
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#091e4224",
              },
            }}
            disableRipple
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Stack>
        <List>
          <ListItem sx={{ py: 0 }}>
            <DragIndicatorIcon />
            <Checkbox
              sx={{ padding: 0, fontSize: "18px", marginRight: "6px" }}
            />
            <ListItemButton sx={{ pl: 1 }}>
              <ListItemIcon sx={{ mr: 1 }}>
                <SvgIcon
                  component={TableIcon}
                  inheritViewBox
                  sx={{ width: "16px", height: "16px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Table" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ py: 0 }}>
            <DragIndicatorIcon />
            <Checkbox
              sx={{ padding: 0, fontSize: "18px", marginRight: "6px" }}
            />
            <ListItemButton disableGutters sx={{ pl: 1 }}>
              <ListItemIcon sx={{ mr: 1 }}>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItemButton>
          </ListItem>
        </List>
      </Menu> */}
    </>
  );
}

export default CustomizeView;
