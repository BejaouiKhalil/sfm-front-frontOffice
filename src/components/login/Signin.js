import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import 'whatwg-fetch';
import * as PubSub from "pubsub-js";

class Signin extends Component {

  constructor(props) {
    super (props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
     loginpass: '',
      loginError: '',
      signupError: ''
    };

    this.handleSignIn = this.handleSignIn.bind (this);
  }

  handleSignIn() {

    if (this.state.username !== '' && this.state.loginpass !== '') {
       this.callSignInApi (this.state);

    } else {
      alert ("Please Enter Login Information ");

    }
  }

  callSignInApi(data) {

    fetch ('http://localhost:4000/user/singin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify (data)
    }
    ).then (res => res.json ()).then (json => {
      this.serviceSignInHandler (json)

    });


  }

  serviceSignInHandler(data) {

    if (data.status === 'success') {
        console.log(data);
        this.props.history.push ("/main");

        PubSub.publish ('IS_LOGIN', {status: true, token: data.accesstoken, userid: data.userid,callback:()=>{
          console.log("succes");
      }});

    } else {
      alert (data.message);
    }

  }

  render() {
    return (
      <div>
     <fieldset>
          <div className="fields input-wrapper">
            <input placeholder="Email address" type="text" onChange={(event) => {
              this.setState ({username: event.target.value})}} className="login-form-email-input" tabIndex={1} />
            <p className="error-message" />
          </div>
        </fieldset>
        <fieldset>
          <div className="fields input-wrapper">
            <input placeholder="Password" type="password" onChange={(event) => {
              this.setState ({loginpass: event.target.value})}}
                   className="login-form-password-input" tabIndex={2} />
            <p className="error-message" />
          </div>
        </fieldset>
        <fieldset className="last">
          {/* tab index and size set in signup-form.js afterRender */}
          {/* g-recaptcha starts hidden then is displayed if login fails */}
          <div className="g-recaptcha hidden js-grecaptcha-login-form" />
        </fieldset>
        <div className="forgot-password">
          <a className="secondary small" target="_blank" href="/reset-password">Forgot password?</a>
        </div>
        <input onClick={this.handleSignIn}  type="submit" className="button large full-width btn-login-submit" tabIndex={4} defaultValue />
        <div className="fields remember-me">
          <input type="checkbox" name="LoginForm[rememberMe]" className="login-form-remember-me" id="login-form-remember-me" tabIndex={5} />
          <label htmlFor="login-form-remember-me">Keep me signed in until I sign out</label>
          <p className="switch">Need an account? <a href="javascript:void(0)" onClick={()=>this.props.statechange('signin')}> SIGN UP</a>
          </p>
        </div>
        </div>


              );
      }
      ;
    }

    export default withRouter(Signin) ;



