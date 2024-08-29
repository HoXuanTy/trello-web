import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.tsx";
import store from "@/redux/store.ts";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Index from "./pages/IndexPage/Index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CssVarsProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<App />
			</Provider>
			<ToastContainer theme="colored" position="bottom-right" />
		</CssVarsProvider>
	</React.StrictMode>
);
