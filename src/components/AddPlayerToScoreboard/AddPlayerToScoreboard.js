import React from "react";
import './AddPlayerToScoreboard.css';

class AddPlayerToScoreboard extends React.Component {
  render() {
    return (
      <div className="component-background">
        <div className="add-player-to-scoreboard">
          <h1 className ="score-layout">SCORES</h1>
          <input placeholder="Type your name" />
        </div>
      </div>
    );
  }
}

export default AddPlayerToScoreboard;
