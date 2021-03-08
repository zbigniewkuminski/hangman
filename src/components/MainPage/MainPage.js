import React from 'react';
import "./MainPage.css";

class MainPage extends React.Component {

  state = {
    enterAnimation: false
  }

  startGame(lang) {
    localStorage.setItem('lang', lang);
    this.props.history.push("/"+lang+"/game");
    this.setState({ enterAnimation: true });
    }

  render() {
    return (<div className={'welcome-screen ' + (this.state.enterAnimation ? "enter-game-animation " : "open-animation ")}>
    <div className="title enter-game-animation-top row justify-content-center">Hangman 2077</div>
    <img src={require('./../../assets/hangman_home_page.gif')} className="hangman-gif row justify-content-center" alt="test"></img>
    <div className="row justify-content-center">
        <button className="language-button"
          onClick={() => {this.startGame('pl')}}>Polski</button>

        <button className="language-button"
          onClick={() => { this.startGame('en')}}>English</button>
      </div>
    </div>);
  }
}

export default MainPage;
