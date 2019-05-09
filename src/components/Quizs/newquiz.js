import React, { Component } from 'react';
import {
	withRouter
} from 'react-router-dom';

class newquiz extends Component {

    constructor(props) {
        super(props);
        this.state = { matieres:  [], timer: false};
        this.onSubmit=this.handleSubmit.bind(this);
        this.onClick2=this.onClick2.bind(this);

    }
    onClick2(event) {
      var l=event.target.value;
    if(l==="true") {
 this.setState({timer : true});
    }
    if(l==="false"){
      this.setState({timer : false});
    }
    }

    componentDidMount() {
          fetch('/matieres/').then(res =>{ return res.json();})
          .then(matieres => {this.setState({ 
            matieres  }); });
      }
    
    async handleSubmit(e) {
      
    e.preventDefault();
   if(this.state.timer) {
    let titre= document.getElementById('titre').value;
    let description= document.getElementById('description').value;
    let matiere= document.getElementById('matiere').value;
    let type= document.getElementById('type').value;
    let duration= document.getElementById('time').value;
    //user id needs to be dynamic !!  dn't forget 
    let response= await fetch(`http://localhost:4000/quiz/5cd34f4dd2c60850a8636412` , {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
       },
    body: JSON.stringify({ titre, description,matiere, type,duration  })
          }).then(response => response.json())
         .then(res=> this.props.history.push(`/quest/${res}`) ); 
        
   }
   else{
    let titre= document.getElementById('titre').value;
    let description= document.getElementById('description').value;
    let matiere= document.getElementById('matiere').value;
    let type= document.getElementById('type').value;
    
    //user id needs to be dynamic !!  dn't forget 
    let response= await fetch(`http://localhost:4000/quiz/5cd34f4dd2c60850a8636412` , {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
       },
    body: JSON.stringify({ titre, description,matiere, type  })
          }).then(response => response.json())
         .then(res=> this.props.history.push(`/quest/${res}`) ); 
        
   }
    
        }
    
    render() {
        return (
          <div className="container">
        <div className="col-md-8">
          <br /> 
          <form className="form-group" onSubmit={this.onSubmit}>
          <h1>Add new quizz</h1>
          <div>
         
          <label > Title : </label>
          <input className="form-control" id='titre'/>
        <label> Description : </label>
          <textarea className="form-control" id='description'
          />
                  <label> Subject : </label>
         <input className="form-control" type="text" id="matiere" list="subjects" />
           <datalist id="subjects">
           {this.state.matieres.map(matiere => 
            <option>{matiere}</option>)
                }     </datalist>
         
          <label>Type : </label> 
          <select className="form-control" id='type'>
          <option value='beginner'>Beginner</option>
          <option value='intermediate'>Intermediate</option>       
          <option value='advanced'>Advanced</option>       
          </select>
          
     <label>Timer :</label>  <select className="form-control" id='timer' onChange={this.onClick2} >
          <option value="true">With</option>
          <option selected="selected" value="false">Without</option> 
               </select> 
               { this.state.timer ? (<>
               <label>Duration(minutes) : </label> 
                <input type="number"  className="form-control"  id="time"></input> 
       </>):(<></>)
               }
          <br/>
          <br/>
          <button className="btn btn-primary" type="submit" >Save</button>
      </div>
              </form>   
          </div>
          </div>
       );}}

export default withRouter(newquiz) ;
