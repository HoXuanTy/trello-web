import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const HEADER_HEIGHT = "48px";
const BOARD_HEIGHT = "56px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${HEADER_HEIGHT} - ${BOARD_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";

declare module "@mui/material/styles" {
  interface Theme {
    trello: {
      headerHeight: string;
      boardHeight: string;
      boardContentHeight: string;
      columnHeaderHeight: string;
      columnFooterHeight: string;
    };
  }

  interface ThemeOptions {
    trello?: {
      headerHeight?: string;
      boardHeight?: string;
      boardContentHeight?: string;
      columnHeaderHeight?: string;
      columnFooterHeight?: string;
    };
  }
}

const theme = extendTheme({
  trello: {
    headerHeight: HEADER_HEIGHT,
    boardHeight: BOARD_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "#172b4d",
        },
      },
    },
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
        input: {
          "&::placeholder": { color: "#172b4d", fontWeight: "600" },
        },
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
