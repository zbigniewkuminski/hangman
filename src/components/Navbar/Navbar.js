import React from 'react';
import "./Navbar.css";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
  state = {
    hooveredOverGameButton: false,
    toggleLanguage: false,
  }

  hooverDisplayGameOptions() {
  if (this.state.hooveredOverGameButton) {
    return (<div>
      <button className="dropdown-button"
      onClick={() => {this.props.history.push("/pl/game")}}>Polski</button>
      <button className="dropdown-button"
      onClick={() => {this.props.history.push("/en/game")}}>English</button>
      </div>
    )
   }
  }

  toggleLanguage() {
    this.state.toggleLanguage=(!this.state.toggleLanguage);
    if(this.state.toggleLanguage===false) {
      return (this.props.history.push("/en/game"));
    }
    else {
      return (this.props.history.push("/pl/game"));
    }
  }

  render() {
    return (
  <div className="navbar">
    <button className="navbar-button" onClick={() => {this.props.history.push("/*/mainpage")}}>Home</button>

    <div
    onMouseEnter = {() => {this.setState({hooveredOverGameButton: true})}}
    onMouseLeave = {() => {this.setState({hooveredOverGameButton: false})}}>

    <button className="navbar-button" onClick={() => {this.props.history.push("/*/game")}}>Game</button>{this.hooverDisplayGameOptions()}</div>
    <button className="navbar-button" onClick={() => {this.props.history.push("/*/authors")}}>Authors</button>
    <button className="navbar-button" onClick={() => {this.toggleLanguage()}}>Language</button>
    <span className="authors-button">ZBYDAN</span>
  </div>
)}
}

export default withRouter(Navbar);

class LanguageVersion {
  languagesContainer = {
    english: {
      homeButtonDescription: 'Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters. Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.',
      gameButtonDescription: 'Pick letter',
      authorsButtonDescription: 'Used letters',
      languageButtonDescription: '',
      gameDropdownButtons: {
        polishButtonDescription: 'Scoreboard',
        englishButtonDescription: 'Enter name',
      }
    },
    polish: {
      homeButtonDescription: 'Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters. Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.',
      gameButtonDescription: 'Pick letter',
      authorsButtonDescription: 'Used letters',
      languageButtonDescription: '',
      gameDropdownButtons: {
        polishButtonDescription: 'Scoreboard',
        englishButtonDescription: 'Enter name',
      }
    }
  }
  language;

  constructor(selectedLanguage) {
    this.language = this.languagesContainer[selectedLanguage];
  }
}

