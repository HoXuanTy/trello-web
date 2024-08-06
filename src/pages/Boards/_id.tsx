import Container from "@mui/material/Container";
import BoardBar from "./BoardBar/BoardBar";
import AppHeader from "@/components/AppHeader/AppHeader";
import BoardContent from "./BoardContent/BoardContent";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { fetchBoard } from "@/redux/slices/boardSlice";
import { boardSelector } from "@/redux/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

function Board() {
  const dispath = useAppDispatch()
  const board  = useAppSelector(boardSelector);
  const boardId = "6695f954a1146cab78aec0e4";

  useEffect(() => {
    dispath(fetchBoard(boardId));
  }, [fetchBoard]);

  if (!board) {
    return (
      <Box
        sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress size={30} />
      </Box>
    );
  }

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
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
}

export default Board;
