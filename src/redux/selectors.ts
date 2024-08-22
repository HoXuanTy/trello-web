import { generatePlaceholderCard } from "@/utils/placeholderCard";
import { RootState } from "./store";
import { cloneDeep, isEmpty } from "lodash";
import mapOrder from "@/utils/sorts";

export const boardsSelector = (state: RootState) => state.boards

export const boardSelector = (state: RootState) => {
    const { board } = cloneDeep(state.board)
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
}

