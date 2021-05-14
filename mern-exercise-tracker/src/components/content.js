import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { UserContext } from "../App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./navbar.component";
import ExercisesList from "./exercises-list.component";
import EditExercise from "./edit-exercises.component";
import CreateExercise from "./create-exercise.component";
import CreateUser from "./create-user.component";

const Content = () => {
  const [user] = useContext(UserContext);
  if (!user.accesstoken) {
    return <Redirect from="" to="login" noThrow />;
  }
  return (
    <Router>
      <div className="exertracker">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
};

export default Content;
