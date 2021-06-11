import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  withRouter,
} from "react-router-dom";
import axios from "axios";

import AdminContext from "./AdminContext";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App(props) {
  const [isAuthed, setAuthed] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const { state } = useLocation();
  useEffect(() => {
    const checkAuth = () => {
      axios
        .get("/auth/verify/")
        .then((res) => {
          setAuthed(true);
          setAdmin(res.data.role === "admin" ? true : false);
        })
        .catch((err) => console.log(err));
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthed === true) {
      return <Redirect to={state?.from || "/"} />;
    }
  }, [isAuthed]);

  useEffect(() => {
    if (isAdmin === true) {
      return <Redirect to={state?.from || "/"} />;
    }
  }, [isAdmin]);

  return (
    <AdminContext.Provider value={isAdmin}>
      <div className="App">
        <Switch>
          <Route path="/register">
            <RegisterPage setAuthed={setAuthed} />
          </Route>
          {/* <PrivateRoute isAuthed={isAuthed} path="" /> */}
          <PrivateRoute
            authed={isAuthed}
            path="/dashboard"
            redirect="/login"
            component={Dashboard}
            setAuthed={setAuthed}
          />
          <PrivateRoute
            authed={!isAuthed}
            path={`/login`}
            redirect="/dashboard"
            component={Login}
            setAuthed={setAuthed}
          />
          {/* <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setAuthed={setAuthed} />}
          /> */}
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </AdminContext.Provider>
  );
}

export default withRouter(App);
