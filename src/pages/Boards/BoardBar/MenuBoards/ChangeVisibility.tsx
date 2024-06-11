import { MouseEvent, useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";

import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import { orange, green } from "@mui/material/colors";

import SvgIcon from "@mui/material/SvgIcon";
import EnterpriseIcon from "@/assets/icons/enterprise.svg?react";

function ChangeVisibility() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  console.log("an", anchorEl);

  const handleChange = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Change visibility">
        <IconButton
          disableRipple
          sx={{
            borderRadius: "4px",
            "&:hover": {
              bgcolor: "#a6c5e229",
            },
            cursor: "pointer",
          }}
          onClick={handleChange}
        >
          <LockOutlinedIcon
            sx={{
              fontSize: "16px",
              color: "#fff",
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          "& .MuiList-root": {
            width: "384px",
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={1}
        >
          <Typography sx={{ flex: 1, textAlign: "center", fontSize: "14px" }}>
            Change Visibility
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
        <MenuItem sx={{ whiteSpace: "normal" }}>
          <Box>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <LockOutlinedIcon sx={{ fontSize: "14px", color: orange[900] }} />
              <ListItemText
                primary="Privite"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                  },
                }}
              />
            </Stack>
            <Typography variant="body2" sx={{ fontSize: "12px", mt: 0.5 }}>
              Board members and không gian làm việc của Tý Hồ xuân Workspace
              admins can see and edit this board.
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem sx={{ whiteSpace: "normal" }}>
          <Box>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <PeopleAltOutlinedIcon sx={{ fontSize: "16px" }} />
              <ListItemText
                primary="Workspace"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                  },
                }}
              />
            </Stack>
            <Typography variant="body2" sx={{ fontSize: "12px", mt: 0.5 }}>
              All members of the không gian làm việc của Tý Hồ xuân Workspace
              can see and edit this board.
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem sx={{ whiteSpace: "normal" }} disabled>
          <Box>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <SvgIcon
                component={EnterpriseIcon}
                inheritViewBox
                sx={{ fontSize: "16px" }}
              />
              <ListItemText
                primary="Organization"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                  },
                }}
              />
            </Stack>
            <Typography variant="body2" sx={{ fontSize: "12px", mt: 0.5 }}>
              All members of the organization can see this board. The board must
              be added to an enterprise Workspace to enable this.
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem sx={{ whiteSpace: "normal" }}>
          <Box>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <PublicOutlinedIcon
                sx={{ fontSize: "14px", color: green[700] }}
              />
              <ListItemText
                primary="Public"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                  },
                }}
              />
            </Stack>
            <Typography variant="body2" sx={{ fontSize: "12px", mt: 0.5 }}>
              Anyone on the internet can see this board. Only board members can
              edit.
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ChangeVisibility;
