import React from 'react';
import "./MainPage.css";

class MainPage extends React.Component {

  state = {
    enterAnimation: false
  }

  render() {
    return (
    <div className={'welcome-screen ' + (this.state.enterAnimation ? "enter-game-animation " : "open-animation ")}>
      <div className="title enter-game-animation-top row justify-content-center">Hangman 2077</div>
      <img src={require('./../../assets/hangman_home_page.gif')} className="hangman-gif row justify-content-center" alt="test"></img>
      <div className="row justify-content-center">
        <button className="language-button"
          onClick={() => { this.setState({ enterAnimation: true }); this.props.history.push("/game/polish"); }}>Polski</button>
        <button className="language-button"
          onClick={() => { this.setState({ enterAnimation: true }); this.props.history.push("/game/english"); }}>English</button>
      </div>
    </div>);
  }
}

export default MainPage;
