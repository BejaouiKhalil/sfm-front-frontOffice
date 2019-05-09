import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import './style.scss';

class Game extends React.Component {
  state = {
    height: 8,
    width: 8,
    mines: 10
  };

render() {
    const { height, width, mines } = this.state;
    return (
      <div className="game">
        <Board height={height} width={width} mines={mines} />
      </div>
    );
  }
}
export default Game;