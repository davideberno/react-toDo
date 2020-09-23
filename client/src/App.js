import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ToDoPage from "./components/ToDoPage";

import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      async function fetchUser() {
        const res = await axios.get("/auth/loggedin");
        const user = res.data.user;
        if (user) {
          setUser(user);
        }
      }
      fetchUser();
    }
  });
  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            user ? <ToDoPage {...props} user={user} /> : <Homepage />
          }
        />
        <Route
          path="/signin"
          render={(props) => <Signin {...props} setUser={setUser} />}
        />
        <Route
          path="/signup"
          render={(props) => <Signup {...props} setUser={setUser} />}
        />
      </Switch>
    </>
  );
}
