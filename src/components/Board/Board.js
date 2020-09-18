import React from 'react';
import './Board.css';
import YouTube from 'react-youtube';
let randomWords = require('random-words');

class Board extends React.Component {
  state = {
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    usedLetters: [],
  }
  secretWord = '';
  displayedWord = '';
  errorCounter = 0;

  hiddenLetterReveal(letter) {
    let tempString = '';
    let foundLetterCounter = 0;
    for (let i = 0; i < this.secretWord.length; i++) {
      if (this.secretWord[i] === letter) {
        foundLetterCounter++;
        tempString += letter;
      }
      if (this.displayedWord[i] !== '*') {
        tempString += this.displayedWord[i];
      }
      if (this.secretWord[i] !== letter && this.displayedWord[i] === '*') {
        tempString += '*';
      }
    }
    console.log(foundLetterCounter)
    if (foundLetterCounter === 0) {
      this.errorCounter++;
      console.log(this.errorCounter)
    }
    this.displayedWord = tempString;
  }

  pickLetter(letter, index) {
    let tempState = this.state;
    this.hiddenLetterReveal(letter)
    tempState.alphabet.splice(index, 1);
    tempState.usedLetters.push(letter);
    this.setState(tempState);
  }

  render() {
    this.secretWord = this.secretWord === '' ? randomWords().toUpperCase() : this.secretWord.toUpperCase();
    this.displayedWord = this.displayedWord === '' ? this.secretWord.replace(/./g, '*') : this.displayedWord;
    const opts = {
      height: '1',
      width: '1',
      playerVars: {
        autoplay: 1,
      },
    };
    return (
      <div>
        <div className="header">
          <h3> Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters.
          Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.
          </h3>
          <h1>
            {this.displayedWord}
          </h1>
        </div>
        <YouTube videoId="ZKAM_Hk4eZ0" opts={opts} onReady={this._onReady} className="you-tube-hidden"/>
        <div className="main-content">
          <div className="game-image">
            <img src={require('./../../assets/hangman' + this.errorCounter + '.png')} alt="test"></img>
          </div>
          <div className="keyboard">
            <div className="header">
              Pick letter <br /> </div>

            {
              this.state.alphabet.map((letter, index) => {
                return <button className="button" disabled={this.errorCounter >= 7} key={letter} onClick={() => { this.pickLetter(letter, index) }}>{letter}</button>
              })
            }
          </div>
          <div>
            <div className="header">Used letters <br /></div>
            <div className="used-letters">
              {
                this.state.usedLetters.map((letter) => {
                  return <div className="picked-letter" key={letter}>{letter}</div>
                })
              }
            </div>
          </div>
        </div>

        <div className="footer">

        </div>
      </div>
    )
  }
}

export default Board;
