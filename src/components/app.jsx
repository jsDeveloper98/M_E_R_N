import React from "react";
import "../styles/app.scss";
import useRoutes from "../routes";
import { BrowserRouter as Router } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import AuthContext from "../contexts/auth-context";

const App = () => {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        <div className="container-wrapper">
          <div className="container">{routes}</div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
