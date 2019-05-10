import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class history extends Component{
   
      componentWillMount() {
          ///user id has to be dynamic !! 5cd34f21d2c60850a8636411
        axios.get(`http://localhost:4000/history/${this.props.match.params.id}`)
          .then(response => this.setState({ attempts: response.data }));
      }
    
      constructor(props) {
        super(props);
        this.state = { attempts : []   };
      }
    renderAttempts() {
       return (
  <div className="container">
  <br />
  <br />
  Hello Learner , 
  <table className="table-hover table">
  <thead>
    <tr>
      <th >Quiz</th>
      <th>Subject</th>
      <th>Level</th>
      <th>Result</th>
      <th>Attempts</th>

    </tr>
  </thead>
  <tbody>
 { this.state.attempts.map(attempt => {      
    
    return(
      <tr>
      <td >{attempt.quiz.titre}</td>
      <td>{attempt.quiz.matiere}</td>
      <td>{attempt.quiz.type}</td>
      {attempt.score > attempt.quiz.score/2 ? (
      <td>Passed</td>
      ):(
        <td>Failed</td>
      )}
      <td>{attempt.attemptnum}</td>
    </tr>  
   ) } )}
  </tbody>
</table>
</div>
  ) }
  
      render() {
        if (!this.state.attempts) {
          return null;
        }
    return (
      <div>
      {this.renderAttempts()}   
      </div>  )
             }
            }