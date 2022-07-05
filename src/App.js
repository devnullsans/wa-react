import { AuthContext, authReducer, authState } from "./AuthContext";
import { Suspense, lazy, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const NotFound = lazy(() => import("./components/NotFound"));

export default function App() {
  const [state, dispatch] = useReducer(authReducer, authState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <Suspense fallback="Loading...">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/dashboard"
              element={state.isAuth ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}
