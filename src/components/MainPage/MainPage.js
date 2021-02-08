import React from 'react';
import "./MainPage.css";

class MainPage extends React.Component {

  state = {
    enterAnimation: false
  }

  render() {
    return (<div className={'welcome-screen ' + (this.state.enterAnimation ? "enter-game-animation " : "open-animation ")}>
      <div className="title enter-game-animation-top">Enter the Hangman 2077</div>
      <img src={require('./../../assets/hangman_home_page.gif')} className="hangman-gif" alt="test"></img>
      <div >
        <button className="button"
          onClick={() => { this.setState({ enterAnimation: true }); this.props.history.push("/game/polish"); }}>Polski</button>
        <button className="button"
          onClick={() => { this.setState({ enterAnimation: true }); this.props.history.push("/game/english"); }}>English</button>
      </div>
      <button className="button"
          onClick={() => { this.props.history.push("/authors") }}>Authors</button>
    </div>);
  }
}

export default MainPage;
