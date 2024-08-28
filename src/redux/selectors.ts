import mapOrder from "@/utils/sorts";
import { generatePlaceholderCard } from "@/utils/placeholderCard";
import { RootState } from "./store";
import { cloneDeep, isEmpty } from "lodash";
import { createSelector } from "@reduxjs/toolkit";

export const boardsSelector = (state: RootState) => state.boards

const selectBoard = (state: RootState) => state.board

export const boardSelector = createSelector(selectBoard, (boardState) => {
    const { board } = cloneDeep(boardState)
    board.columns = mapOrder(board.columns, board.columnOrderIds, "_id")
    board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column) as any]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
            column.cards = mapOrder(column.cards, column.cardOrderIds, "_id")
        }
    })

    return board
})



