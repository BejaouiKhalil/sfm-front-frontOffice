import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class historyC extends Component{
   
      componentWillMount() {
          ///user id has to be dynamic !! 5cd34f4dd2c60850a8636412
        axios.get(`http://localhost:3001/historyC/${this.props.match.params.id}`)
          .then(response => this.setState({ quizs: response.data }));
        }
    
      constructor(props) {
        super(props);
        this.state = { quizs : []   };
        this.onClick=this.onClick.bind(this);

      }
      onClick(matiere) {
        fetch(`http://localhost:4000/delquiz/${matiere}`).then(res =>{ return res.json();});
       this.componentWillMount()  
      }
   
      renderAttempts() {
       return (
  <div className="container">
  <br />
  <br />
  <table className="table-hover table">
  <thead>
    <tr>
      <th >Quiz</th>
      <th>Subject</th>
      <th>Level</th>

    </tr>
  </thead>
  <tbody>
 { this.state.quizs.map(attempt => {      
    return(
    <tr>
      
      <td >{attempt.titre}</td>
      <td>{attempt.matiere}</td>
      <td>{attempt.type}</td>
      <td><button className="btn btn-danger" onClick={this.onClick.bind(this.onClick,attempt._id)} > Delete </button> </td>      
      <td><Link to={"/quest/" + attempt._id}><button className="btn btn-info"> View </button> </Link> </td>  
    </tr>  )
     } ) }
  </tbody>
</table>
</div>
          ) }
 
          render() {
        if (!this.state.quizs) {
          return null;
        }
    return (
      <div className="container">      
      <br/  >
      Hello , Coach  
      {this.renderAttempts()}   
      </div>  )
             }
            }