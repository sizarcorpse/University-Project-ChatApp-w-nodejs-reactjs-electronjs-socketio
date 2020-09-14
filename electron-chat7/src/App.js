import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthRoute from "./util/AuthRoute";

import jwtDecode from "jwt-decode";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import Chat from "./components/Chat/Chat";

// import NotFound from "./components/NotFound/NotFound";

export const UserContext = createContext([]);

const App = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getRefreshToken() {
      const userCredential = await (
        await fetch("http://localhost:8000/api/user/refreshtoken", {
          method: "POST",
          credentials: "include", // Needed to include the cookie
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        })
      ).json();

      if (userCredential.accesstoken) {
        const { username, email, profilePhoto } = jwtDecode(
          userCredential.accesstoken
        );
        setUser({
          accesstoken: userCredential.accesstoken,
          isAuthenticated: true,
          username: username,
          email: email,
          profilePhoto: profilePhoto,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    getRefreshToken();
    console.log("----------------------------from app");
  }, []);

  if (loading) return <div>Loding...</div>;

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Route path="/" component={Nav} />
        <Switch>
          <AuthRoute
            path="/home"
            exact
            component={Home}
            isAuthenticated={user.isAuthenticated}
          />
          <AuthRoute
            path="/Chat"
            exact
            component={Chat}
            isAuthenticated={user.isAuthenticated}
          />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Signup} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};
export default App;
