import { useState, useLayoutEffect, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import ContentCut from "@mui/icons-material/ContentCut";
import AddCardIcon from "@mui/icons-material/AddCard";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ContentPaste from "@mui/icons-material/ContentPaste";
import ContentCopy from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCards from "./ListCards/ListCards";
import { ColumnProp } from "@/types/ColumnProp";

function Column({ column }: ColumnProp) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: {
      ...column,
    },
  });

  const columnRef = useRef<HTMLElement>(null);
  const [heightRef, setHeightRef] = useState(0);

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  useLayoutEffect(() => {
    columnRef.current && setHeightRef(columnRef.current.offsetHeight);
  }, [columnRef.current?.offsetHeight]);

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    height: "100%",
  };

  const orderedCard = column.cards;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      {!isDragging ? (
        <Box
          {...listeners}
          ref={columnRef}
          sx={{
            minWidth: "272px",
            maxWidth: "272px",
            ml: 2,
            borderRadius: 3,
            bgcolor: (theme) => (theme.palette.mode === "dark" ? "#1d2125" : "#f1f2f4"),
            color: (theme) => (theme.palette.mode === "dark" ? "#ffffff" : "#172b4d"),
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5.5)})`,
            cursor: "pointer",
            pb: 0.5,
          }}
        >
          <Box
            sx={{
              height: (theme) => theme.trello.columnHeaderHeight,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{column.title}</Typography>
            <Box>
              <IconButton onClick={handleClick} sx={{ borderRadius: "8px" }}>
                <MoreHorizOutlinedIcon sx={{ fontSize: "20px" }} />
              </IconButton>
              <Menu
                id="workspaces-menu"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "workspaces-button",
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Add card</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Cut</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Copy</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Paste</Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Remove this column</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <ListCards
            columnId={column._id}
            cards={orderedCard}
            isOpenAddNewCard={openNewCardForm}
            toggleOpenNewCardForm={toggleOpenNewCardForm}
          />
          {!openNewCardForm && (
            <Box
              sx={{
                height: (theme) => theme.trello.columnFooterHeight,
                p: "4px 4px 0px 4px",
                m: "0 4px",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Button
                  onClick={toggleOpenNewCardForm}
                  startIcon={<AddIcon />}
                  sx={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderRadius: 2,
                  }}
                >
                  Add a card
                </Button>
                <Tooltip title="Drag to move">
                  <DragHandleIcon sx={{ fontSize: "25px", cursor: "pointer", marginRight: 1 }} />
                </Tooltip>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            minWidth: "272px",
            maxWidth: "272px",
            ml: 2,
            borderRadius: 3,
            bgcolor: "#333",
            height: heightRef,
          }}
        ></Box>
      )}
    </Box>
  );
}

export default Column;
