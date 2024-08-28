import { useEffect, useState } from "react";
import * as style from "./Styled";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface Props {
	link: string;
	callback: () => void;
	updateNewBoard: (newBoard: { title: string; backgroundImageLink: string }) => void;
}

const TitleCardComponent = (props: Props) => {
	const { link, callback, updateNewBoard } = props;
	const [title, setTitle] = useState("");

	useEffect(() => {
		updateNewBoard({
			title: title,
			backgroundImageLink: link,
		});
	}, [updateNewBoard, title, link]);

	return (
		<style.TitleCard>
			<style.Panel $link={props.link}>
				<style.PanelWrapper>
					<style.TitleInput placeholder="Add board title" value={title} onChange={(e) => setTitle(e.target.value)} />
					<style.CloseButton>
						<CloseOutlinedIcon
							sx={{
								fontSize: "1rem",
							}}
							onClick={() => callback()}
						/>
					</style.CloseButton>
				</style.PanelWrapper>
			</style.Panel>
		</style.TitleCard>
	);
};

export default TitleCardComponent;
