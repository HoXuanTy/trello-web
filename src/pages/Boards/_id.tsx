import Container from "@mui/material/Container";

import BoardBar from "./BoardBar";
import AppHeader from "@/components/Header";
import BoardContent from "./BoardContent";

function Board() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
      }}
    >
      <AppHeader />
      <BoardBar />
      <BoardContent />
    </Container>
  );
}

export default Board;
