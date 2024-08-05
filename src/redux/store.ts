import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './slices/boardSlice'
const store = configureStore({
    reducer: {
        board: boardReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch