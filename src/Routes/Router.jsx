import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "../components/navigation/nav";
import Courses from "../components/Courses/courses";
import DetailCourse from "../components/DetailCourse/DetailCourse";
import MainPage from "../containers/mainpage";
import Login from "../containers/login";
import Profile from "../containers/profile";
import Event from "../components/event/event";
import MyEvents from "../components/event/myEvents";

const Router = () => (
  <>
    <BrowserRouter>
      <Nav />

      <Switch>
        <Route path="/Courses" component={Courses} />
        <Route path="/CourseDetails/:id" component={DetailCourse} />
          <Route path="/" exact component={MainPage} />
          <Route path="/main" component={MainPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/events" component={Event} />
          <Route path="/myevents" component={MyEvents} />

      </Switch>
    </BrowserRouter>
  </>
);

export default Router;
