import React from "react";
import "./AddPlayerToScoreboard.css";

class AddPlayerToScoreboard extends React.Component {
  // unsortedArray = [
  //   {
  //     name: "Daniel",
  //     score: 2000,
  //   },
  //   {
  //     name: "Zbyszek",
  //     score: 1500,
  //   },
  //   {
  //     name: "Zenek",
  //     score: 20,
  //   },
  //   {
  //     name: "Mareczek",
  //     score: 10,
  //   }
  // ];

  // newPlayer = { name: "Zbygniew", score: 15 };

  state = {
    topScores: this.getScoresFromLocalStorage()
  };

  getScoresFromLocalStorage() {
    // localStorage.setItem('topScores', JSON.stringify(this.unsortedArray));
    return JSON.parse(localStorage.getItem('topScores')) ? JSON.parse(localStorage.getItem('topScores')) : [];
  }

  closeScoreboard() {
    this.props.scoreboardDisplay();
  }

  prepareToSave(){
    var newScore = {
      name: 'asdasd',
      score: this.props.playerScore
    }
    localStorage.setItem('topScores', JSON.stringify(this.insertNewScore(this.state.topScores, newScore)));
    this.setState({topScores: this.getScoresFromLocalStorage()});
    this.props.gameReset(this.props.puzzleDiscovered);
  }

  insertNewScore(unsortedScores, newScore) {
    var sortedScores = [];
    if (!unsortedScores.length) {
      sortedScores.push(newScore);
      return sortedScores;
    }
    if (newScore.score > unsortedScores[0].score) {
      unsortedScores.unshift(newScore);
      return unsortedScores;
    } else if (newScore.score <= unsortedScores[unsortedScores.length - 1].score) {
      unsortedScores.push(newScore)
      return unsortedScores;
    }
    for (var i = 0; i < unsortedScores.length - 1; i++) {
      if (unsortedScores[i].score > newScore.score && unsortedScores[i + 2].score <= newScore.score) {
        sortedScores = unsortedScores.slice(0, i + 2);
        sortedScores.push(newScore);
        sortedScores = sortedScores.concat(unsortedScores.slice(i + 2, unsortedScores.length));
        break;
      }
    }
    return sortedScores.slice(0, 10);
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
          {(() => {
            if (this.props.showNameInput) {
              return (
                <div className="add-score-section">
                  <div className="input-section">
                    <input className="name-input" placeholder="Enter name" />
                    <div className="score">{this.props.playerScore}</div>
                  </div>
                  <button className="button-save" onClick={() => { this.prepareToSave() }}>SAVE</button>
                </div>
              )
            }
          })()}
        </div>
      </div>
    );
  }
}

export default AddPlayerToScoreboard;
