import { createContext } from "react";

export const AuthContext = createContext();

export const authState = {
  isAuth: Boolean(localStorage.getItem("auth")),
  // user: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("auth", `Bearer ${action.payload}`);
      return {
        // ...state,
        isAuth: true,
        // user: action.payload.user,
      };
    case "LOGOUT":
      localStorage.removeItem("auth");
      return {
        // ...state,
        isAuth: false,
        // user: null,
      };
    // case "UPDATE":
    //   return {
    //     ...state,
    //     user: action.payload.user
    //   };
    default:
      return state;
  }
};