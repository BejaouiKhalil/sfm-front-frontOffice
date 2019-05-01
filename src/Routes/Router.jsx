import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "../components/navigation/nav";
import Courses from "../components/Courses/courses";
import DetailCourse from "../components/DetailCourse/DetailCourse";

const Router = () => (
  <>
    <BrowserRouter>
      <Nav />

      <Switch>
        <Route path="/Courses" component={Courses} />
        <Route path="/CourseDetails/:id" component={DetailCourse} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Router;
