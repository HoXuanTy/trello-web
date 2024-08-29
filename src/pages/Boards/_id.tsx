import Container from "@mui/material/Container";
import BoardBar from "./BoardBar/BoardBar";
import AppHeader from "@/components/AppHeader/AppHeader";
import BoardContent from "./BoardContent/BoardContent";
import LoadingScreen from "@/components/LoadingScreen";
import styled from "styled-components";
import { useEffect } from "react";
import { fetchBoardDetails } from "@/redux/slices/boardSlice";
import { boardSelector } from "@/redux/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";
import { UniqueIdentifier } from "@dnd-kit/core";

const Wrapper = styled.div<{ $isImage: boolean; $bgImage: string }>`
	${(props) =>
		props.$isImage
			? "background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + props.$bgImage + ");"
			: "background-color: " + props.$bgImage + ";"}
	background-repeat: no-repeat;
	background-position: 50%;
	zoom: 1;
	height: fit-content;
	background-size: cover;
`;

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
			<Wrapper
				$isImage={board.isImage}
				$bgImage={board.isImage ? board.backgroundImageLink.split("?")[0] : board.backgroundImageLink}
			>
				<BoardBar board={board} />
				<BoardContent board={board} />
			</Wrapper>
		</Container>
	);
}

export default Board;
