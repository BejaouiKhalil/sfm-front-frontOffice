import React, { Component } from 'react';
import { Button ,Row } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from "axios";
import { withRouter } from 'react-router';

import './styleCard.css'

class EventCard extends Component {
    
    state={
        participated:false,
        interested:false,   
        idUser:'5c9b7f2de0616e7b3ad03cf0',
        handler:false,
        event:this.props.event,
        nbParticipent:0
    }
    constructor(props) {
        super(props);
        this.createInterestedNotification=this.createInterestedNotification.bind(this)
        this.createParticipateNotification=this.createParticipateNotification.bind(this)
    }

    componentDidMount() {
        
        if ((typeof this.props.event)=== 'string'){
            axios.get("http://localhost:4000/events/getEvent/"+this.props.event).then(
                result => {
                   this.setState({
                       event:result.data,
                       nbParticipent:result.data.participators.length
                   })
                   this.state.event.participators.forEach(element => {
                    if(element._id==this.state.idUser){
                         this.setState({
                             participated:true
                         })
         
                 }
                })
                this.state.event.interested.forEach(element => {
                 if(element._id==this.state.idUser){
                      this.setState({
                         interested:true
                      })
         
              }
             })
                },
                error => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
                );
        }else{
            if (typeof this.props.event.participators === 'undefined') {
                this.setState({
                    nbParticipent: this.props.event.length
                })
            }else{
                this.setState({
                    nbParticipent: this.props.event.participators.length
                })
                this.state.event.participators.forEach(element => {
                    if(element._id==this.state.idUser){
                         this.setState({
                             participated:true
                         })
         
                 }
                })
                this.state.event.interested.forEach(element => {
                 if(element._id==this.state.idUser){
                      this.setState({
                         interested:true
                      })
         
              }
             })
            }
        }

      
    }
    createParticipateNotification(){
        
        const idEvent=this.state.event._id; 
        axios.get("http://localhost:4000/events/participateEvent/"+idEvent+"/"+this.state.idUser).then(
            result => {
                console.log(result);
                this.props.handler();
                this.setState({
                    participated:true,
                    nbParticipent: this.state.event.participators.length+1
                    
                })
                NotificationManager.success('Got Participated','Success');
            },
            error => {
              console.log(error);
              NotificationManager.error('Sorry');
            }
            ); 
    }
    createInterestedNotification(){ 
        const idEvent=this.state.event._id; 
        axios.get("http://localhost:4000/events/InterestedEvent/"+idEvent+"/"+this.state.idUser).then(
            result => {
                this.setState({
                    interested:true,
                    
                })
                console.log(result);
                this.props.handler();
                NotificationManager.success('Got Interested','Success');
            },
            error => {
              console.log(error);
              NotificationManager.error('Sorry');
            }
            );    
       // 
        
    }
    render(){

        return(
            <div id="eventCard" className="card-event" >
            <div onClick={()=>{
                this.props.history.push('/eventDetails/'+this.state.event._id)
            }}>
                <img className="event-image" src={this.state.event.pathPicture} alt="Avatar" style={{width: '100%'}} />
                </div>
                <div className="container">
                    <h4>{this.state.event.name}</h4> 
                    <br/>
                    <p>{this.state.event.lieu}</p>
                    <p> Number of Participant : {this.state.nbParticipent}</p> 
                    <Row>
                    <div className="buttons-event">
                        <Button className="button-event" onClick={this.createInterestedNotification} color="secondary"  disabled={this.state.interested === true}  >{this.state.interested === true ? 'Interested' : 'Interest'}</Button>
                        <Button className="button-event" onClick={this.createParticipateNotification} color="primary" disabled={this.state.participated === true}  >{this.state.participated === true ? 'participated' : 'participate'}</Button>
                    </div>
                    </Row>
                </div>
                <NotificationContainer/>

             </div>

        );
    }

}
export default withRouter(EventCard);