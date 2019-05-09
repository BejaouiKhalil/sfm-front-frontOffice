import React, { Component } from 'react';
import axios from 'axios';
import quizdetails from './quizdetails';
import { Link } from "react-router-dom";


class quizs extends Component {
    
    constructor(props){
      super(props);
      this.state= {quizs : [] , matieres:  [] ,levels : ['beginner','intermediate','advanced'] };
     this.onClick1=this.onClick1.bind(this);
     this.onClick2=this.onClick2.bind(this);
     this.onClick3=this.onClick3.bind(this);

    }
    componentDidMount() {
      fetch('/quiz/').then(res =>{ return res.json();})
      .then(quizs => {this.setState({ 
        quizs  }); });
      fetch('/matieres/').then(res =>{ return res.json();})
        .then(matieres => {this.setState({ 
          matieres  }); });
    }
    renderProducts() {
      return this.state.quizs.map(quiz => {
          return (
            <div > <Link to={"/quizs/" + quiz._id}>
              <h2>{quiz.titre}</h2>  </Link>
              <p>-{quiz.matiere}-{quiz.description}</p>
                   <hr />  </div>
       );  })
    }

    onClick1(matiere) {
      fetch(`http://localhost:4000/subject/` , {
        method: 'POST',
        headers:{ 
            'Content-Type': 'application/json'
           },
        body: JSON.stringify({ matiere : matiere })
              }).then(res =>{ return res.json();})
              .then(quizs => {this.setState({ 
                quizs  }); });
    }

    onClick2(event) {
      var l=event.target.value;
      fetch(`http://localhost:4000/level/` , {
        method: 'POST',
        headers:{ 
            'Content-Type': 'application/json'
           },
        body: JSON.stringify({ type : l })
              }).then(res =>{ return res.json();})
              .then(quizs => {this.setState({ 
                quizs  }); });
   
    }
    onClick3() {
    this.componentDidMount()
    }

  

    renderLevel(){
      
      return( <select onChange={this.onClick2} className="select">
     { this.state.levels.map(l => {
          return (
    <option class="list-group-item " >{l}</option>
          )})} </select>
          )  
    }
    renderSubjects() {
      return( <ul class="list-group">
     
     { this.state.matieres.map(matiere => {
          return (
    <li class="list-group-item " onClick={this.onClick1.bind(this.onClick1,matiere)} >{matiere}</li>
          )})} </ul>
          )    }

    render() { 
    return (
    
   <div className="container">
      <br />
    <div className="row">  
    <div className="col-md-3">  

    <button style={{width: '100%'}} className="btn btn-info" onClick={this.onClick3}> All quizzes </button>
    <br/>
    <br/>
   
     {this.renderSubjects()}
    
    </div>
    <div className="col-md-9">
    <div className="row">
    <div className="col-md-9">
     {this.renderProducts() }
    </div>
    <div className="col-md-3">  {this.renderLevel() }    </div>
    </div>
    </div>
    </div>
    </div>
      
  );  
    }
}

export default quizs;
