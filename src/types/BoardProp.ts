import { UniqueIdentifier } from "@dnd-kit/core";
import { SvgIconProps } from "@mui/material";

type BoardProp = {
    board: Board;
};

export type Board = {
    _id: UniqueIdentifier,
    title: string,
    description: string,
    types: TypeProp[],
    ownerIds: string[],
    memberIds: string[],
    columnOrderIds: string[],
    columns: Column[]
}

type TypeProp = {
    _id: UniqueIdentifier,
    title: string,
    icon: React.ComponentType<SvgIconProps> | React.FunctionComponent<React.SVGAttributes<SVGElement>>, //??
    description: string,
    disabled?: boolean
}

export type Column = {
    _id: UniqueIdentifier,
    boardId: string,
    title: string,
    cardOrderIds: UniqueIdentifier[],
    cards: Card[] 
}

export type Card = {
    _id: UniqueIdentifier,
    boardId: string,
    columnId: string,
    title: string,
    description: string,
    cover: string,
    memberIds: string[],
    comments: string[],
    attachments: string[]
}

export default BoardProp