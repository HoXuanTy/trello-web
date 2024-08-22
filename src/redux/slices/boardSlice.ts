import {
    createNewCardAPI,
    createNewColumnAPI,
    fetchBoardDetailsAPI,
    moveCardToDifferentColumnAPI,
    updateBoardDetailsAPI,
    updateColumnDetailsAPI
} from "@/apis"
import { Board, Card, Column } from "@/types/BoardProp"
import mapOrder from "@/utils/sorts"
import { UniqueIdentifier } from "@dnd-kit/core"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

interface boardState {
    board: Board
    status: 'idle' | 'pending' | 'fulfilled' | 'failed'
}

const initialState: boardState = {
    board: {
        _id: '',
        title: '',
        description: '',
        columnOrderIds: [],
        columns: [],
        slug: '',
        isImage: true,
        backgroundImageLink: ''
    },
    status: 'idle'
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBoardDetails.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(fetchBoardDetails.fulfilled, (state, action: PayloadAction<Board>) => {
                state.board = action.payload
                state.status = "idle"
            })
            .addCase(createNewColumn.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(createNewColumn.fulfilled, (state, action: PayloadAction<Column>) => {
                state.board.columns.push(action.payload)
                state.board.columnOrderIds.push(action.payload._id)
                state.status = "idle"
            })
            .addCase(createNewCard.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(createNewCard.fulfilled, (state, action: PayloadAction<Card>) => {
                state.board.columns = state.board.columns.map((column) => {
                    if (column._id === action.payload.columnId) {
                        column.cards.push(action.payload)
                        column.cardOrderIds.push(action.payload._id)
                    }
                    return column
                })
            })
            .addCase(updateBoard.fulfilled, (state, action: PayloadAction<Board>) => {
                state.board = action.payload
                state.status = "idle"
            })
            .addCase(updateColumn.fulfilled, (state, action) => {
                state.board.columns.forEach(column => {
                    if (column._id === action.payload._id) {
                        column.cards = action.payload.cards
                        column.cardOrderIds = action.payload.cardOrderIds
                    }
                    return column
                })
            })
            .addCase(moveCardToDifferentColumn.fulfilled, (state, action) => {
                const { currentCardId, prevColumnId, nextColumnId, newCardIndex } = action.payload
                state.board.columns.forEach(column => {
                    column.cards = mapOrder(column.cards, column.cardOrderIds, "_id")
                })
                const fromColumn = state.board.columns.find(column => column._id === prevColumnId);
                const toColumn = state.board.columns.find(column => column._id === nextColumnId);

                if (fromColumn && toColumn) {
                    const cardIndex = fromColumn.cards.findIndex(card => card._id === currentCardId);
                    const [movedCard] = fromColumn.cards.splice(cardIndex, 1);

                    toColumn.cards = toColumn.cards.toSpliced(newCardIndex, 0, movedCard)
                    toColumn.cardOrderIds = toColumn.cards.map(card => card._id)

                    fromColumn.cards = fromColumn.cards.filter(card => card._id !== currentCardId);
                    fromColumn.cardOrderIds = fromColumn.cards.map(card => card._id)
                }
                state.status = "idle"
            })
            .addCase(moveCardToDifferentColumn.rejected, (state, action) => {
                state.status = "failed"
            })
    },
})

export const fetchBoardDetails = createAsyncThunk("board/fetchBoard",
    async (boardId: UniqueIdentifier) => {
        const board = await fetchBoardDetailsAPI(boardId)
        return board
    })

export const updateBoard = createAsyncThunk("board/updateBoard",
    async (updateData: { boardId: UniqueIdentifier, boardData: Board }) => {
        const { boardId, boardData } = updateData
        const updatedBoard = await updateBoardDetailsAPI(boardId, boardData)
        return updatedBoard
    })

export const moveCardToDifferentColumn = createAsyncThunk("board/moveCardToDifferentColumn",
    async (updateData: {
        newCardIndex: number,
        currentCardId: UniqueIdentifier,
        prevColumnId: UniqueIdentifier,
        prevCardOrderIds: UniqueIdentifier[],
        nextColumnId: UniqueIdentifier,
        nextCardOrederIds: UniqueIdentifier[],
    }, { rejectWithValue }) => {
        const { currentCardId, prevColumnId, prevCardOrderIds, nextColumnId, nextCardOrederIds } = updateData
        const result = await moveCardToDifferentColumnAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrederIds
        })

        if (result.updateResult === 'move card successfully') {
            return updateData
        } else {
            return rejectWithValue('Failed to move card');
        }
    })

export const updateColumn = createAsyncThunk("columns/updateColumn",
    async (updateData: { dndOrderedCard: Card[], dndOrderedCardIds: UniqueIdentifier[], columnId: UniqueIdentifier }) => {
        const { dndOrderedCard, dndOrderedCardIds, columnId } = updateData
        const updatedColumn = await updateColumnDetailsAPI(columnId, { cards: dndOrderedCard, cardOrderIds: dndOrderedCardIds })
        return updatedColumn
    })

export const createNewColumn = createAsyncThunk("columns/createColumn",
    async (newColumnData: { boardId: UniqueIdentifier, title: string }) => {
        const newColumn = await createNewColumnAPI(newColumnData)
        return newColumn
    })

export const createNewCard = createAsyncThunk("columns/createCard",
    async (newCardData: { boardId: UniqueIdentifier, columnId: UniqueIdentifier, title: string }) => {
        const newCard = await createNewCardAPI(newCardData)
        return newCard
    })

export default boardSlice.reducer