import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const HEADER_HEIGHT = "48px";
const BOARD_HEIGHT = "56px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${HEADER_HEIGHT} - ${BOARD_HEIGHT})`;

declare module "@mui/material/styles" {
  interface Theme {
    trello: {
      headerHeight: string;
      boardHeight: string;
      boardContentHeight: string;
    };
  }

  interface ThemeOptions {
    trello?: {
      headerHeight?: string;
      boardHeight?: string;
      boardContentHeight: string;
    };
  }
}

const theme = extendTheme({
  trello: {
    headerHeight: HEADER_HEIGHT,
    boardHeight: BOARD_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: "0.875rem" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { fontSize: "0.875rem" },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "16px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: 14,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 24,
          height: 24,
        },
      },
    },
  },
});

export default theme;
