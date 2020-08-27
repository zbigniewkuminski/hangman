import React from 'react';
import './Board.css';

let randomWords = require('random-words');

class Board extends React.Component {
  state = {
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    usedLetters: [],
  }
  secretWord = '';
  displayedWord = '';

  hiddenLetterReveal(letter) {
for(let i=0; i<this.secretWord.length; i++){
if(this.secretWord[i]===letter){
this.displayedWord[i]=letter;
}
}
}

  pickLetter(letter, index) {
    let tempState = this.state;
    if (this.secretWord.includes(letter)) {
      this.hiddenLetterReveal(letter)
    }
    tempState.alphabet.splice(index, 1);
    tempState.usedLetters.push(letter);
    this.setState(tempState);
  }


  render() {
    this.secretWord = this.secretWord === '' ? randomWords() : this.secretWord;
    this.displayedWord = this.secretWord.replace(/./g, '*');
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

        <div className="main-content">
          <div className="game-image">
            <img src={require('./../../assets/hangman0.png')} alt="test"></img>
          </div>
          <div className="keyboard">
            <div className="header">
              Pick letter <br /> </div>

            {
              this.state.alphabet.map((letter, index) => {
                return <button className="button" key={letter} onClick={() => { this.pickLetter(letter, index) }}>{letter}</button>
              })
            }
          </div>
          <div>  <div className="header">Used letters <br /> </div>
            {
              this.state.usedLetters.map((letter) => {
                return <div className="pickedLetter" key={letter}>{letter}</div>
              })
            }</div>
        </div>

        <div className="footer">

        </div>
      </div>
    )
  }
}

export default Board;
