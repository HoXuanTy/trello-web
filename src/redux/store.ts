import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './slices/boardsSlice'
import boardReducer from './slices/boardSlice'

const store = configureStore({
    reducer: {
        boards: boardsReducer,
        board: boardReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch
