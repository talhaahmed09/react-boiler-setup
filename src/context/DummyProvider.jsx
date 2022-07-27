import { createContext, useContext, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { loginApi } from "../../services/auth_service";
import authReducer, { initialState } from "./AuthReducer";

const DummyContext = createContext({});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const navigate = useNavigate();

  const values = useMemo(
    () => ({
      state: state,
    }),
    [state]
  );
  return (
    <DummyContext.Provider value={values}>{children}</DummyContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(DummyContext);

  if (context === undefined) {
    throw new Error("No context available");
  }
  return context;
};
