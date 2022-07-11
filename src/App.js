import { AuthContext, authReducer, authState } from "./AuthContext";
import { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddWA from "./pages/AddWA";
import NotFound from "./pages/NotFound";
import SendM from "./pages/SendM";
import Campaigns from "./pages/Campaigns";


export default function App() {
  const [state, dispatch] = useReducer(authReducer, authState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
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
            path="/dlvrpt"
            element={state.isAuth ? <Campaigns /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
