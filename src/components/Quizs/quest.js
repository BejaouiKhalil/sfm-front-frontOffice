import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
  
class quest extends Component {
      
    constructor(props) {
        super(props);
        this.state = { add:false ,  numChildren: 0,ids :[] ,children : [],x:[], update:false , qstoupdate : {} , restoupdate:[] };
        this.onSubmit=this.handleSubmit.bind(this);
        this.del=this.del.bind(this);
        this.delr=this.delr.bind(this);
        this.add=this.add.bind(this);
        this.update = this.update.bind(this);
        this.onSubmit1=this.onSubmit1.bind(this);
      }     
    componentWillMount() {
        axios
          .get(`http://localhost:4000/quiz/${this.props.match.params.id}`)
          .then(response => this.setState({ quiz: response.data  }));
      }
    add(){
    this.setState({add:true});
      }
    onAddChild= () => {
        this.setState({
          numChildren: this.state.numChildren + 1
        });
      } 
    del(id){
        fetch(`http://localhost:4000/delquest/${id}`+`/`+this.state.quiz._id).then(res =>{ return res.json();});
       this.componentWillMount()  
      }
    delr(id){
        fetch(`http://localhost:4000/delresp/${id}`+`/`+this.state.quiz._id).then(res =>{ return res.json();});
       this.componentWillMount()  
       }
  update(id){
    if (document.getElementById('form1')) {document.getElementById('form1').reset();} 
    fetch(`http://localhost:4000/fquest/${id}`).then(res=>res.json())
          .then(response => this.setState({ qstoupdate: response }));
   fetch(`http://localhost:4000/frep/${id}`).then(res=>res.json())
          .then(response => this.setState({ restoupdate: response}));
          this.setState({update:true});

  }
  async onSubmit1(e) {
    e.preventDefault();
    let type= document.getElementById('qtype1').value;       
    let description= document.getElementById(this.state.qstoupdate._id).value;       
    console.log(description);
    await fetch(`http://localhost:4000/editq/`+this.state.qstoupdate._id , {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
         },
      body: JSON.stringify({ description , type }) });
 
