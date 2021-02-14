import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./components/auth/sign-in";
import SignUp from "./components/auth/sign-up";
import ErrPage from "./components/err-page";
import UserList from "./components/users/user-list";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path={["/", "/users"]} exact={true}>
          <UserList />
        </Route>

        <Route path="/not-found" exact={true}>
          <ErrPage />
        </Route>

        <Redirect to="/not-found" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path={["/", "/signin"]} exact={true}>
        <SignIn />
      </Route>

      <Route path="/signup" exact={true}>
        <SignUp />
      </Route>
    </Switch>
  );
};

export default useRoutes;
