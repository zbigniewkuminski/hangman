import React from 'react';
import "./MainPage.css";

class MainPage extends React.Component {

  state = {
    enterAnimation: false
  }

  render() {
    return (<div className={'welcome-screen ' + (this.state.enterAnimation ? "enter-game-animation " : "open-animation ")}>
      <div className="title enter-game-animation-top">Hangman 2077</div>
      <img src={require('./../../assets/hangman_home_page.gif')} className="hangman-gif" alt="test"></img>
      <div >
        <button className="button"
          onClick={() => { this.setState({ enterAnimation: true }); this.props.history.push("/pl/game")}}>Polski</button>
        <button className="button"
          onClick={() => { this.setState({ enterAnimation: true }); this.props.history.push("/en/game")}}>English</button>
      </div>
    </div>);
  }
}

export default MainPage;
