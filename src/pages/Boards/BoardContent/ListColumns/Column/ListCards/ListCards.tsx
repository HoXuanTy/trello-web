import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import Card from "./Card/Card";
import { Column } from "@/types/BoardProp";

function ListCards({ cards }: Pick<Column, "cards">) {
  return (
    <SortableContext items={cards.map(card => card._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - 
        ${theme.spacing(5.5)} - 
        ${theme.trello.columnHeaderHeight} - 
        ${theme.trello.columnFooterHeight})`,
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#091e4224 #091e420f",
          p: "0 4px",
          m: "0 4px",
        }}
      >
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
