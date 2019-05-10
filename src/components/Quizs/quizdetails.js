import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	withRouter
} from 'react-router-dom';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';


class quizdetails extends Component{
   
      constructor(props) {
        super(props);
        this.state = { score : [] ,count:0, time:false, buttonclicked : false , passed : false };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit=this.handleSubmit.bind(this);
        this.onClick=this.onClick.bind(this);
        this.demand=this.demand.bind(this);

      }
      componentWillMount() {
        axios.get(`http://localhost:4000/quiz/${this.props.match.params.id}`)
          .then(response => this.setState({ product: response.data ,count:response.data.duration *60}));
        axios.get(`http://localhost:4000/search/5cd34f21d2c60850a8636411/${this.props.match.params.id}`)
         .then(response => this.setState({ passed: response.data }));
         axios.get(`http://localhost:4000/quizd/${this.props.match.params.id}`)
         .then(response => this.setState({ time : response.data }));

      }
  
      demand(e){
        e.preventDefault();
        let response=  fetch(`http://localhost:4000/demand/5cd34f21d2c60850a8636411/${this.state.product._id}` , {
          method: 'POST',
          headers:{ 
              'Content-Type': 'application/json'
             },
             body: JSON.stringify({})
                }).then(res=>toaster.notify('Demand sent with success', {
                  position: 'top-right', // top-left, top, top-right, bottom-left, bottom, bottom-right
                  duration: null // This notification will not automatically close
                }))
                .then(res=> this.props.history.push(`/quizs/`) );
      }
      handleInputChange(event) {
        const target = event.target;
        const value = (target.checked) ? target.value : -target.value;
        this.state.score.push(value);
        console.log(this.state.score);
      }            
    
      async handleSubmit(e) {

        e.preventDefault();
     var somme= 0 ;
     var x =[];
        x=document.getElementsByName("response");
        for (let index = 0; index < x.length; index++) {
           if (x[index].checked){
            this.state.score.push(x[index].value);}
         }
         var y =[];
         y=document.getElementsByTagName("select");
         for (let index = 0; index < y.length; index++) {
          this.state.score.push(x[index].value);}
    for (let index = 0; index < this.state.score.length; index++) {
            var sc =parseFloat( this.state.score[index]); 
             somme = somme+ parseFloat(sc);
                console.log(sc); }

       //user id needs to be dynamic !!  dn't forget 
       let response= await fetch(`http://localhost:4000/quizAttempt/5cd34f21d2c60850a8636411/${this.state.product._id}` , {
        method: 'POST',
        headers:{ 
            'Content-Type': 'application/json'
           },
        body: JSON.stringify({ score : somme })
              }).then(response => response.json()).then(res => this.setState({ result : res }));
              console.log(this.state.result);
      this.setState({buttonclicked : true });  }
      
      onClick(e) {
        e.preventDefault();
        let response=  fetch(`http://localhost:4000/demand/5cd34f21d2c60850a8636411/${this.state.product._id}` , {
          method: 'POST',
          headers:{ 
              'Content-Type': 'application/json'
             },
             body: JSON.stringify({})
                }).then(this.setState({ buttonclicked : false}));
        
      }
     
