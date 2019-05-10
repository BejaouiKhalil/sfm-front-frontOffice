// TARGET SUM - Final Code
import React,{Component, PureComponent } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import './sum.css';
import axios from "axios";

const colors = {
    new: 'lightblue',
    playing: 'deepskyblue',
    won: 'lightgreen',
    lost: 'lightcoral',
  };
  
  const randomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  
  class Number extends PureComponent {
    handleClick = () => {
      if (this.props.clickable) {
        this.props.onClick(this.props.id);
      }
    };
  
    render() {
      return (
        <div
          className="number"
          style={{ opacity: this.props.clickable ? 1 : 0.3 }}
          onClick={this.handleClick}
        >
          {this.props.value}
        </div>
      );
    }
  }
  
  class Game extends Component {
    state = {
      gameStatus: 'new', // new, playing, won, lost
      remainingSeconds: this.props.initialSeconds,
      selectedIds: [],
      scores :[]
    };
   
  
    challengeNumbers = Array.from({
      length: this.props.challengeSize,
    }).map(() =>
      randomNumberBetween(...this.props.challengeRange)
    );
    target = _.sum(
      _.sampleSize(this.challengeNumbers, this.props.answerSize)
    );
    componentDidMount() {
      if (this.props.autoPlay) {
        this.startGame();
      }
      axios.get('/games/game2').then(res => {this.setState({   scores : res.data }); });
    }
    componentWillUnmount() {
      clearInterval(this.intervalId);
    }
  
    isNumberAvailable = numberIndex =>
      this.state.selectedIds.indexOf(numberIndex) === -1;
  
    startGame = () => {
      this.setState({ gameStatus: 'playing' }, () => {
        this.intervalId = setInterval(() => {
          this.setState(prevState => {
            const newRemainingSeconds =
              prevState.remainingSeconds - 1;
            if (newRemainingSeconds === 0) {
              clearInterval(this.intervalId);
              return { gameStatus: 'lost', remainingSeconds: 0 };
            }
            return { remainingSeconds: newRemainingSeconds 
            
            }; 
          });
        }, 1000);
      });
    };
  
    selectNumber = numberIndex => {
      this.setState(
        prevState => {
          if (prevState.gameStatus !== 'playing') {
            return null;
          }
          const newSelectedIds = 
            [ ...prevState.selectedIds, numberIndex ];
          return {
            selectedIds: newSelectedIds,
            gameStatus: this.calcGameStatus(newSelectedIds),
          };
        },
        () => {
          if (this.state.gameStatus !== 'playing') {
            clearInterval(this.intervalId);
          }
        }
      );
    };
    calcGameStatus = newSelectedIds => {
      const sumSelected = newSelectedIds.reduce(
        (acc, curr) => acc + this.challengeNumbers[curr],
        0
      );
      if (newSelectedIds.length !== this.props.answerSize) {
        return 'playing';
      }
      if(sumSelected === this.target){ 
        fetch(`http://localhost:4000/gameplay/game2/5cd34f21d2c60850a8636411/` , {
          method: 'POST',
          headers:{ 
              'Content-Type': 'application/json'
             },
          body: JSON.stringify({ score : 10 })
                }).then( axios.get('/games/game2').then(res => {this.setState({   scores : res.data }); }));

      }
      return sumSelected === this.target ? 'won' : 'lost';
      
    };
  
    render() {
      const { gameStatus, remainingSeconds } = this.state;
      return (<>
        <div className="row"> 
        <div className="col-md-8">  
        <br/><br/>
        <div className="game">
          <div className="help">
          <h5>  Pick {this.props.answerSize} numbers that sum to the
            target in {this.props.initialSeconds} seconds
        </h5>  </div>
          <div
            className="target"
            style={{ backgroundColor: colors[gameStatus] }}
          >
            {gameStatus === 'new' ? 'TARGET' : this.target}
          </div>
          <div className="challenge-numbers">
            {this.challengeNumbers.map((value, index) =>
              <Number
                key={index}
                id={index}
                value={gameStatus === 'new' ? '?' : value}
                clickable={this.isNumberAvailable(index)}
                onClick={this.selectNumber}
              />
            )}
          </div>
          <div className="footer">
          
            {gameStatus === 'new' &&
              <button className="btn btn-success" onClick={this.startGame}>Start</button>
            }
  
            {gameStatus === 'playing' &&
              <div className="timer-value">{remainingSeconds}</div>
            }
  
            {['won', 'lost'].includes(gameStatus) &&
              <button className="btn btn-danger" onClick={this.props.onPlayAgain}>
                Play Again
              </button>
            } 
          </div>
        </div>
   </div> 
   <div className="col-md-4">
   <br/><br/>
     <h5>Members played this game</h5> 
    <br/>
   {this.state.scores.map(score => (
    <>   
  
    <div className="row">
    <div className="col-md-2"><img style={{height: 30, width : 30 }} src={require('./men.png')}/></div>
    <div className="col-md-4">{score.user.name} ({score.user.role})</div>
    <div className="col-md-6">{score.score}  <br/> <br/></div>
    </div></>
   ))}
   </div> </div> </>
      );
    }
  }
  
  class GameContainer extends Component {
    state = {
      gameId: 1,
    };
    resetGame = () =>
      this.setState(prevState => ({
        gameId: prevState.gameId + 1,
      }));
    render() {
      return (
        
        <Game    key={this.state.gameId}
          autoPlay={this.state.gameId > 1}
          challengeRange={[2, 9]}
          challengeSize={6}
          answerSize={4}
          initialSeconds={20}
          onPlayAgain={this.resetGame}
        />
      );
    }
  }
  
  export default GameContainer;
  