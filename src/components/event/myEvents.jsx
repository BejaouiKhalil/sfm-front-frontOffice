import React, { Component } from 'react';
import {Card,CardHeader , CardBody, CardFooter, Col, Container, Row } from 'reactstrap';
import  MyEventCard  from "./MyEventCard";
import axios from "axios";

class myEvents extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this)
        this.state={
            idUser:'5c9b7f2de0616e7b3ad03cf0',
            error: null,
            isLoaded: false,
            items: []
        }
        
    }
    handler() {
        console.log("dkhalt");
        
   
        
      }
    componentDidMount() {
      axios.get("http://localhost:4000/events/getUserParticipatingEvent/"+this.state.idUser).then(
        result => {
            let items=result.data;
            var sorted_items = items.sort((a,b) => {
                return new Date(a.startDate).getTime() - 
                    new Date(b.startDate).getTime()
            });
            
          this.setState({
            isLoaded: true,
            items: sorted_items
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
        );
        
    }
    render(){
        const { error, isLoaded, items } = this.state;

        return(
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                Update Events :
                            </CardHeader>
                            <CardBody>
                            <Row>
                            {items.map(item => (
                                <MyEventCard key={item._id}
                                    event={item} handler={this.handler}
                                />
                            ))}
                            </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>    

        );
    }

}
export default myEvents;
