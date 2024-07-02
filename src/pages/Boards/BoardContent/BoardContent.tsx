import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  UniqueIdentifier,
  closestCorners,
} from "@dnd-kit/core";
import BoardProp, { Card as CardType, Column as ColumnType } from "@/types/BoardProp";
import { arrayMove } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import mapOrder from "@/utils/sorts";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep } from "lodash";

const ACTIVE_DRAG_TYPE = {
  COLUMN: "ACTIVE_DRAG_COLUMN_TYPE",
  CARD: "ACTIVE_DRAG_CARD_TYPE",
};
function BoardContent({ board }: BoardProp) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);

  const [orderedColumns, setOrderedColums] = useState<ColumnType[]>([]);

  const [activeDragType, setActiveDragType] = useState<string | null>(null);
  const [activeDragData, setActiveDragData] = useState<any>(null); // ?????????

  useEffect(() => {
    setOrderedColums(mapOrder(board.columns, board.columnOrderIds, "_id"));
  }, [board]);

  const findColumnByCardId = (cardId: UniqueIdentifier) => {
    return orderedColumns.find((column) => column.cards.map((card) => card._id).includes(cardId));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDragType(
      active.data.current?.columnId ? ACTIVE_DRAG_TYPE.CARD : ACTIVE_DRAG_TYPE.COLUMN
    );
    setActiveDragData(active.data.current); //
  };

  const hanldeDragOver = (event: DragOverEvent) => {
    console.log("handleDragOver", event);
    if (activeDragType === ACTIVE_DRAG_TYPE.COLUMN) return;

    const { active, over } = event;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active;
    const overCardId = over?.id;
    
    if (!overCardId) return;

    //find two columns by CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderedColums((prevColumns) => {
        const overCardIndex = overColumn.cards.findIndex((card) => card._id === overCardId);

        let newCardIndex: number;

        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1;

        const nextColumns = cloneDeep(prevColumns);
        const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id);
        const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id);

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id);
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData as CardType
          );
        }

        return nextColumns;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setOrderedColums((column) => {
        const oldIndex = column.findIndex((column) => column._id === active.id);
        const newIndex = column.findIndex((column) => column._id === over?.id);
        return arrayMove(column, oldIndex, newIndex);
      });
    }
    setActiveDragType(null);
    setActiveDragData(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={hanldeDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "#166194" : "#0984e3"),
          height: (theme) => theme.trello.boardContentHeight,
          padding: "8px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
      <DragOverlay
        style={{
          opacity: 0.8,
        }}
      >
        {activeDragType === ACTIVE_DRAG_TYPE.COLUMN ? <Column column={activeDragData} /> : null}
        {activeDragType === ACTIVE_DRAG_TYPE.CARD ? <Card card={activeDragData} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default BoardContent;
