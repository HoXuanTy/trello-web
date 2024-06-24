import { useEffect, useState } from "react";

import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import BoardProp, { Column } from "@/types/BoardProp";
import mapOrder from "@/utils/sorts";

function BoardContent({ board }: BoardProp) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);

  const [orderedColumns, setOrderedColums] = useState<Column[]>([]);

  useEffect(() => {
    setOrderedColums(mapOrder(board.columns, board.columnOrderIds, "_id"));
  }, [board]);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("handleDragEnd", event);
    const { active, over } = event;

    if (active.id !== over?.id) {
      setOrderedColums((column) => {
        const oldIndex = column.findIndex((column) => column._id === active.id);
        const newIndex = column.findIndex((column) => column._id === over?.id);
        return arrayMove(column, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
    </DndContext>
  );
}

export default BoardContent;
