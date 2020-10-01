import React from 'react';
import './Board.css';
import YouTube from 'react-youtube';
let randomWords = require('random-words');

class Board extends React.Component {
  state = {
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    usedLetters: [],
    welcomescreen: false,
  }
  secretWord = '';
  displayedWord = '';
  errorCounter = 0;
  videoId = 'ZKAM_Hk4eZ0';
  winVideoId = 'E-XoZAlEDkY';

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
    if (tempString === this.secretWord) {
      this.errorCounter = 8;
      this.videoId = this.winVideoId;
    }
    if (foundLetterCounter === 0) {
      this.errorCounter++;
    }
    if (this.errorCounter === 7) {
      this.displayedWord = this.secretWord;
      this.videoId = 'RHYOZaQuqtM';
    }
    else {
      this.displayedWord = tempString;
    }
  }

  pickLetter(letter, index) {
    let tempState = this.state;
    this.hiddenLetterReveal(letter)
    tempState.alphabet.splice(index, 1);
    tempState.usedLetters.push(letter);
    this.setState(tempState);
  }

  gameReset() {
    const newState = {
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      usedLetters: [],
      welcomescreen: true,
    }
    this.errorCounter = 0;
    this.secretWord = randomWords().toUpperCase();
    this.displayedWord = this.secretWord.replace(/./g, '*');
    this.setState(newState);
  }

  render() {
    this.secretWord = this.secretWord === '' ? randomWords().toUpperCase() : this.secretWord.toUpperCase();
    this.displayedWord = this.displayedWord === '' ? this.secretWord.replace(/./g, '*') : this.displayedWord;
    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1,
      },
    };
    if (this.state.welcomescreen) {
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
          <YouTube videoId={this.videoId} opts={opts} onReady={this._onReady} />
          <div className="main-content">
            <div className="game-content">
              <div className="game-image">
                <img src={require('./../../assets/hangman' + this.errorCounter + '.png')} alt="test"></img>
              </div>
              <div className="keyboard">
                <div className="header">
                  Pick letter <br /> </div>
                {
                  this.state.alphabet.map((letter, index) => {
                    return <button className="keyboard-button" disabled={this.errorCounter >= 7} key={letter} onClick={() => { this.pickLetter(letter, index) }}>{letter}</button>
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
            <button className="button-start-reset" onClick={() => { this.gameReset() }}>Reset</button>
          </div>

          <div className="footer">

          </div>
        </div>
      )
    } else {
      return (<div className='welcome-screen'>
        <div>Enter the Hangman 2077</div>
        <img src={require('./../../assets/hangmangif.gif')} className="hangman-gif" alt="test"></img>
        <button className="button-start-reset" onClick={() => { this.setState({ welcomescreen: true, }) }}>Start</button>
      </div>
      )

    }
  }
}

export default Board;
