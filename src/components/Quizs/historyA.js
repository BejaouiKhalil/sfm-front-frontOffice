import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class historyA extends Component{
   
      componentWillMount() {
         
        axios.get(`http://localhost:4000/demands`)
          .then(response => this.setState({ demands: response.data }));
        }
    
      constructor(props) {
        super(props);
        this.state = { demands : []   };
        this.onClick=this.onClick.bind(this);

      }
      onClick(id) {
       
        let response=  fetch(`http://localhost:4000/daccept/${id}` , {
          method: 'POST',
          headers:{ 
              'Content-Type': 'application/json'
             },
             body: JSON.stringify({})
                });
      }
   
      renderDemands() {
       return (
   <div className="container">
         <br />
         <br />
         <table className="table-hover table">
  <thead>
    <tr>
      <th>Quiz</th>
      <th>Subject</th>
      <th>Added by</th>
      <th>Learner</th>
      <th>State</th> 
      <th></th> </tr>
  </thead>
  <tbody>
 { this.state.demands.map(demand => {      
    return(
    <tr>      
      <td>{demand.quiz.titre}</td>
      <td> {demand.quiz.matiere}</td> 
     <td>{demand.quiz.auteur.firstName}</td>
      <td>{demand.learner.firstName}</td>
      {demand.result ? (
      <td>Approved</td>):(<>        
      <td>Pending</td>
      <td><button className="btn btn-danger" onClick={this.onClick.bind(this.onClick,demand._id)} > Approve Permission </button> </td> 
    </>  )}
          
     
    </tr>  )
     } ) }
  </tbody>
</table>
</div>
          ) }
 
          render() {
        if (!this.state.demands) {
          return null;
        }
    return (
      <div className="container">      
      <br/  >
      Hello , Admin
      {this.renderDemands()}   
      </div>  )
             }
            }