      render(){
        if (!this.state.product) {
          return null;
        }
     let s = this.state.product.score; 
        return (
          <div className="container">
          <br />
        
         <div className="col-md-8">
            { this.state.buttonclicked? (
            <div >
            { this.state.result === "false" ?( <>
            <h2>You Should pass the intermediate / beginner test at first  </h2>
            <form  className="form-group" onSubmit={this.onSubmit}>
                  <h1 >{this.state.product.titre}</h1>          
                   {this.state.product.matiere} 
                    <div >
                      {this.state.product.questions.map(review => (
                        <>
                          <h3>{review.description}</h3>
                        {review.reponses.map(r => (
                          <>
                            
                          <input  onChange={this.handleInputChange} type="checkbox" name ={r.description} value={r.score}/>{"  "+r.description} <br />
                          </>
                      ))}
                          <hr />
                        </>   ))}
                       <button disabled="true" className="btn btn-success" type="submit" >Save </button>
                     
                    </div>
            </form>         
                                                  </>
            ) 
                   :( <> { this.state.result < s/2 ?(<> <h1>Sorry , you failed this test  </h1> 
                   <button className="btn btn-info" onClick={ this.onClick}>Take again this quiz </button>
                  <Link to={"/quizs/" }><button className="btn btn-info">Back to quizs page</button></Link>    
                  <h1 >{this.state.product.titre} - Correction </h1>          
                   {this.state.product.matiere} 
                      {this.state.product.questions.map(review => (
                        <>
                          <h3>{review.description}</h3>
                            {review.reponses.map(r => (
                          <>
                            {r.etat ? ( <div style={{background: 'grey', width : 300 }}><h5 >{r.description}</h5></div>)
                            :
                            (  <div><h5 >{r.description}</h5> </div> )}
                        </>   ))}
                          <hr />
                        </>   ))}
                   </>) 
                   : ( <> {this.state.result >= parseFloat(s/2)+(s/3) ? ( <><h1>Excellent , Your score was : {this.state.result} / {s} </h1>
                   <button className="btn btn-info" onClick={ this.onClick}>Take again this  quiz </button>
                  <Link to={"/quizs/" }><button  className="btn btn-warning">Back to quizs page</button></Link>    
                  <h1 >{this.state.product.titre} - Correction </h1>          
                   {this.state.product.matiere} 
                      {this.state.product.questions.map(review => (
                        <>
                          <h3>{review.description}</h3>
                            {review.reponses.map(r => (
                          <>
                            {r.etat ? ( <div style={{background: 'grey', width : 300 }}><h5 >{r.description}</h5></div>)
                            :
                            (  <div><h5 >{r.description}</h5> </div> )}
                        </>   ))}
                          <hr />
                        </>   ))}
                   </>) 
                   : (<> <h1>Good , Your score was: {this.state.result} /{ s} </h1> 
                  <button  className="btn btn-info" onClick={ this.onClick}>Demand to take again this  quiz </button>
                  <Link to={"/quizs/" }><button  className="btn btn-warning">Back to quizs page</button></Link>    
                  <h1 >{this.state.product.titre} - Correction </h1>          
                   {this.state.product.matiere} 
                      {this.state.product.questions.map(review => (
                        <>
                          <h3>{review.description}</h3>
                            {review.reponses.map(r => (
                          <>
                            {r.etat ? ( <div style={{background: 'grey', width : 300 }}><h5 >{r.description}</h5></div>)
                            :
                            (  <div><h5 >{r.description}</h5> </div> )}
                        </>   ))}
                          <hr />
                        </>   ))}
                   </>
                   ) }
                    </> )}  </>   )  }
             </div>
                 
            ):(
            <form  className="form-group" onSubmit={this.onSubmit}>
                  <h1 >{this.state.product.titre}</h1>          
                   {this.state.product.matiere} 
                    <div >
                      {this.state.product.questions.map(review => (
                        <>
                        <h3>{review.description}</h3>

{review.type === "select"? (<>
   <select name="response" onChange={this.handleInputChange1}>
  {review.reponses.map(r => (
   <option value={r.score} >{r.description}</option> 
  ))}</select>

      </>):( <>
        {review.type === "radio"? (<>
          {review.reponses.map(r => (
  <> <input onChange={this.handleInputChange1} type="radio" value={r.score} name="response" /> {"  "+r.description} <br />   </>
         ))}
        </>):(<>
          {review.reponses.map(r => (
  <> <input  onChange={this.handleInputChange} type={review.type} name ={r.description} value={r.score}/>{"  "+r.description} <br />
   </>
         ))}
        </>)}

</>)} <hr /> </>   ))}
                        {this.state.passed === "passed" ? (
                         <>
                    <div className="row">
                  
                   <div className="col-md-6">
                    <button disabled="true" className="btn btn-success" type="submit" >Save </button></div>
                    <div className="col-md-6">
                    <button className="btn btn-info" onClick={this.demand} >Request permission </button>  </div>
               
                    </div>
                    <h5>Sorry you can't pass this test , you already passed it .</h5>
                         </>
                        ) : (  <>
                        { this.state.passed === "waiting" ? (<>
                          <button disabled="true" className="btn btn-success" type="submit" >Save </button>
                        <h5>Sorry you can't pass this test , Still waiting for confirmation to take it again .</h5>
                        
                        </>):(<>
             {this.state.time ? (
               <> {this.state.count < 0 ? (<h3>Time Is UP</h3>):
                (<> <h3>Time Left (seconds) : {this.state.count}</h3>
                <button className="btn btn-success" type="submit" >Save </button></> )}    </>
                ):( <>  <button className="btn btn-success" type="submit" >Save </button></>)    } </>
                        )}
                      </>)}
                  
                        
                         </div>  </form> )}
            </div>
       </div>
        );
      }
    componentDidMount () {
      this.doIntervalChange()
  }
     doIntervalChange = () => {
          
          this.myInterval = setInterval(() => {
          this.setState(prevState => ({         
            count: prevState.count - 1
          }))
        }, 1000)
      }
     componentWillUnmount () {
        clearInterval(this.myInterval)
      }


}


export default withRouter(quizdetails) ;