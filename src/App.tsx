import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Boards from "./pages/Boards";
import Board from "./pages/Boards/_id";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path="/boards" element={<Boards />} />
					<Route path="/board/:boardId" element={<Board />} />
				</Route>
				<Route path="*" element={<Navigate to="/boards"/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
