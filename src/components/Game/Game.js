import React from 'react';
import './Game.css';
import YouTube from 'react-youtube';
import AddPlayerToScoreboard from '../AddPlayerToScoreboard/AddPlayerToScoreboard';
let randomWords = require('random-words');

class Game extends React.Component {
  state = {
    languageVersion: {
      lettersToPick: [],
      usedLetters: [],
    },
    showModal: false,
  }
  secretWord = '';
  displayedWord = '';
  score = 0;
  errorCounter = 0;
  puzzleDiscovered = false;
  videoId = 'FBjYUCRDaGY';
  winVideoId = 'E-XoZAlEDkY';
  lostVideoId = 'RHYOZaQuqtM';
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
      this.videoId = this.lostVideoId;
      this.scoreboardDisplay();
    }
    else {
      this.displayedWord = tempString;
    }
    console.log(this.secretWord)
  }

  randomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  async getPolishWord() {
    var wordIndex = this.randomIndex(0, 93475);
    const response = await fetch('https://hangman2077-polish-dictionary-default-rtdb.europe-west1.firebasedatabase.app/dictionary/' + wordIndex + '.json');
    const data = await response.json();
    return data;
  }

  pickLetter(letter, index) {
    let tempState = this.state;
    this.hiddenLetterReveal(letter)
    tempState.languageVersion.lettersToPick.splice(index, 1);
    tempState.languageVersion.usedLetters.push(letter);
    this.setState(tempState);
    // eslint-disable-next-line no-undef
  }

  gameReset = (puzzleSolved) => {
    this.videoId = 'FBjYUCRDaGY';

    this.errorCounter = 0;

    this.generateWord();

    if (!puzzleSolved) {
      this.score = 0;
    }
    this.puzzleDiscovered = false;
  }

  scoreboardDisplay = () => {
    var tempState = this.state;
    tempState.showModal = !this.state.showModal;
    this.setState(tempState);
  }

  componentWillMount() {
    this.props.history.listen((location,action) => {
    setTimeout(()=>{
      this.generateWord();
      this.languageVersionSet()}, 200);
      this.gameReset();
    });
}

  languageVersionSet() {
    console.log(this.props.location.pathname)
    switch (this.props.location.pathname) {
      case '/pl/game':
        const tempPolishVersion = new LanguageVersion('polish');
        this.setState({ languageVersion: tempPolishVersion.language });
        break;
      case '/en/game':
        const tempEnglishVersion = new LanguageVersion('english');
        this.setState({ languageVersion: tempEnglishVersion.language });
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.generateWord();
    this.languageVersionSet();
  }

  generateWord() {
    switch (this.props.location.pathname) {
      case '/pl/game':
        this.getPolishWord().then((result) => {
          this.secretWord = result.toUpperCase();
          this.displayedWord = this.secretWord.replace(/./g, '*');
          const tempPolishVersion = new LanguageVersion('polish');
          this.setState({ languageVersion: tempPolishVersion.language });
        });
        break;
      case '/en/game':
        this.secretWord = randomWords().toUpperCase();
        this.displayedWord = this.secretWord.replace(/./g, '*');
        const tempEnglishVersion = new LanguageVersion('english');
        this.setState({ languageVersion: tempEnglishVersion.language });
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

    return (
      <div className="whole-game-modal open-animation">
        <div className="header">
          <h3>
            {this.state.languageVersion.description}
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
                {this.state.languageVersion.pickLetterDescription} <br /> </div>
              {
                this.state.languageVersion.lettersToPick.map((letter, index) => {
                  return <button className="keyboard-button" disabled={this.errorCounter >= 9} key={letter} onClick={() => { this.pickLetter(letter, index) }}>{letter}</button>
                })
              }
            </div>
            <div className="used-letter-and-score-section">
              <div>
                <div className="header">{this.state.languageVersion.usedLettersDescription} <br /></div>
                <div className="used-letters">
                  {
                    this.state.languageVersion.usedLetters.map((letter) => {
                      return <div className="picked-letter" key={letter}>{letter}</div>
                    })
                  }
                </div>
              </div>
              <div>
                <div className="header">{this.state.languageVersion.scoreDescription}: {this.score}<br /></div>
              </div>
            </div>
          </div>
          <div className="button-section">
            <button className="button-start-reset" onClick={() => { this.gameReset(this.puzzleDiscovered ? true : false)}}>{this.puzzleDiscovered ? this.state.languageVersion.randomNewWordDescription : 'Reset'}</button>
            <button className="button-start-reset" onClick={() => { this.scoreboardDisplay() }}>{this.state.languageVersion.scoreboard?.scoreboardDescription}</button>
            <button className="button-start-reset" onClick={() => { this.props.history.push("/authors") }}>{this.state.languageVersion.authorsDescription}</button>
          </div>
        </div>
        <YouTube videoId={this.videoId} opts={opts} onReady={this._onReady} />
        {
          this.state.showModal ? (<AddPlayerToScoreboard className="add-player-to-scoreboard"
            scoreboardDisplay={this.scoreboardDisplay}
            gameReset={this.gameReset}
            puzzleDiscovered={this.puzzleDiscovered ? true : false}
            playerScore={this.score}
            languageVersion={this.state.languageVersion.scoreboard}
            showNameInput={this.errorCounter === 9 ? true : false} />) : (<div></div>)
        }
        <div className="footer">
        </div>
      </div>)
  }

  render() {
    return (this.getGameHtml());
  }
}

export default Game;


class LanguageVersion {
  languagesContainer = {
    english: {
      description: 'Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters. Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.',
      pickLetterDescription: 'Pick letter',
      usedLettersDescription: 'Used letters',
      lettersToPick: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      usedLetters: [],
      scoreDescription: 'Score',
      authorsDescription: 'Authors',
      randomNewWordDescription: 'Random new word',
      scoreboard: {
        scoreboardDescription: 'Scoreboard',
        typeNameDescription: 'Enter name',
        saveDescription: 'Save',
        scoredDescription: 'Scored',
        ptsDescription: 'PTS',
        toWeakDescription: 'You are weak and you do not deserve for a place in scoreboard.'
      }
    },
    polish: {
      description: 'Twoim celem jest uratowanie tego biednego człowieka przed powieszeniem. Możesz dokonac tego odgadująć wszystkie ukryte litery. Wybierz litery z tablicy poniżej ale miej na uwadze to że każdy błąd, który popełnisz przybliża tego nieszczęśnika do śmierci. Powodzenia.',
      pickLetterDescription: 'Wybierz literę',
      usedLettersDescription: 'Wybrane litery',
      lettersToPick: ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ż', 'Ź'],
      usedLetters: [],
      scoreDescription: 'Wynik',
      authorsDescription: 'Autorzy',
      randomNewWordDescription: 'Losuj nowe słowo',
      scoreboard: {
        scoreboardDescription: 'Tablica wyników',
        typeNameDescription: 'Wpisz imię',
        saveDescription: 'Zapisz',
        scoredDescription: 'Osiągnął',
        ptsDescription: 'PKT',
        toWeakDescription: 'Jesteś zbyt słaby i nie zasługujesz aby zająć miejsce na tablicy wyników.'
      }
    }
  }
  language;

  constructor(selectedLanguage) {
    this.language = this.languagesContainer[selectedLanguage];
  }
}
