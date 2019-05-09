import React, { PureComponent } from 'react';
import Header from './Header';
import Card from './Card';
import GameOver from './GameOver';
import axios from "axios";


import './main.css';

class Cards extends PureComponent {

 
  state = { 
    isFlipped: Array(12).fill(false),
    shuffledCard: Cards.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1,over :false,
    scores:[]
  };
  componentDidMount() {
    axios.get('/games/game1').then(res => {this.setState({   scores : res.data }); });
  }

  static duplicateCard = () => {
    return [0,1,2,3,4,5].reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
    },[]);
  };

handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
        prevSelectedCard: this.state.shuffledCard[cardId],
        prevCardId: cardId
    });

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({ 
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));

      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }))
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 1000);
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(12).fill(false),
      shuffledCard: Cards.duplicateCard().sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1
    });
  };

  isGameOver = () => {

    if( this.state.isFlipped.every((element, index, array) => element !== false)) 
    { this.componentDidMount();
          return true;
          } else return false;
          
  };

  render() {
    return (
     <div>
       <Header restartGame={this.restartGame} />
       <div className="container">
       <div className="row">
       <div className="col-md-9">
       { this.isGameOver() ? <>
       <GameOver restartGame={this.restartGame} /> </>
       : <div className="grid-container">
          {this.state.shuffledCard.map((cardNumber, index) => 
           <Card
                key={index} 
                id={index} 
                cardNumber={cardNumber} 
                isFlipped={this.state.isFlipped[index]} 
                handleClick={this.handleClick}     
              />
            )
          }
        </div>
       }
       </div>
       <div className="col-md-3">
       <br/><br/>
     <h5>Members played this game</h5> 
    <br/>
   {this.state.scores.map(score => (
    <>   
  
    <div className="row">
    <div className="col-md-2"><img style={{height: 30, width : 30 }} src={require('./men.png')}/></div>
    <div className="col-md-7">{score.user.name} ({score.user.role})</div>
    <div className="col-md-3">
    {score.score === 100 ? (<>
    <div className="row">
    <div className="col-md-6">  {score.score}</div>
    <div className="col-md-6"> <img style={{height: 20, width : 30 }} src={require('./bronze.svg')}/> </div> 
    </div>
    </>):(<> {score.score >500 ? (<>
      <div className="row">
      <div className="col-md-6">{score.score}</div>
      <div className="col-md-6"> <img style={{height: 20, width : 30 }} src={require('./gold.png')}/> </div>
      </div>
      </>)
    :(<>{score.score}</>)} </>)  }
    <br/> <br/></div>
    </div></>
   ))}
       </div>
       </div>
       </div>
     </div>
    );
  }
}

export default Cards;
