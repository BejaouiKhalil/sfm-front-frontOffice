

import React, { Component } from 'react'

class GameOver extends Component {
  state={over :true};
  constructor (props) {
    super(props)
    this.onClick=this.onClick.bind(this);
  }

  render () {
    const {restartGame} = this.props;
    
    return (<>
    {this.state.over ? (<> {this.onClick()}</>):(<></>)}
    <div className="justify-center">
    <h1>Well played </h1>
    <button className="restart-button" onClick={restartGame}>Restart ?</button>
  </div>
  </>  )
  }
  onClick(){
   
    fetch(`http://localhost:4000/gameplay/game1/5cd34f21d2c60850a8636411/` , {
    method: 'POST',
    headers:{ 
        'Content-Type': 'application/json'
       },
    body: JSON.stringify({ score : 10 })
          }).then(this.setState({over:false}));
  }
}



export default GameOver;