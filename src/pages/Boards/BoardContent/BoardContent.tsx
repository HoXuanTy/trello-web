import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";


function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#166194" : "#0984e3",
        height: (theme) => theme.trello.boardContentHeight,
        padding: "8px 0"    
      }}
    >
      <ListColumns />
    </Box>
  );
}

export default BoardContent;
