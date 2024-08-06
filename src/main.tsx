import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "@/redux/store.ts";
import { Provider } from "react-redux";

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
