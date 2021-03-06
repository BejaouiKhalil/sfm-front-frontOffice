import React, { Component } from 'react';

import Profilecard from '../components/profile/profilecard';
import Newfriend from '../components/users/suggestlist';
import UserList from '../components/users/userlist';
import Chatwindow from '../components/chatwindow/chatwindow';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentuser: window.localStorage.getItem('userid'),
            isnotify: 'dn',
            alertmessage: ''
        };



    }
    render() {
        return (
                <div className="main-landing row content">
                    {
                        (() => {
                            if (this.state.currentuser) {
                                    return (
                                                <div className="landing-page">
                                                    <div className="col-md-3 col-sm-6 proilecard">
                                                        <Profilecard/>
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading">
                                                            </div>
                                                            <UserList/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className={` ${this.state.isnotify} `}>
                                                            <strong>{this.state.alertmessage}</strong>
                                                        </div>
                                                    </div>



                                                    <div className="col-md-3 col-sm-6 proilecard">

                                                        <Newfriend/>
                                                    </div>
                                                    <Chatwindow/>
                                                </div>
                                            );
                    }else{
                                            return (
                                                        <div className="col-md-12 col-sm-12">
                                                        </div>
                                                    );
                    }

                    })()
                    }

                </div>


                    );
    }
}

export default MainPage;
