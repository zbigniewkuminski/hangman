import React from "react";
import "./AddPlayerToScoreboard.scss";

class AddPlayerToScoreboard extends React.Component {
  state = {
    topScores: [],
    newPlayerName: ''
  };


  handleNewPlayerName = (event) => {
    this.setState({ newPlayerName: event.target.value })
  }

  componentDidMount() {
    this.getScoresFromFireBase();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.forceUpdate();
  };

  async getScoresFromFireBase() {
    const response = await fetch('https://hangman2077-55a3b-default-rtdb.europe-west1.firebasedatabase.app/scores/.json');
    const data = await response.json();
    this.setState({ topScores: data ? data : [] });
  }

  closeScoreboard() {
    this.props.scoreboardDisplay();
  }

  async prepareToSave() {
    var newScore = {
      name: this.state.newPlayerName,
      score: this.props.playerScore
    }
    let updatedScoreboard = this.updateScoresList(this.state.topScores, newScore);
    let requestOption = { method: 'PUT', body: JSON.stringify(updatedScoreboard), headers: { 'Content-Type': 'text/plain' } };
    await fetch('https://hangman2077-55a3b-default-rtdb.europe-west1.firebasedatabase.app/scores/.json', requestOption);
    this.setState({ topScores: updatedScoreboard });
    this.props.gameReset(this.props.puzzleDiscovered);
  }

  updateScoresList(unsortedScores, newScore) {
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
      if (unsortedScores[i] && unsortedScores[i].score >= newScore.score &&
        unsortedScores[i + 1].score < newScore.score) {
        sortedScores = unsortedScores.slice(0, i + 1);
        sortedScores.push(newScore);
        sortedScores = sortedScores.concat(unsortedScores.slice(i + 1, unsortedScores.length));
        break;
      }
    }
    return sortedScores.slice(0, 10);
  }

  checkIsNewScoreInTop10() {
    return this.state.topScores.length < 10 || this.state.topScores[9].score < this.props.playerScore ? true : false;
  }

  render() {
    return (
      <div className="component-background">
        <div className="add-player-to-scoreboard">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-1 col-sm-2 col-2"></div>
            <div className="col-md-10 col-sm-8 col-8">
              <h2 className="mt-2 add-player-to-scoreboard-title">
                {this.props.languageVersion?.scoreboardDescription.toUpperCase()}
              </h2>
            </div>
            <div className="col-md-1 col-sm-2 col-2">
              <button
                className="button pull-right"
                onClick={() => {
                  this.closeScoreboard();
                }}
              >X</button>
            </div>
          </div>
          {(() => {
            if (window.innerWidth > 783) {
              return (
                <div>
                  {this.renderPodium()}
                  {this.renderScoresList(7, 3)}
                </div>
              )
            } else {
              return (
                <div>
                  { this.renderScoresList(10, 0)}
                </div>
              )
            }
          })()}
          {(() => {
            if (this.props.showNameInput && this.checkIsNewScoreInTop10()) {
              return (
                <div className="mt-3">
                  <div className="row justify-content-center">
                    <input className="name-input" value={this.state.newPlayerName} maxLength='20' type='text' onChange={this.handleNewPlayerName} placeholder={this.props.languageVersion.typeNameDescription} />
                    <div className="score">{this.props.languageVersion.scoredDescription} {this.props.playerScore} {this.props.languageVersion.ptsDescription}</div>
                  </div>
                  <div className="row justify-content-center">
                    <button className={"button-save " + (!this.state.newPlayerName.trim() ? "save-button-highlight-disabled " : "")} disabled={!this.state.newPlayerName.trim()} onClick={() => { this.prepareToSave() }}>{this.props.languageVersion.saveDescription}</button>
                  </div>
                </div>
              )
            }
            if (this.props.showNameInput && !this.checkIsNewScoreInTop10()) {
              return (<div className="row">
                <div className="col-md-12 low-score-info">
                  {this.props.languageVersion.toWeakDescription}
                </div>
              </div>)
            }
          })()}
        </div>
      </div>
    );
  }

  renderPodium() {
    return (
      <div className="row">
        <div className="col-md-4 d-flex align-items-end">
          {(() => {
            return (
              <div className="second-place">
                <div >2.</div>
                <div >
                  {this.state.topScores[1]
                    ? this.state.topScores[1].name : "........"}
                  {this.state.topScores[1]
                    ? ' ' + this.state.topScores[1].score
                    : "..."}
                </div>
                <div className="podium-second">
                </div>
              </div>
            )
          })()}
        </div>
        <div className="col-md-4 d-flex align-items-end">
          {(() => {
            return (
              <div className="first-place">
                <div >1.</div>
                <div >
                  {this.state.topScores[0]
                    ? this.state.topScores[0].name : "........"}
                  {this.state.topScores[0]
                    ? ' ' + this.state.topScores[0].score
                    : "..."}
                </div>
                <div className="podium-first">
                </div>
              </div>
            )
          })()}
        </div>
        <div className="col-md-4 d-flex align-items-end">
          {(() => {
            return (
              <div className="third-place">
                <div >3.</div>
                <div >
                  {this.state.topScores[2]
                    ? this.state.topScores[2].name : "........"}
                  {this.state.topScores[2]
                    ? ' ' + this.state.topScores[2].score
                    : "..."}
                </div>
                <div className="podium-third">
                </div>
              </div>
            )
          })()}
        </div>
      </div>
    )
  }

  renderScoresList(listLength, indexesSkipped) {
    return (
      <div className="scores-displaying">
        <div className="row justify-content-center">
          <div className="scores-displaying-single-element">
            {[...Array(listLength)].map((x, i) => {
              return <div key={i + indexesSkipped}>{i + indexesSkipped + 1}. </div>;
            })}
          </div>
          <div className="scores-displaying-single-element">
            {[...Array(listLength)].map((x, i) => {
              return (
                <div key={i + indexesSkipped}>
                  {" "}
                  {this.state.topScores[i + indexesSkipped]
                    ? this.state.topScores[i + indexesSkipped].name : "........"}
                </div>
              );
            })}
          </div>
          <div className="scores-displaying-single-element">
            {[...Array(listLength)].map((x, i) => {
              return (
                <div key={i + indexesSkipped}>
                  {" "}
                  {this.state.topScores[i + indexesSkipped]
                    ? this.state.topScores[i + indexesSkipped].score
                    : "..."}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default AddPlayerToScoreboard;
