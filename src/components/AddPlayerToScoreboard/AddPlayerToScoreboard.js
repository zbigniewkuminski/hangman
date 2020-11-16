import React from "react";
import "./AddPlayerToScoreboard.css";

class AddPlayerToScoreboard extends React.Component {
  unsortedArray = [
    {
      name: "Daniel",
      score: 2000,
    },
    {
      name: "Zbyszek",
      score: 200,
    },
    {
      name: "Zenek",
      score: 20,
    },
  ];

  newPlayer = { name: "Zbygniew", score: 1000 };

  state = {
    // topScores : JSON.parse(localStorage.getItem('topScores'))
    topScores: this.insertNewScore(this.unsortedArray, this.newPlayer),
  };

  closeScoreboard() {
    this.props.scoreboardDisplay();
  }

  insertNewScore(unsortedScores, newScore) {
    var sortedScores = [];
    for (var i = 0; i < unsortedScores.length - 1; i++) {
      console.log(unsortedScores[i]);
      console.log(newScore);
      console.log(unsortedScores[i+1])

      if (unsortedScores[i].score > newScore.score && unsortedScores[i+1].score <= newScore.score) {
        console.log('test1')
          // sortedScores = unsortedScores.slice(0, i)
          // .push(newScore)
          // .concat(unsortedScores.slice(i, unsortedScores.length));
        break;
      }
    }
    return sortedScores;
  }

  render() {
    return (
      <div className="component-background">
        <div className="add-player-to-scoreboard">
          <h1 className="score-layout">
            <div>&nbsp;</div>
            SCORES
            <button
              className="button"
              onClick={() => {
                this.closeScoreboard();
              }}
            >
              X
            </button>
          </h1>
          <div className="scores-displaying">
            <div className="scores-displaying-single-element">
              {[...Array(10)].map((x, i) => {
                return <div key={i}>{i + 1}. </div>;
              })}
            </div>
            <div className="scores-displaying-single-element">
              {[...Array(10)].map((x, i) => {
                return (
                  <div key={i}>
                    {" "}
                    {this.state.topScores[i]
                      ? this.state.topScores[i].name : "........"}
                  </div>
                );
              })}
            </div>
            <div className="scores-displaying-single-element">
              {[...Array(10)].map((x, i) => {
                return (
                  <div key={i}>
                    {" "}
                    {this.state.topScores[i]
                      ? this.state.topScores[i].score
                      : "..."}
                  </div>
                );
              })}
            </div>
          </div>
          <input placeholder="Type your name" />
          <div>{this.props.playerScore}</div>
        </div>
      </div>
    );
  }
}

export default AddPlayerToScoreboard;
