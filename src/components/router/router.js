import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//import Home from '../containers/home';
import Profile from '../containers/profile';

import Login from '../containers/login';
import MainPage from '../containers/mainpage';

import NavMenu from '../components/navigation/nav';
import Notification from '../containers/fcm';

export default class Routing extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="container-full">
					<NavMenu islogin={this.props.islogin} />
				</div>
				<div className="container">
					<Route path="/" exact component={MainPage} />
					<Route path="/main" component={MainPage} />
					<Route path="/login" exact component={Login} />
					<Route path="/fcm" exact component={Notification} />
					<Route path="/profile" exact component={Profile} />
					<Route path="/profile/:id" component={Profile} />
				</div>

			</div>
		);
	}
}
