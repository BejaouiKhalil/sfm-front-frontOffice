import React, {Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "../components/navigation/nav";
import Courses from "../components/Courses/courses";
import DetailCourse from "../components/DetailCourse/DetailCourse";
import MainPage from "../containers/mainpage";
import Login from "../containers/login";
import Profile from "../containers/profile";
import PubSub from "pubsub-js";
import {Auth} from "../common/auth";
class Router extends Component{
  constructor(props) {
    super(props);
    this.state = {"isLoggedIn": window.localStorage.getItem('isLoggedIn')};
    this.mySubscriber = this.mySubscriber.bind(this);
    PubSub.subscribe('IS_LOGIN', this.mySubscriber);
    this.auth = new Auth();
    if (this.state.isLoggedIn) {
      this.auth.activeInterval(this.props.history);
    }
    else {
      this.auth.stopInterval();
    }
    console.log("here"+window.localStorage.getItem("userid"));

  }
  mySubscriber(msg, data) {

    if (data.status) {
      window.localStorage.setItem('accessToken', data.token);
      window.localStorage.setItem('userid', data.userid);
      window.localStorage.setItem('isLoggedIn', true);
      this.auth.activeInterval(this.props.history);
    }
    else {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('userid');
      window.localStorage.removeItem('isLoggedIn');
      this.auth.stopInterval();
    }
    this.isLoggedIn(data);
  }
  isLoggedIn(data) {
    var boolFlag = window.localStorage.getItem('isLoggedIn');
    if (data.hasOwnProperty('callback')) {
      data.callback();
    }

    if(!data.status){
      PubSub.publish('IS_LOGOUT');
    }

    this.setState({
      isLoggedIn: (boolFlag !== null && boolFlag !== '') ? JSON.parse(boolFlag) : false
    });

  }
  render() {
    return (

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
            </Switch>
          </BrowserRouter>
        </>);
  }
}


export default Router;
