import Container from "@mui/material/Container";
import BoardBar from "./BoardBar/BoardBar";
import AppHeader from "@/components/AppHeader/AppHeader";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "@/apis/mock-data";
import { useEffect, useState } from "react";
import { Board as BoardType } from "@/types/BoardProp";
import { fetchBoardDetailsAPI } from "@/apis/index";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Board() {
  // const [board, setBoard] = useState<BoardType | null>(null);

  // useEffect(() => {
  //   const boardId = "6695f954a1146cab78aec0e4";
  //   fetchBoardDetailsAPI(boardId).then((board: BoardType) => setBoard(board));
  // }, []);
  
  // if (!board) {
  //   return (
  //     <Box
  //       sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
  //     >
  //       <CircularProgress size={30} />
  //     </Box>
  //   );
  // }

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
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  );
}

export default Board;
