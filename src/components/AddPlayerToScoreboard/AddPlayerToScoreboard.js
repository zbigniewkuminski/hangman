import React from "react";
import "./AddPlayerToScoreboard.css";

class AddPlayerToScoreboard extends React.Component {
  state = {
    topScores: [],
    newPlayerName: ''
  };


  handleNewPlayerName = (event) => {
    this.setState({newPlayerName: event.target.value})
  }

  componentDidMount(){
    this.getScoresFromLocalStorage();
  }

  async getScoresFromLocalStorage() {
    const response = await fetch('https://hangman2077-55a3b-default-rtdb.europe-west1.firebasedatabase.app/.json');
    const data = await response.json();
    this.setState({topScores: data? data : []});
  }

  closeScoreboard() {
    this.props.scoreboardDisplay();
  }

  async prepareToSave(){
    var newScore = {
      name: this.state.newPlayerName,
      score: this.props.playerScore
    }
    let updatedScoreboard = this.insertNewScore(this.state.topScores, newScore);
    let requestOption = {method: 'PUT', body:JSON.stringify(updatedScoreboard), headers: { 'Content-Type': 'text/plain' },};
    await fetch('https://hangman2077-55a3b-default-rtdb.europe-west1.firebasedatabase.app/.json', requestOption);
    this.setState({topScores: updatedScoreboard});
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
      if (unsortedScores[i] && unsortedScores[i].score >=newScore.score &&
         unsortedScores[i + 1].score < newScore.score) {
        sortedScores = unsortedScores.slice(0, i + 1);
        sortedScores.push(newScore);
        sortedScores = sortedScores.concat(unsortedScores.slice(i + 1, unsortedScores.length));
        break;
      }
    }
    return sortedScores.slice(0, 10);
  }

  checkIsNewScoreInTop10(){
    return this.state.topScores.length < 10 || this.state.topScores[9].score < this.props.playerScore ? true : false;
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
            if (this.props.showNameInput && this.checkIsNewScoreInTop10()) {
              return (
                <div className="add-score-section">
                  <div className="input-section">
                    <input className="name-input" value={this.state.newPlayerName} maxLength='20' type='text' onChange={this.handleNewPlayerName} placeholder="Enter name" />
                    <div className="score">Scored {this.props.playerScore} PTS</div>
                  </div>
                  <button className="button-save" disabled={!this.state.newPlayerName.trim()} onClick={() => { this.prepareToSave() }}>SAVE</button>
                </div>
              )
            }
            if(this.props.showNameInput && !this.checkIsNewScoreInTop10()){
              return('You are weak and you do not deserve for a place in scoreboard.')
            }
          })()}
        </div>
      </div>
    );
  }
}

export default AddPlayerToScoreboard;
