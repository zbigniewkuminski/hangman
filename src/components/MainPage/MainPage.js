import React from 'react';
import "./MainPage.scss";

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
    <div id="home-page-title" className="title enter-game-animation-top row justify-content-center">Hangman 2077</div>
    <img src={require('./../../assets/hangman_home_page.gif')} className="hangman-gif row justify-content-center" alt="test"></img>
    </div>);
  }
}

export default MainPage;
