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

  const [orderedColumns, setOrderedColumns] = useState<ColumnType[]>([]);

  const [activeDraggingData, setActiveDraggingData] = useState<ColumnType | null>(null);
  const [activeDragType, setActiveDragType] = useState<string | null>(null);
  const [overleyDragData, setOverleyDragData] = useState<any>(null); // ?????????

  useEffect(() => {
    setOrderedColumns(mapOrder(board.columns, board.columnOrderIds, "_id"));
  }, [board]);

  const findColumnByCardId = (cardId: UniqueIdentifier): ColumnType | null => {
    const column = orderedColumns.find((column) =>
      column.cards.map((card) => card._id).includes(cardId)
    );
    return column ?? null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveDragType(
      active.data.current?.columnId ? ACTIVE_DRAG_TYPE.CARD : ACTIVE_DRAG_TYPE.COLUMN
    );

    if (active.data.current?.columnId) {
      setActiveDraggingData(findColumnByCardId(active.id));
    }

    setOverleyDragData(active.data.current); //
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (activeDragType === ACTIVE_DRAG_TYPE.COLUMN) return;

    const { active, over } = event;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const overCardId = over?.id;

    if (!overCardId) return;

    //find two columns by CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevColumns) => {
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

    // handle drap drop column
    if (activeDragType === ACTIVE_DRAG_TYPE.COLUMN) {
      if (active.id !== over?.id) {
        setOrderedColumns((prevColumn) => {
          const oldIndex = prevColumn.findIndex((prevColumn) => prevColumn._id === active.id);
          const newIndex = prevColumn.findIndex((prevColumn) => prevColumn._id === over?.id);
          return arrayMove(prevColumn, oldIndex, newIndex);
        });
      }
    }

    //handle drag drop card
    if (activeDragType === ACTIVE_DRAG_TYPE.CARD) {
      const { id: activeDraggingCardId } = active;
      const overCardId = over?.id;

      if (!overCardId) return;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (activeDraggingData?._id !== overColumn._id) {
        console.log("2 column diffrent");
      } else {
        const oldCardIndex = activeDraggingData.cards.findIndex(
          (card) => card._id === activeDraggingCardId
        );

        const newCardIndex = overColumn.cards.findIndex((card) => card._id === overCardId);

        const orderedColumn = arrayMove(activeDraggingData.cards, oldCardIndex, newCardIndex);

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          const targetColum = nextColumns.find((column) => column._id === overColumn._id);
          if (!targetColum) {
            return [];
          }

          targetColum.cards = orderedColumn;
          targetColum.cardOrderIds = nextColumns.map((card) => card._id);
          return nextColumns;
        });
      }
    }

    setActiveDragType(null);
    setOverleyDragData(null);
    setActiveDraggingData(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
        {activeDragType === ACTIVE_DRAG_TYPE.COLUMN ? <Column column={overleyDragData} /> : null}
        {activeDragType === ACTIVE_DRAG_TYPE.CARD ? <Card card={overleyDragData} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default BoardContent;
