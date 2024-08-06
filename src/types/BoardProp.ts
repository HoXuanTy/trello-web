import { UniqueIdentifier } from "@dnd-kit/core";
import { SvgIconProps } from "@mui/material";

export type BoardProp = {
    board: Board
};

export type Board = {
    _id: UniqueIdentifier
    title: string
    description: string
    columnOrderIds: UniqueIdentifier[]
    columns: Column[]
    slug?: string
}

type Type = {
    _id: UniqueIdentifier
    title: string
    icon: React.ComponentType<SvgIconProps> | React.FunctionComponent<React.SVGAttributes<SVGElement>>,
    description: string
    disabled?: boolean
}

export type Column = {
    _id: UniqueIdentifier
    boardId: UniqueIdentifier
    title: string
    cardOrderIds: UniqueIdentifier[],
    cards: Card[]
}

export type Card = {
    _id: UniqueIdentifier
    boardId: UniqueIdentifier
    columnId: UniqueIdentifier
    title: string
    description: string
    cover: string
    memberIds: string[]
    comments: string[]
    attachments: string[]
    FE_PlaceholderCard?: boolean
}

