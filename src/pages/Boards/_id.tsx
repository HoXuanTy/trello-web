import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import BoardBar from "./BoardBar/BoardBar";
import AppHeader from "@/components/AppHeader/AppHeader";
import BoardContent from "./BoardContent/BoardContent";
import SideBar from "@/components/SideBar/SideBar";

import { mockData } from "@/apis/mock-data";

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
        <Box sx={{ width: "100%", height: "100%" }}>
          <BoardBar board={mockData.board} />
          <BoardContent board={mockData.board} />
        </Box>
      </Stack>
    </Container>
  );
}

export default Board;
