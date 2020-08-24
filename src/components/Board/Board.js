import React from 'react';
import './Board.css';

class Board extends React.Component {
  state = {

  }

  render() {
    return (
      <div>
        <div className="header">
          <h3> Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters.
          Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.
          </h3>
          <h1>
            TEST PHRASE
          </h1>
        </div>

        <div className="body">
          <div className="game-image">
            <img src={require('./../../assets/hangman0.png')} alt="test"></img>
          </div>
          <div className="keyboard">

          </div>
        </div>

        <div className="footer">

        </div>
      </div>
    )
  }
}

export default Board;
