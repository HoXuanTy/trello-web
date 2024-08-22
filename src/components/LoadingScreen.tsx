import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

export default function LoadingScreen() {
	const [open] = useState(true);
	return (
		<div>
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<Box
					component="img"
					sx={{ width: "10vw" }}
					src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif"
					alt="Loading icon"
				/>
			</Backdrop>
		</div>
	);
}
