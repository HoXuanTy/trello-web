import * as style from "./Styled";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

interface Props {
	link: string;
	selectedLink: string;
	callback: (link: string) => void;
}
const PhotoCardComponent = (props: Props) => {
	const { link, selectedLink, callback } = props;
	return (
		<style.PhotoWrapper $link={link} onClick={() => callback(link)}>
			<style.Photo show={selectedLink === link}>
				<style.DoneIconWrapper show={selectedLink === link}>
					<DoneRoundedIcon fontSize="small" />
				</style.DoneIconWrapper>
			</style.Photo>
		</style.PhotoWrapper>
	);
};

export default PhotoCardComponent;
