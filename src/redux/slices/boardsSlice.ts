import { createNewBoardAPI, fetchBoardsAPI } from "@/apis";
import { Board } from "@/types/BoardProp";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface boardsState {
    boardsData: Board[]
    pending: boolean
    backgroundImages: string[]
    smallPostfix: string
    creating: boolean
}

const initialState: boardsState = {
    boardsData: [],
    pending: true,
    backgroundImages: [
        "https://images.unsplash.com/photo-1476610182048-b716b8518aae",
        "https://images.unsplash.com/photo-1678906791977-7021926239f3",
        "https://images.unsplash.com/photo-1542640244-7e672d6cef4e",
        "https://images.unsplash.com/photo-1522911715181-6ce196f07c76",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
        "https://images.unsplash.com/photo-1636207543865-acf3ad382295",
        "https://images.unsplash.com/photo-1597244211919-8a52ab2e40ea",
        "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
        "https://images.unsplash.com/photo-1458668383970-8ddd3927deed"
    ],
    smallPostfix:
        "?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjM2NjUzNDgz&ixlib=rb-1.2.1&q=80&w=400",
    creating: false,
}

const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.pending = true
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.boardsData = action.payload
                state.pending = false
            })
            .addCase(createNewBoard.pending, (state) => {
                state.creating = true
            })
            .addCase(createNewBoard.fulfilled, (state, action) => {
                state.boardsData.push(action.payload)
                state.creating = false
            })
    },
})

export const fetchBoards = createAsyncThunk("board/fetchBoards",
    async () => {
        const boards = await fetchBoardsAPI()
        return boards
    })

export const createNewBoard = createAsyncThunk("board/createBoards",
    async (newBoardData: { title: string, backgroundImageLink: string }) => {
        const newBoard = await createNewBoardAPI(newBoardData)
        return newBoard
    })

export default boardsSlice.reducer
