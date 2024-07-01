import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import BoardProp, {
  Card as CardType,
  Column as ColumnType,
} from "@/types/BoardProp";
import mapOrder from "@/utils/sorts";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";

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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDragType(
      active.data.current?.columnId
        ? ACTIVE_DRAG_TYPE.CARD
        : ACTIVE_DRAG_TYPE.COLUMN
    );
    setActiveDragData(active.data.current); //
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
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#166194" : "#0984e3",
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
        {activeDragType === ACTIVE_DRAG_TYPE.COLUMN ? (
          <Column column={activeDragData} />
        ) : null}
        {activeDragType === ACTIVE_DRAG_TYPE.CARD ? (
          <Card card={activeDragData} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default BoardContent;
