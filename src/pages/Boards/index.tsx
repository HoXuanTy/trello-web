import Container from "@mui/material/Container";
import AppHeader from "@/components/AppHeader/AppHeader";
import Box from "@mui/material/Box";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { boardsSelector } from "@/redux/selectors";
import { fetchBoards } from "@/redux/slices/boardsSlice";
import { useNavigate } from "react-router-dom";
import CreateBoard from "@/components/CreateBoards/CreateBoard";

const Boards = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const { pending, boardsData } = useAppSelector(boardsSelector);

	useEffect(() => {
		dispatch(fetchBoards());
	}, []);

	useEffect(() => {
		document.title = "Boards | Trello";
	}, []);

	const handleModalClose = () => {
		setOpenModal(false);
	};

	return (
		<>
			{pending && <LoadingScreen />}
			<Container
				disableGutters
				maxWidth={false}
				sx={{
					height: "100vh",
					overflow: "hidden",
				}}
			>
				<AppHeader />
				<Box
					sx={{
						marginTop: "3.1rem",
						width: "100%",
						padding: "1rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexWrap: "wrap",
						alignContent: "flex-start",
						overflowY: "auto",
					}}
				>
					{!pending &&
						!!boardsData.length &&
						boardsData.map((board) => (
							<Box
								key={board._id}
								sx={{
									color: "white",
									padding: "0.6rem",
									margin: "0 0.8rem 1rem 0.8rem",
									width: "200px",
									height: "120px",
									borderRadius: "5px",
									backgroundPosition: "center center",
									backgroundSize: "cover",
									opacity: "88%",
									transition: "opacity 450ms",
									"&:hover": {
										opacity: "100%",
										transition: "opacity 150ms",
										fontWeight: "700",
									},
									cursor: "pointer",
									boxShadow: "rgba(0, 0, 0, 0.3) 0 1px 3px",
									fontSize: "1rem",
									...(board.isImage
										? { backgroundImage: `url(${board.backgroundImageLink})`}
										: { backgroundColor: board.backgroundImageLink }),
								}}
								onClick={() => navigate(`/board/${board._id}`)}
							>
								{board.title}
							</Box>
						))}
					{!pending && (
						<Box
							sx={{
								backgroundColor: "#091E420F",
								fontSize: "1.2rem",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								padding: "0.6rem",
								margin: "0 0.8rem 1rem 0.8rem",
								width: "200px",
								height: "120px",
								borderRadius: "5px",
								boxShadow: "rgba(0, 0, 0, 0.3) 0 1px 3px",
								cursor: "pointer",
								opacity: "85%",
								backgroundPosition: "center center",
								transitionDuration: "85ms",
								transitionProperty: "backgroundColor,borderColor,boxShadow",
								transitionTimingFunction: "ease",
								"&:hover": {
									opacity: "100%",
									backgroundColor: "#091e4224",
								},
							}}
							onClick={() => setOpenModal(true)}
						>
							Create new board
						</Box>
					)}
					{openModal && <CreateBoard callback={handleModalClose} />}
				</Box>
			</Container>
		</>
	);
};

export default Boards;
