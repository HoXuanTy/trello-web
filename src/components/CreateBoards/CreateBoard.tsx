import Modal from "@mui/material/Modal";
import * as style from "./Styled";
import { useState } from "react";
import TitleCardComponent from "./TitleCardComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { boardsSelector } from "@/redux/selectors";
import PhotoCardComponent from "./PhotoCardComponent";
import LoadingScreen from "../LoadingScreen";
import { createNewBoard } from "@/redux/slices/boardsSlice";

interface Props {
	callback: () => void;
}

interface NewBoard {
	title: string;
	backgroundImageLink: string;
}

export default function CreateBoard(props: Props) {
	const dispatch = useAppDispatch();
	const { backgroundImages, smallPostfix, creating } = useAppSelector(boardsSelector);
	const [open, setOpen] = useState(true);

	const [background, setBackground] = useState(backgroundImages[0] + smallPostfix);

	let newBoard = {
		title: "",
		backgroundImageLink: "",
	};

	const handleCreateNewBoard = () => {
		dispatch(createNewBoard(newBoard));
		props.callback();
		setBackground(backgroundImages[0] + smallPostfix);
	};

	const handleSelect = (link: string) => {
		setBackground(link);
	};

	const handleClose = () => {
		setOpen(false);
		props.callback();
	};

	const updateNewBoard = (updatedBoard: NewBoard) => {
		newBoard = { ...updatedBoard };
	};

	return (
		<div style={{ position: "relative" }}>
			{creating && <LoadingScreen />}
			<Modal open={open} onClose={handleClose} disableEnforceFocus>
				<style.Container>
					<style.Wrapper>
						<TitleCardComponent link={background} updateNewBoard={updateNewBoard} callback={handleClose} />
						<style.PhotosCard>
							{backgroundImages.map((link, index) => {
								return (
									<PhotoCardComponent
										key={index}
										selectedLink={background}
										link={link + smallPostfix}
										callback={handleSelect}
									/>
								);
							})}
						</style.PhotosCard>
					</style.Wrapper>
					<style.CreateButton onClick={() => handleCreateNewBoard()}>Create Board</style.CreateButton>
				</style.Container>
			</Modal>
		</div>
	);
}
