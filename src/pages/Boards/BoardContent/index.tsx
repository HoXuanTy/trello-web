import Box from "@mui/material/Box";

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#166194" : "#0984e3",
        height: (theme) =>
          `calc(100vh - ${theme.trello.headerHeight} - ${theme.trello.boardHeight})`,
      }}
    >
      main contend
    </Box>
  );
}

export default BoardContent;
