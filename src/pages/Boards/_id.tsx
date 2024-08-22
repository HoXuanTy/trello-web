import Container from "@mui/material/Container";
import BoardBar from "./BoardBar/BoardBar";
import AppHeader from "@/components/AppHeader/AppHeader";
import BoardContent from "./BoardContent/BoardContent";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect } from "react";
import { fetchBoardDetails } from "@/redux/slices/boardSlice";
import { boardSelector } from "@/redux/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";
import { UniqueIdentifier } from "@dnd-kit/core";

function Board() {
	const { boardId } = useParams();
	const dispath = useAppDispatch();
	const board = useAppSelector(boardSelector);

	useEffect(() => {
		dispath(fetchBoardDetails(boardId as UniqueIdentifier));
	}, [fetchBoardDetails, boardId]);

	useEffect(() => {
		document.title = board.title + "| Trello";
	}, [board.title]);

	if (!board) {
		return <LoadingScreen />;
	}

	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{
				height: "100vh",
				overflow: "hidden",
			}}
		>
			<AppHeader />
			<BoardBar board={board} />
			<BoardContent board={board} />
		</Container>
	);
}

export default Board;
