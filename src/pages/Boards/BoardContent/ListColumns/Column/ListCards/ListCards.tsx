import { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import Card from "./Card/Card";
import { Card as CardType } from "@/types/BoardProp";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import theme from "@/theme";
import { default as MuiCard } from "@mui/material/Card";

interface ListCardsProp {
  cards: CardType[];
  isOpenAddNewCard: boolean;
  toggleOpenNewCardForm: () => void;
}

function ListCards({ cards, isOpenAddNewCard, toggleOpenNewCardForm }: ListCardsProp) {
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleAddNewCard = () => {
    console.log("new Card", newCardTitle);
    //goi APIs ...

    setNewCardTitle("");
  };

  const maxHeightListCard = !isOpenAddNewCard
    ? `calc(${theme.trello.boardContentHeight} -  ${theme.spacing(6.5)} - ${
        theme.trello.columnHeaderHeight
      } - ${theme.trello.columnFooterHeight})`
    : `calc(${theme.trello.boardContentHeight} - ${theme.spacing(6.5)} - ${
        theme.trello.columnHeaderHeight
      })`;

  return (
    <SortableContext items={cards.map((card) => card._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxHeight: maxHeightListCard,
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#091e4224 #091e420f",
          p: "0 4px 4px 4px",
          m: "0 4px",
        }}
      >
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
        {isOpenAddNewCard && (
          <Box
            sx={{
              height: "100%",
              bgcolor: (theme) => (theme.palette.mode === "dark" ? "#1d2125" : "#f1f2f4"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1, width: "100%", mb: 1 }}>
              <MuiCard sx={{ mb: 1, boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", borderRadius: 2 }}>
                <TextField
                  id="input-with-icon-textfield"
                  placeholder="Enter a name for this card..."
                  variant="outlined"
                  size="small"
                  autoFocus
                  multiline
                  maxRows={6}
                  minRows={2}
                  data-no-dnd="true"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  sx={{
                    flex: 1,
                    width: "100%",
                    "& input": {
                      bgcolor: "white",
                      fontWeight: "600",
                      lineHeight: "1.5rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      ".MuiOutlinedInput-notchedOutline": { border: "none" },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
              </MuiCard>
              <Button variant="contained" onClick={handleAddNewCard}>
                Add Card
              </Button>
              <IconButton
                onClick={toggleOpenNewCardForm}
                disableRipple
                sx={{
                  ml: 0.5,
                  borderRadius: "4px",
                  color: "#172b4d",
                  "&:hover": {
                    bgcolor: "#a6c5e229",
                  },
                  cursor: "pointer",
                }}
              >
                <CloseIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
