import React, { Component } from 'react';
import { Button ,Row } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from "axios";

import './styleCard.css'

class MyEventCard extends Component {
    
    state={
        idUser:'5c9b7f2de0616e7b3ad03cf0',
        handler:false,
        event:this.props.event,
        nbParticipent: this.props.event.participators.length
    }
    constructor(props) {
        super(props);
        this.createUnParticipateNotification=this.createUnParticipateNotification.bind(this)
    }

    componentDidMount() {

            
    }
    createUnParticipateNotification(){
        const idEvent=this.props.event._id; 
        axios.get("http://localhost:4000/events/unParticipateEvent/"+idEvent+"/"+this.state.idUser).then(
            result => {
                this.props.handler();
                this.setState({
                    
                })
                NotificationManager.success('Got UnParticipated','Success');
            },
            error => {
              console.log(error);
              NotificationManager.error('Sorry');
            }
            ); 
    }
    createUnInterestedNotification(){ 
        const idEvent=this.state.event._id; 
        axios.get("http://localhost:4000/events/InterestedEvent/"+idEvent+"/"+this.state.idUser).then(
            result => {
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
            <div id="eventCard" className="card-event">
                <img className="event-image" src={this.state.event.pathPicture} alt="Avatar" style={{width: '100%'}} />
                <div className="container">
                    <h4>{this.state.event.name}</h4> 
                    <p>{this.state.event.description}</p> 
                    <p>{this.state.event.nbParticipent}</p> 
                    <Row>
                    <div className="buttons-event">
                        <Button className="button-event" onClick={this.createUnParticipateNotification} color="primary" >Unparticipate</Button>
                    </div>
                    </Row>
                </div>
                <NotificationContainer/>
             </div>
            

        );
    }

}
export default MyEventCard;