import { ReactNode, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MuiDrawer from "@mui/material/Drawer";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 260;

type ChildrenProp = {
  children: ReactNode;
};

function SideBar() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#1d2125" : "#0B50AD",
        borderRight: "1px solid #ffffff29"
      }}
    >
      <Button
        sx={{
          minWidth: 0,
          padding: 0,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <IconButton
          color="inherit"
          onClick={handleDrawerOpen}
          sx={{
            padding: 0,
            ...(open && { display: "none" }),
            position: "absolute",
            top: 0,
            left: 5,
            border: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#1d2125" : "#08479e",
            zIndex:1
          }}
        >
          <KeyboardArrowRightOutlinedIcon
            sx={{ fontSize: "24px", color: "#fff" }}
          />
        </IconButton>
        <Drawer
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              bgcolor: theme.palette.primary.dark,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon fontSize="medium" sx={{ color: "#fff" }} />
              ) : (
                <ChevronRightIcon fontSize="medium" sx={{ color: "#fff" }} />
              )}
            </IconButton>
          </DrawerHeader>
        </Drawer>
      </Button>
    </Box>
  );
}

export default SideBar;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create(["width", "opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(2)} + 1px)`,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
}));
