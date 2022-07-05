import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const NotFound = lazy(() => import("./components/NotFound"));

export default function App() {
	const isAuth = Boolean(localStorage.getItem("auth"));
	return (
		<Router>
			<Suspense fallback="Loading...">
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route
						exact
						path="/dashboard"
						element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</Router>
	);
}
