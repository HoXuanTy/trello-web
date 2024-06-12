import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    trello: {
      headerHeight: string;
      boardHeight: string;
    };
  }

  interface ThemeOptions {
    trello?: {
      headerHeight?: string;
      boardHeight?: string;
    };
  }
}

const theme = extendTheme({
  trello: {
    headerHeight: "48px",
    boardHeight: "56px",
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: blue,
    //     secondary: deepOrange
    //   },
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange
    //   },
    // },
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
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: "0.875rem",
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: "0.875rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light,
          },
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          },
        }),
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
        }
      }
    },
    MuiListItemButton:{
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiTypography:{
      styleOverrides: {
        root: {
          fontSize: 14
        }
      }
    },
    MuiAvatar :{
      styleOverrides: {
        root: {
          width: 24,
          height: 24
        }
      }
    },
   
  },
});

export default theme;
