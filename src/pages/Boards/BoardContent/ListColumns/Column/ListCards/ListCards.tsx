import Box from "@mui/material/Box";
import Card from "./Card/Card";
import { Column } from "@/types/BoardProp";

function ListCards({ cards }: Pick<Column, "cards">) {
  return (
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
        <Card key={card._id} card={card}/>
      ))}
    </Box>
  );
}

export default ListCards;
