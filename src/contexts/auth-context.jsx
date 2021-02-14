import { createContext } from "react";

const noop = () => {};

const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthentcated: false,
});

export default AuthContext;
