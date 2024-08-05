import axios from 'axios'
import { API_ROOT } from '@/utils/constants'
import { Board } from '@/types/BoardProp'
import { UniqueIdentifier } from '@dnd-kit/core'

export const fetchBoardDetailsAPI = async (boardId: UniqueIdentifier): Promise<Board> => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
}

export const createNewColumnAPI = async (newColumn: { boardId: UniqueIdentifier, title: string }) => {
    const response = await axios.post(`${API_ROOT}/v1/columns`, newColumn)
    return response.data
}

export const createNewCardAPI = async (newCard: { boardId: UniqueIdentifier, columnId: UniqueIdentifier, title: string }) => {
    const response = await axios.post(`${API_ROOT}/v1/cards`, newCard)
    return response.data
}