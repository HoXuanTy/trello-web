import { useCallback, useEffect, useRef, useState } from "react";
import {
	DndContext,
	DragOverlay,
	DragEndEvent,
	DragStartEvent,
	useSensor,
	useSensors,
	DragOverEvent,
	UniqueIdentifier,
	closestCorners,
	Active,
	Over,
	CollisionDetection,
	pointerWithin,
	getFirstCollision,
} from "@dnd-kit/core";
import { MouseSensor } from "@/customLibraries/DndKitSensors";
import { BoardProp, Card as CardType, Column as ColumnType } from "@/types/BoardProp";
import { arrayMove } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCard } from "@/utils/placeholderCard";
import { useAppDispatch } from "@/redux/hooks";
import { moveCardToDifferentColumn, updateBoard, updateColumn } from "@/redux/slices/boardSlice";

const ACTIVE_DRAG_TYPE = {
	COLUMN: "ACTIVE_DRAG_COLUMN_TYPE",
	CARD: "ACTIVE_DRAG_CARD_TYPE",
};
function BoardContent({ board }: BoardProp) {
	const dispatch = useAppDispatch();
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	});
	const sensors = useSensors(mouseSensor);

	const [orderedColumns, setOrderedColumns] = useState<ColumnType[]>([]);

	const [activeDraggingColumnData, setactiveDraggingColumnData] = useState<ColumnType | null>(null);
	const [activeDragType, setActiveDragType] = useState<string | null>(null);
	const [overleyDragData, setOverleyDragData] = useState<any>(null); // need mentor support

	const lastOverId = useRef<UniqueIdentifier | null>(null);

	useEffect(() => {
		setOrderedColumns(board.columns);
	}, [board]);

	const findColumnByCardId = (cardId: UniqueIdentifier): ColumnType | null => {
		const column = orderedColumns.find((column) => column.cards.map((card) => card._id).includes(cardId));
		return column ?? null;
	};

	const moveCardBetweenDifferentColumn = ({
		overColumn,
		overCardId,
		over,
		activeColumn,
		active,
		activeDraggingCardId,
		activeDraggingCardData,
		triggerFrom,
	}: {
		overColumn: ColumnType;
		overCardId: UniqueIdentifier;
		active: Active;
		over: Over;
		activeColumn: ColumnType;
		activeDraggingCardId: UniqueIdentifier;
		activeDraggingCardData: CardType;
		triggerFrom: "handleDragEnd" | "handleDragOver";
	}) => {
		setOrderedColumns((prevColumns) => {
			const overCardIndex = overColumn.cards.findIndex((card) => card._id === overCardId);

			let newCardIndex: number;
			//
			const isBelowOverItem =
				active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
			const modifier = isBelowOverItem ? 1 : 0;

			newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1;

			const nextColumns = cloneDeep(prevColumns);
			const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id);
			const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id);
			
			if (nextActiveColumn) {
				nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId);

				//add placeholder card if column is empty
				if (isEmpty(nextActiveColumn.cards)) {
					nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn) as any];
				}
				nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id);
			}
  
			if (nextOverColumn) {
				nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId);

				nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
					...activeDraggingCardData,
					columnId: overColumn._id,
				});

				// removed placeholder card if have card
				nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholderCard);

				nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id);
			}

			// dispath a thunk function
			if (triggerFrom === "handleDragEnd") {
				if (activeDraggingColumnData && nextOverColumn) {
					let prevCardOrderIds =
						nextColumns.find((column) => column._id === activeDraggingColumnData._id)?.cardOrderIds ?? [];

					if (String(prevCardOrderIds[0]).includes("placeholder-card")) prevCardOrderIds = [];

					dispatch(
						moveCardToDifferentColumn({
							newCardIndex: newCardIndex,
							currentCardId: activeDraggingCardId,
							prevColumnId: activeDraggingColumnData._id,
							prevCardOrderIds: prevCardOrderIds,
							nextColumnId: nextOverColumn._id,
							nextCardOrederIds: nextColumns.find((column) => column._id === nextOverColumn._id)?.cardOrderIds ?? [],
						}),
					);
				}
			}

			return nextColumns;
		});
	};

	const moveColumns = async (dndOrderedColumns: ColumnType[]) => {
		const newBoard = { ...board };
		newBoard.columns = dndOrderedColumns;
		newBoard.columnOrderIds = dndOrderedColumns.map((column) => column._id);
		dispatch(updateBoard({ boardId: newBoard._id, boardData: newBoard }));
	};

	const moveCardInSameColumn = async (
		dndOrderedCard: CardType[],
		dndOrderedCardIds: UniqueIdentifier[],
		columnId: UniqueIdentifier,
	) => {
		const updateData = { dndOrderedCard, dndOrderedCardIds, columnId };
		dispatch(updateColumn(updateData));
	};

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setActiveDragType(active.data.current?.columnId ? ACTIVE_DRAG_TYPE.CARD : ACTIVE_DRAG_TYPE.COLUMN);

		if (active.data.current?.columnId) {
			setactiveDraggingColumnData(findColumnByCardId(active.id));
		}

		setOverleyDragData(active.data.current); //
	};

	const handleDragOver = (event: DragOverEvent) => {
		if (activeDragType === ACTIVE_DRAG_TYPE.COLUMN) return;

		const { active, over } = event;

		const { id: activeDraggingCardId } = active;
		const activeDraggingCardData = active.data.current as CardType;
		const overCardId = over?.id;

		if (!overCardId) return;

		//find two columns by CardId
		const activeColumn = findColumnByCardId(activeDraggingCardId);
		const overColumn = findColumnByCardId(overCardId);

		if (!activeColumn || !overColumn) return;

		if (activeColumn._id !== overColumn._id) {
			moveCardBetweenDifferentColumn({
				overColumn,
				overCardId,
				active,
				over,
				activeColumn,
				activeDraggingCardId,
				activeDraggingCardData,
				triggerFrom: "handleDragOver",
			});
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		// handle drag drop column
		if (activeDragType === ACTIVE_DRAG_TYPE.COLUMN) {
			if (active.id !== over?.id) {
				const oldIndex = orderedColumns.findIndex((column) => column._id === active.id);
				const newIndex = orderedColumns.findIndex((column) => column._id === over?.id);
				const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);

				setOrderedColumns(dndOrderedColumns);
				moveColumns(dndOrderedColumns);
			}
		}

		//handle drag drop card
		if (activeDragType === ACTIVE_DRAG_TYPE.CARD) {
			const { id: activeDraggingCardId } = active;
			const activeDraggingCardData = active.data.current as CardType;
			const overCardId = over?.id;

			if (!overCardId) return;

			const activeColumn = findColumnByCardId(activeDraggingCardId);
			const overColumn = findColumnByCardId(overCardId);

			if (!activeDraggingColumnData) return;
			if (!activeColumn || !overColumn) return;

			if (activeDraggingColumnData._id !== overColumn._id) {
				moveCardBetweenDifferentColumn({
					overColumn,
					overCardId,
					active,
					over,
					activeColumn,
					activeDraggingCardId,
					activeDraggingCardData,
					triggerFrom: "handleDragEnd",
				});
			} else {
				// action drag and drop in same column
				const oldCardIndex = activeDraggingColumnData.cards.findIndex((card) => card._id === activeDraggingCardId);

				const newCardIndex = overColumn.cards.findIndex((card) => card._id === overCardId);

				const dndOrderedCard = arrayMove(activeDraggingColumnData.cards, oldCardIndex, newCardIndex);

				const dndOrderedCardIds = dndOrderedCard.map((card) => card._id);

				setOrderedColumns((prevColumns) => {
					const nextColumns = cloneDeep(prevColumns);
					const targetColum = nextColumns.find((column) => column._id === overColumn._id);
					if (!targetColum) {
						return [];
					}

					targetColum.cards = dndOrderedCard;
					targetColum.cardOrderIds = dndOrderedCardIds;
					return nextColumns;
				});

				moveCardInSameColumn(dndOrderedCard, dndOrderedCardIds, activeDraggingColumnData._id);
			}
		}

		setActiveDragType(null);
		setOverleyDragData(null);
		setactiveDraggingColumnData(null);
	};

	const collisionDetectionStrategy: CollisionDetection = useCallback(
		(args) => {
			if (activeDragType === ACTIVE_DRAG_TYPE.COLUMN) {
				return closestCorners({
					...args,
				});
			}

			const poiterIntersections = pointerWithin(args);

			if (!poiterIntersections.length) return [];

			let overId = getFirstCollision(poiterIntersections, "id");
			if (overId) {
				const overColumn = orderedColumns.find((column) => column._id === overId);
				if (overColumn) {
					overId = closestCorners({
						...args,
						droppableContainers: args.droppableContainers.filter(
							(container) => container.id !== overId && overColumn?.cardOrderIds.includes(container.id),
						),
					})[0]?.id;
				}

				lastOverId.current = overId;
				return [{ id: overId }];
			}
			return lastOverId.current ? [{ id: lastOverId.current }] : [];
		},
		[activeDragType],
	);

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			collisionDetection={collisionDetectionStrategy}
			sensors={sensors}
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
