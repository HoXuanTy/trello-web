import { blue, cyan, deepOrange, orange } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
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
