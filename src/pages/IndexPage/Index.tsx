import { useEffect } from "react";
import { Container, Content, LeftSide, RightSide, LeftWrapper, Title, Text, Button, SvgItem } from "./Styled";

const Index = () => {
	useEffect(() => {
		document.title = "Trello";
	}, []);
	return (
		<>
			<Container>
				<Content>
					<LeftSide>
						<LeftWrapper>
							<Title>Trello helps teams move work forward.</Title>
							<Text>
								Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the
								way your team works is unique—accomplish it all with Trello.
							</Text>
							<Button>Sign up - it's free</Button>
						</LeftWrapper>
					</LeftSide>
					<RightSide>
						<SvgItem src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=720&fm=webp" />
					</RightSide>
				</Content>
			</Container>
		</>
	);
};

export default Index;
