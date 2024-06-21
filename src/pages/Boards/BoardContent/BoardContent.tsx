import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import BoardProp from "@/types/BoardProp";
import mapOrder from "@/utils/sorts";

function BoardContent({board}: BoardProp) {
  const orderedColumns = mapOrder(board.columns, board.columnOrderIds, "_id")
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#166194" : "#0984e3",
        height: (theme) => theme.trello.boardContentHeight,
        padding: "8px 0"    
      }}
    >
      <ListColumns columns={orderedColumns}/>
    </Box>
  );
}

export default BoardContent;
