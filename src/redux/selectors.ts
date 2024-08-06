import { generatePlaceholderCard } from "@/utils/placeholderCard";
import { RootState } from "./store";
import { cloneDeep, isEmpty } from "lodash";

export const boardSelector = (state: RootState) => {
    const { board } = cloneDeep(state.board)
    board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column) as any]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
    })


    return board
}

