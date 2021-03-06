import { AuthContext, authReducer, authState } from "./AuthContext";
import { useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddWA from "./pages/AddWA";
import NotFound from "./pages/NotFound";
import SendM from "./pages/SendM";
import Campaigns from "./pages/Campaigns";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Alert from "./components/Alert";

export default function App() {
  const [alerts, setAlerts] = useState([]);
	const [state, dispatch] = useReducer(authReducer, authState);
	return (
		<AuthContext.Provider value={{ state, dispatch, setAlerts }}>
			<Router>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route
						exact
						path="/dashboard"
						element={state.isAuth ? <Dashboard /> : <Navigate to="/login" />}
					/>
					<Route
						exact
						path="/addwa"
						element={state.isAuth ? <AddWA /> : <Navigate to="/login" />}
					/>
					<Route
						exact
						path="/sendm"
						element={state.isAuth ? <SendM /> : <Navigate to="/login" />}
					/>
					<Route
						exact
						path="/cmprpt"
						element={state.isAuth ? <Campaigns /> : <Navigate to="/login" />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
				<Alert list={alerts} setList={setAlerts} />
			</Router>
		</AuthContext.Provider>
	);
}
