import { createContext, useReducer, useEffect } from 'react';
import apiClient from '@api/apiClient'

export const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthLoaded: false,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { 
                user: action.payload, 
                isAuthLoaded: true };
        case 'LOGOUT':
            return { 
                user: null, 
                isAuthLoaded: true };
        case "AUTH_LOADED":
            return { 
                ...state, 
                isAuthLoaded: true };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await apiClient.get("/user/verify-session");
          dispatch({ type: "LOGIN", payload: response.data });
          console.log(response.data, "auth.context")
        } catch {
          dispatch({ type: "AUTH_LOADED" });
        }
      };
  
      fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
