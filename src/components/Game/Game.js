import React from 'react';
import './Game.css';
import YouTube from 'react-youtube';
import AddPlayerToScoreboard from '../AddPlayerToScoreboard/AddPlayerToScoreboard';
let randomWords = require('random-words');


class Game extends React.Component {
  state = {
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    usedLetters: [],
    welcomescreen: false,
    showModal: false,
    pickedLanguage: ''
  }
  secretWord = '';
  displayedWord = '';
  score = 0;
  errorCounter = 0;
  puzzleDiscovered = false;
  videoId = 'FBjYUCRDaGY';
  winVideoId = 'E-XoZAlEDkY';
  requestSend = false;

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
    this.score += foundLetterCounter;
    if (tempString === this.secretWord) { // WIN- SECRET WORD KNOWN
      this.score = this.score + this.secretWord.length * 2;
      this.errorCounter = 10;
      this.videoId = this.winVideoId;
      this.puzzleDiscovered = true;
    }
    if (foundLetterCounter === 0) { // MISTAKE
      this.errorCounter++;
    }
    if (this.errorCounter === 9) { // LOST GAME
      this.puzzleDiscovered = false;
      this.displayedWord = this.secretWord;
      this.videoId = 'RHYOZaQuqtM';
      this.scoreboardDisplay();
    }
    else {
      this.displayedWord = tempString;
    }
  }

  randomIndex (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async getPolishWord() {
  var wordIndex = this.randomIndex(0, 93475);
  const response = await fetch('https://hangman2077-55a3b-default-rtdb.europe-west1.firebasedatabase.app/dictionary/' + wordIndex + '.json');
  const data = await response.json();
  return data;
}

  pickLetter(letter, index) {
    let tempState = this.state;
    this.hiddenLetterReveal(letter)
    tempState.alphabet.splice(index, 1);
    tempState.usedLetters.push(letter);
    this.setState(tempState);
    // eslint-disable-next-line no-undef
  }

  gameReset = (puzzleSolved) => {
    console.log('Eluwinka')
    this.videoId = 'FBjYUCRDaGY';
    const newState = {
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      usedLetters: [],
      welcomescreen: true,
    }
    this.errorCounter = 0;

    this.generateWord();

    if (!puzzleSolved) {
      this.score = 0;
    }
    this.puzzleDiscovered = false;
    this.setState(newState);
  }

  scoreboardDisplay = () => {
    var tempState = this.state;
    tempState.showModal = !this.state.showModal;
    this.setState(tempState);
  }

  componentDidMount() {
    this.generateWord();
    this.setState(this.state);
  }

  generateWord() {
    const newState = {
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      usedLetters: [],
      welcomescreen: true,
    }
    switch (this.props.location.pathname) {
      case '/game/polish':
          this.getPolishWord().then((result) => {
            this.secretWord = result.toUpperCase();
            this.displayedWord =  this.secretWord.replace(/./g, '*');
            this.setState(newState);
          });
        break;
      case '/game/english':
        this.secretWord = randomWords().toUpperCase();
        this.displayedWord = this.secretWord.replace(/./g, '*');
        break;
      default:
        break;
    }
  }

  getGameHtml() {
    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1,
      },
    };

    return(
      <div className="whole-game-modal open-animation">
        <div className="header">
          <h3> Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters.
          Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.
        </h3>
          <h1 className="displayed-word">
            {this.displayedWord}
          </h1>
          <div>
            <img className="game-state" src={require('./../../assets/hangman' + this.errorCounter + '.png')} alt="test"></img>
          </div>
        </div>
        <div className="main-content">
          <div className="game-content">
            <div className="keyboard">
              <div className="header">
                Pick letter <br /> </div>
              {
                this.state.alphabet.map((letter, index) => {
                  return <button className="keyboard-button" disabled={this.errorCounter >= 9} key={letter} onClick={() => { this.pickLetter(letter, index) }}>{letter}</button>
                })
              }
            </div>
            <div className="used-letter-and-score-section">
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
              <div>
                <div className="header">Score: {this.score}<br /></div>
              </div>
            </div>
          </div>
          <div className="button-section">
            <button className="button-start-reset" onClick={() => {
              this.gameReset(this.puzzleDiscovered ? true : false)
            }
            }>{this.puzzleDiscovered ? 'Random new word' : 'Reset'}</button>
            <button className="button-start-reset" onClick={() => { this.scoreboardDisplay() }}>Scoreboard</button>
          </div>
        </div>
        <YouTube videoId={this.videoId} opts={opts} onReady={this._onReady} />
        {
          this.state.showModal ? (<AddPlayerToScoreboard className="add-player-to-scoreboard"
            scoreboardDisplay={this.scoreboardDisplay} 
            gameReset={this.gameReset}
            puzzleDiscovered={this.puzzleDiscovered ? true : false}
            playerScore={this.score}
            showNameInput={this.errorCounter === 9 ? true : false}/>) : (<div></div>)
        }
        <div className="footer">
        </div>
      </div>)
  }

  render() {
    console.log(this.secretWord);
      return (this.getGameHtml());
  }
}

export default Game;
