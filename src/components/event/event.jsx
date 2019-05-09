import React, { Component } from 'react';
import {Card,CardHeader , CardBody, CardFooter, Col, Container, Row } from 'reactstrap';
import  EventCard  from "./eventCard";
import axios from "axios";

class EventList extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this)
        this.state={
            error: null,
            isLoaded: false,
            items: [],
            recItems:[],
            bestEvent:[]
        }
        
    }

    handler() {
        console.log("dkhalt");
        
        axios.get("http://localhost:4000/events/getAllEvents").then(
            result => {
                let items=result.data;
                var sorted_items = items.sort((a,b) => {
                    return new Date(a.startDate).getTime() - 
                        new Date(b.startDate).getTime()
                });
                
              this.setState({
                items: sorted_items
              });
              console.log(this.state.items)
            },
            error => {
              this.setState({
                isLoaded: true,
                error
              });
            }
            );
        
      }
    componentDidMount() {
        axios.get("http://localhost:4000/events/getAllEvents").then(
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
            axios.get("http://localhost:4000/events/bestEvents").then(
                result => {
                    let items=result.data;
                    var sorted_items = items.sort((a,b) => {
                        return new Date(a.startDate).getTime() - 
                            new Date(b.startDate).getTime()
                    });
                    console.log(sorted_items)
                  this.setState({
                    isLoaded: true,
                    bestEvent: sorted_items
                  });
                },
                error => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
                );
            axios.get("http://localhost:5000/getRecommandetUserByName?name=test3").then(
                result => {
                   let recEvents=[];
                    result.data.forEach(function(item) {
                        Object.keys(item).forEach(function(key) {
                            recEvents.push(item[key])
                        });
                      });
                      this.setState({
                          recItems:recEvents
                      })
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
        const { error, isLoaded, items,recItems,bestEvent } = this.state;

        return(
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                Best Events :
                            </CardHeader>
                            <CardBody>
                            <Row>
                            {bestEvent.map(item => (
                                <EventCard
                                    event={item} handler={this.handler}
                                />
                            ))}
                            </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                Recommended Events :
                            </CardHeader>
                            <CardBody>
                            <Row>
                            {recItems.map(item => (
                                <EventCard
                                    event={item} handler={this.handler}
                                />
                            ))}
                            </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                All Events :
                            </CardHeader>
                            <CardBody>
                            <Row>
                            {items.map(item => (
                                <EventCard key={item._id}
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
export default EventList;
