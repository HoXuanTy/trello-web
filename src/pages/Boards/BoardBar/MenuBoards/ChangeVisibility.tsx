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

import SvgIcon from "@mui/material/SvgIcon";

import { Board } from "@/types/BoardProp";

function ChangeVisibility({ types }: Pick<Board, "types">) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
          <Typography sx={{ flex: 1, textAlign: "center" }}>
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
        {types.map((item) => (
          <MenuItem key={item._id} sx={{ whiteSpace: "normal" }} disabled={item.disabled}>
            <Box>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <SvgIcon
                  component={item.icon}
                  inheritViewBox
                  sx={{
                    fontSize: "16px",
                    color:
                      item.title === "private"
                        ? "red"
                        : item.title === "public"
                        ? "green"
                        : "inherit",
                  }}
                />
                <ListItemText
                  sx={{ textTransform: "capitalize" }}
                  primary={item.title}
                />
              </Stack>
              <Typography variant="body2" sx={{ fontSize: "12px", mt: 0.5 }}>
                {item.description}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ChangeVisibility;
