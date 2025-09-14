import { createContext, useContext, useReducer, type ReactNode } from "react";

// نوع المستخدم
type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
} | null;

// نوع الـ state
type State = {
  user: User;
  isAuthenticated: boolean;
};

// الـ actions الممكنة
type Action =
  | { type: "login"; payload: NonNullable<User> }
  | { type: "logout" };

// initial state
const initialState: State = {
  user: null,
  isAuthenticated: false,
};

// reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

// fake user
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// نوع الـ context
type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// provider
function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
