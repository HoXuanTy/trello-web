import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI } from "@/apis"
import { Board, Card, Column } from "@/types/BoardProp"
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
        slug: ''
    },
    status: 'idle'
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBoard.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(fetchBoard.fulfilled, (state, action: PayloadAction<Board>) => {
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
    },
})

export const fetchBoard = createAsyncThunk("board/fetchBoard",
    async (boardId: UniqueIdentifier) => {
        const board = await fetchBoardDetailsAPI(boardId)
        return board
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