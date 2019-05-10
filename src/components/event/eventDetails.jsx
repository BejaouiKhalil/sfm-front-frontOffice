import React, { Component } from 'react';
import {Card,CardHeader , CardBody, CardFooter, Col, Container, Input,Button, Form, FormGroup, Label, FormText, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from "axios";
import { CalendarIcon } from "react-calendar-icon";
import './eventDetails.scss'
  class eventDetails extends Component {
    constructor(props) {
        super(props);
      }
    state = {
        event:{},
        nbParticipent:0,
        nbInterest:0
    };



    componentDidMount() {
       console.log(this.props.match.params.id)
       axios.get("http://localhost:4000/events/getEvent/"+this.props.match.params.id).then(
        result => {
           this.setState({
               event:result.data,
               nbParticipent:result.data.participators.length,
               nbInterest:result.data.interested.length
           })
        },
        error => {

        }
        );
        
    }

    render() {
        console.log(this.state.event)
    return (
        <div className="animated fadeIn">
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <div className="eventContainer">
                                <CalendarIcon className="iconCalendar" date={new Date(this.state.event.startDate)} />
                                <div className="eventText">
                                    <h1>{this.state.event.name}</h1>   
                                    <h4>{new Date(this.state.event.startDate).toString()}</h4>     
                                </div>                       
                            </div>
                            <hr/>
                                <div className="eventDetails">
                                    <div className="about">
                                    <h1>About this Event</h1>
                                    <img className="event-image" src={this.state.event.pathPicture} alt="Avatar"  />
                                    <p>{this.state.event.description}</p>
                                    </div>
                                    <div className="participant">
                                        <p>Place : {this.state.event.lieu}</p>
                                        <p>Nombre of participant :  {this.state.nbParticipent}</p>
                                        <p>Nombre of interested :  {this.state.nbInterest}</p>
                                    </div>
                                </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
              
    );

    }
}
export default eventDetails;