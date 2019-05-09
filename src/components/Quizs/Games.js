import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


class Games extends Component {
   

    render() { 
    return (
    
   <div className="container">
     <h2>Choose a game to play </h2>
      <br />
    <div className="row">  
    <div className="col-md-4">  
    <Link to={"/games/game1"}>
    Flipping Cards
    </Link>
    </div>
    <div className="col-md-4">  
    <Link to={"/games/game2"}>
    Sum game
    </Link>
    </div>
    <div className="col-md-4">  
    <Link to={"/games/game3"}>
    Minesweeper
    </Link>
    </div>
    </div>
    </div>
      
  );  
    }
}

export default Games;