      this.state.restoupdate.map(r=>{   
      this.state.x.push(document.getElementsByName(r._id));
      this.state.ids.push(r._id)  });
   for (var i = 0; i < this.state.ids.length; i++) {

    await fetch(`http://localhost:4000/editr/`+this.state.ids[i]+ `/`+this.state.quiz._id , {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
         },
      body: JSON.stringify({ 
        description : this.state.x[i][0].value,
        etat : this.state.x[i][2].value,
        score : this.state.x[i][1].value
       }) }); 
         }
    this.setState({update:false}); 
    this.setState({x:[]});     
    this.setState({ids:[]});     
    this.componentWillMount() 
     }
  async handleSubmit(e) {
        e.preventDefault();         
        let description= document.getElementById('quest').value;  
        let type= document.getElementById('qtype').value;       
        //user id needs to be dynamic !!  dn't forget 
        let resJ= await fetch(`http://localhost:4000/quest/`+this.state.quiz._id , {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
           },
        body: JSON.stringify({ description , type })
              }).then(response => response.json());
           console.log(resJ);

      for (var i = 0; i < this.state.numChildren; i += 1) {
        this.state.x.push(document.getElementsByName(i));  };
        for (var i = 0; i < this.state.x.length; i += 1) {  
      await fetch(`http://localhost:4000/rep/`+resJ, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
           },
        body: JSON.stringify({ 
            description : this.state.x[i][0].value,
            etat : this.state.x[i][2].value,
            score : this.state.x[i][1].value
         })});}
         this.setState({x : []});
         this.setState({add : false});
         this.componentWillMount()
  
       }
    
    render() {
      if (!this.state.quiz) { return null; } 
     
      this.state.children=[];
      for (var i = 0; i < this.state.numChildren; i += 1) {
      this.state.children.push(<ChildComponent key={i} number={i} />); };
  
        return (
       <div className="container">
       <div className="row">
       <div className="col-md-4">
       <br />
        <h2 >{this.state.quiz.titre}</h2>  
        <p >{this.state.quiz.description}</p>          
        <p >Score : {this.state.quiz.score}  <br />
        <i className="fa fa-plus-square " onClick={this.add} ></i> Add question</p>
     <hr />   
        <div>
         {this.state.quiz.questions.length > 0 ? (
           <div>
          {this.state.quiz.questions.map(review => (
            <>
            <div className="row">
           <div className="col-md-10"><h4 style={{color: 'darkblue'}}>{review.description}</h4> </div>
           <div className="col-md-1"><button onClick={this.del.bind(this.del,review._id)} className="btnn"><i className="fa fa-close"></i> </button></div>
           <div className="col-md-1"><button onClick={this.update.bind(this.update,review._id)} className="btnn"><i className="fa fa-edit"></i> </button></div>
            </div>  
            {review.reponses.map(r => (
              <>
            <div className="row">
            <div className="col-md-10">
              <h5>{r.description} </h5></div>
              <div className="col-md-2">
              <button onClick={this.delr.bind(this.delr,r._id)} className="btnn"><i className="fa fa-close">  </i> </button>
             </div> </div></>))}
              <hr /> </>))} </div>
         ) : ( <h4>No questions yet ! </h4>  )}</div> </div>
       <div className="col-md-8">
       <br /> <br />
       {this.state.add ?  ( <div >       
        <form id="form" className="form-group" onSubmit={this.onSubmit}>
        <div className ="row">
        <div className="col-md-10">  
        <div className ="row">
        <div className="col-md-8"> 
        Question : 
          <textarea className="form-control" id='quest'/>
         </div>
         <div className="col-md-4"> 
         Type : 
          <select className="form-control" id='qtype'> 
           <option>select</option>
           <option> radio</option>
           <option>checkbox</option>
          </select></div>
         </div>
         </div>
        <div className="col-md-2"> 
        <br/><i className="fa fa-plus-square fa-4x" onClick={this.onAddChild}></i>
         </div>
        <div></div>
        </div>
       <div className="row" id="children-pane">
         {this.state.children }
         </div>
          <button className="btn btn-primary "type="submit" >Add Q</button>
        </form>       
      </ div> ): ( <> { this.state.update ? ( <> 
   
   <form id="form1" className="form-group" onSubmit={this.onSubmit1} >
<div className="row">
<div className="col-md-8">
<textarea className="form-control" id={this.state.qstoupdate._id} placeholder={this.state.qstoupdate.description} />   
</div>
<div className="col-md-4">
      Type : 
          <select className="form-control" id='qtype1'> 
          {this.state.qstoupdate.type === "radio" ? (<>
            <option>select</option>
           <option selected="selected"> radio</option>
           <option>checkbox</option>
          </>):(<>
          {this.state.qstoupdate.type === "select" ? (<>
            <option selected="selected">select</option>
           <option > radio</option>
           <option>checkbox</option>
          </>):(<>
            <option >select</option>
           <option > radio</option>
           <option selected="selected">checkbox</option>
          </>)}
          </>)}
           
          </select>
 </div>
</div> 
< br/>
    <div className="row">
        {this.state.restoupdate.map(r=>( <> 
    <div className="col-md-4" >
      Description : <textarea name={r._id} defaultValue={r.description} className="form-control"   />
      Score :<input name={r._id} type="number" defaultValue={r.score} className="form-control" /> 
      State : <select name={r._id} className="form-control">
      {r.etat ? (<>  <option selected="selected" value='true'>Correct</option>
          <option value='false'>Wrong</option></>)
          :( <> <option value='true'>Correct</option>
          <option selected="selected" value='false'>Wrong</option></>)} 
        </select>
        
        </div></>  ))}    
        </div>
        <br/>
        <button className="btn btn-success" type="submit" >Edit</button>
   </form>   </>) :(<></>) }</>) }</div> </div></div>
      )}}

const ChildComponent = props => <div className="col-md-4" >
   Description : <textarea name={props.number} className="form-control"   />
    Score :<input type="number" className="form-control" name={props.number}/> 
    State : <select name={props.number} className="form-control"><option value='true'>Correct</option>
          <option value='false'>Wrong</option></select>
                      </div>


export default quest;