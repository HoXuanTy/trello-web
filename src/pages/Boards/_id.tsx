import Container from "@mui/material/Container";

import BoardBar from "./BoardBar";
import AppHeader from "@/components/Header";
import BoardContent from "./BoardContent";
import SideBar from "@/components/SideBar/SideBar";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
function Board() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <AppHeader />
      <Stack direction="row">
        <SideBar />
        <Box sx={{width:"100%", height: "100%"}}>
          <BoardBar />
          <BoardContent />
        </Box>
      </Stack>
    </Container>
  );
}

export default Board;
