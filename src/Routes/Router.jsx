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
import eventDetails from "../components/event/eventDetails";
import quizs from '../components/Quizs/quizs';
import quizdetails from '../components/Quizs/quizdetails';
import newquiz from '../components/Quizs/newquiz';
import quest from '../components/Quizs/quest';
import history from '../components/Quizs/history';
import historyC from '../components/Quizs/historyC';
import historyA from '../components/Quizs/historyA';
import Games from '../components/Quizs/Games';
import Cards from '../components/Quizs/card/Cards';
import GameContainer from '../components/Quizs/sum/GameContainer';
import Game from '../components/Quizs/minesweeper/Game';

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
          <Route path="/eventDetails/:id" component={eventDetails} />
          <Route path="/quizs" exact component={quizs} />
          <Route path="/quizs/:id" exact component={quizdetails} />
          <Route path="/quiz/new/" exact component={newquiz} />
          <Route path="/quest/:id" exact component={quest} />
          <Route path="/history/:id" exact component={history} /> 
          <Route path="/historyC/:id" exact component={historyC} />
          <Route path="/historyA" exact component={historyA} />
          <Route path="/games" exact component={Games} />          
          <Route path="/games/game1" exact component={Cards} />
          <Route path="/games/game2" exact component={GameContainer} /> 
          <Route path="/games/game3" exact component={Game} /> 
  </Switch>
    </BrowserRouter>
  </>
);

export default Router;
