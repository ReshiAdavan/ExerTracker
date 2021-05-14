import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";

import Navigation from "./components/navigation";
import Content from "./components/content";
import Login from "./components/login";
import Protected from "./components/protected";
import Register from "./components/register";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logOutCallback = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    // Clear users from content
    setUser({});
    // Redirect to startpage
    navigate("/");
  };

  // Get new access token if resfresh token exists
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch("http://localhost:5000/refresh_token", {
          method: "POST",
          credentials: "include", // including cookie
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setUser({
        accesstoken: result.accesstoken,
      });
      setLoading(false);
    }
    checkRefreshToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="container">
        <Navigation logOutCallback={logOutCallback} />
        <Router id="router">
          <Login path="login" />
          {/* <Register path="register" /> */}
          <Protected path="protected" />
          <Content path="/" />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
