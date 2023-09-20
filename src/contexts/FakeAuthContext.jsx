import { createContext, useContext, useEffect, useReducer, useState } from "react";

const AuthContext = createContext();

const FAKE_USER = {
    name: "Abdelatty",
    email: "abdelatty@example.com",
    password: "admin",
    avatar: "https://i.pravatar.cc/100?u=zz",
};


const initialState = {
    user: null,
    isAuthenticated: false,
    isError: false
}

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true, isError: false };
        case "logout":
            return { ...state, user: null, isAuthenticated: false, isError: false };
        case "error":
            return { ...state, isError: true };
        default:
            throw new Error("Error action");
    }
}


function AuthProvider({ children }) {

    const [{ user, isAuthenticated , isError}, dispatch] = useReducer(reducer, initialState);
    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) dispatch({ type: "login", payload: FAKE_USER })
        else {
            dispatch({ type: "error" });
        }
    }

    function logout() {
        dispatch({ type: "logout"})
    }

    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        login,
        logout,
        isError
    }}>{children}</AuthContext.Provider>
}


function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("Error in Auth");
    return context;
}

export { useAuth, AuthProvider };