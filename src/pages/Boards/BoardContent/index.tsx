import Box from "@mui/material/Box";

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        height: (theme) =>
          `calc(100vh - ${theme.trello.headerHeight} - ${theme.trello.boardHeight})`,
      }}
    >
      main contend
    </Box>
  );
}

export default BoardContent;
