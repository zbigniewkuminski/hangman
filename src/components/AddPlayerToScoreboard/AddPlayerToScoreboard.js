import React from "react";
import './AddPlayerToScoreboard.css';

class AddPlayerToScoreboard extends React.Component {
  state = {
    // topScores : JSON.parse(localStorage.getItem('topScores'))
    topScores: [{
      name: 'Daniel',
      score: 2
    }, {
      name: 'Zbyszek',
      score: 200
    }]
  }

  closeScoreboard() {
    this.props.scoreboardDisplay();
  }

  render() {

    return (
      <div className="component-background">
        <div className="add-player-to-scoreboard">
          <h1 className="score-layout">
            <div>&nbsp;</div>
          SCORES
          <button className="button" onClick={() => { this.closeScoreboard() }}>X</button></h1>
          <div>
            {[...Array(10)].map((x, i) => {
              return <div>{i+1}.  {this.state.topScores[i] ? this.state.topScores[i].name : '...'} 
                           {this.state.topScores[i] ? this.state.topScores[i].score : '...'}</div>
            })}
          </div>
          <input placeholder="Type your name" />
          <div>{this.props.playerScore}</div>
        </div>
      </div>
    );
  }
}

export default AddPlayerToScoreboard;
