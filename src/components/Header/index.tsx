import Box from "@mui/material/Box";
import SelectMode from "../../components/SelectMode";

function AppHeader() {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.headerHeight,
        backgroundColor: "primary.dark",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <SelectMode />
    </Box>
  );
}

export default AppHeader;
