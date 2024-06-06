import { blue, cyan, deepOrange, orange } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Theme {
    trello: {
      headerHeight: string
      boardHeight: string
    }
  }

  interface ThemeOptions {
    trello?: {
      headerHeight?: string
      boardHeight?: string
    }
  }
}

const theme = extendTheme({
  trello: {
    headerHeight: '48px',
    boardHeight: '56px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: blue,
        secondary: deepOrange
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      },
    },
  },
});

export default theme;
