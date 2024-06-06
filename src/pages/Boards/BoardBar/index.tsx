import Box from "@mui/material/Box";

function BoardBar() {
  return (
    <Box
    sx={{
      height: (theme) => theme.trello.boardHeight,
      backgroundColor: "primary.main",
    }}
  >
    Board_bar
  </Box>
  )
}

export default BoardBar
