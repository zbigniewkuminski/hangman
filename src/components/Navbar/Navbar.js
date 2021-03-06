import React from 'react';
import "./Navbar.scss";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
  state = {
    hooveredOverGameButton: false,
    hooveredOverTimeGameButton: false,
    currentLanguage: this.props.location.pathname.includes('/pl/') ? 'pl' : 'en',
     languageVersion: {
     }
  }

  hooverDisplayGameOptions() {
  if (this.state.hooveredOverGameButton) {
    return (<div id="classic-game-dropdown-menu">
      <button id="classic-game-polish-button" className="dropdown-button"
      onClick={() => {this.toggleLanguage('pl')}}>{this.state.languageVersion.gameDropdownButtons.polishButtonDescription}</button>
      <button id="classic-game-english-button" className="dropdown-button"
      onClick={() => {this.toggleLanguage('en')}}>{this.state.languageVersion.gameDropdownButtons.englishButtonDescription}</button>
      </div>
    )
   }
  }

  hooverDisplayTimeGameOptions() {
    if (this.state.hooveredOverTimeGameButton) {
      return (<div id="time-game-dropdown-menu">
        <button id="time-game-polish-button" className="dropdown-button"
        onClick={() => {this.toggleLanguageTimeGame('pl')}}>{this.state.languageVersion.gameDropdownButtons.polishButtonDescription}</button>
        <button id="time-game-english-button" className="dropdown-button"
        onClick={() => {this.toggleLanguageTimeGame('en')}}>{this.state.languageVersion.gameDropdownButtons.englishButtonDescription}</button>
        </div>
      )
     }
    }

    toggleLanguageHandler(lang) {
      this.props.location.pathname.includes('timegame') 
        ? this.toggleLanguageTimeGame(lang)
        : this.toggleLanguage(lang);
    }

  toggleLanguage(lang) {
      localStorage.setItem('lang', lang);
      this.props.history.push("/"+lang+"/game");
      this.setState({currentLanguage: lang});
  }

  setInitialLanguageInLocalStorage() {
    this.props.location.pathname.includes('/pl/') ? localStorage.setItem('lang', 'pl') : localStorage.setItem('lang', 'en');
  }

  toggleLanguageTimeGame(lang) {
    localStorage.setItem('lang', lang);
    this.props.history.push("/"+lang+"/timegame");
    this.setState({currentLanguage: lang});
}

  componentDidMount() {
    this.setInitialLanguageInLocalStorage();
    this.generateCorrectLanguageDescriptions();
    this.props.history.listen((location,action) => {
        this.generateCorrectLanguageDescriptions();
        this.setState({currentLanguage:localStorage.getItem("lang")})
      });
}

generateCorrectLanguageDescriptions() {
  switch (localStorage.getItem("lang")) {
    case 'pl':
        const tempPolishVersion = new LanguageVersion('polish');
        this.setState({ languageVersion: tempPolishVersion.language });
      break;
    case 'en':
      const tempEnglishVersion = new LanguageVersion('english');
      this.setState({ languageVersion: tempEnglishVersion.language });
      break;
    default:
      break;
  }
}

  render() {
    return (
<div className="navbar-menu row">
  <div className="row col-md-11 justify-content-between">
    <button id="main-page-button" className="navbar-button" onClick={() => {this.props.history.push("/"+this.state.currentLanguage+"/mainpage")}}>{this.state.languageVersion.homeButtonDescription}</button>

    <div
    onMouseEnter = {() => {this.setState({hooveredOverGameButton: true})}}
    onMouseLeave = {() => {this.setState({hooveredOverGameButton: false})}}>
    <button id="classic-game-button" className="navbar-button" onClick={() => {this.props.history.push("/"+this.state.currentLanguage+"/game")}}>{this.state.languageVersion.gameButtonDescription}</button>{this.hooverDisplayGameOptions()}</div>

    <div
    onMouseEnter = {() => {this.setState({hooveredOverTimeGameButton: true})}}
    onMouseLeave = {() => {this.setState({hooveredOverTimeGameButton: false})}}>
    <button id="time-game-button" className="navbar-button" onClick={() => {this.props.history.push("/"+this.state.currentLanguage+"/timegame")}}>{this.state.languageVersion.timeGameButtonDescription}</button>{this.hooverDisplayTimeGameOptions()}</div>

    <button id="authors-button" className="navbar-button" onClick={() => {this.props.history.push("/"+this.state.currentLanguage+"/authors")}}>{this.state.languageVersion.authorsButtonDescription}</button>
    {
      (
        ()=>{if (this.props.location.pathname.includes('/game') || this.props.location.pathname.includes('/timegame')) {
         return (<button id="toggle-language-button" className="navbar-button" onClick={() => {this.toggleLanguageHandler(this.state.currentLanguage === 'en' ? 'pl' : 'en')}}>{this.state.languageVersion.languageButtonDescription}</button>)}}
      )()
    }
  </div>
   <div className="authors-animation-container col-md-1">
    <span className="authors">ZBYDAN</span>
   </div>
</div>
)}
}

export default withRouter(Navbar);

class LanguageVersion {
  languagesContainer = {
    english: {
      homeButtonDescription: 'Main Page',
      gameButtonDescription: 'Classic Game',
      timeGameButtonDescription: 'Time mode',
      authorsButtonDescription: 'Authors',
      languageButtonDescription: 'Polski',
      gameDropdownButtons: {
        polishButtonDescription: 'Polish',
        englishButtonDescription: 'English',
      }
    },
    polish: {
      homeButtonDescription: 'Strona główna',
      gameButtonDescription: 'Klasyczna Gra',
      timeGameButtonDescription: 'Tryb czasowy',
      authorsButtonDescription: 'Autorzy',
      languageButtonDescription: 'English',
      gameDropdownButtons: {
        polishButtonDescription: 'Polski',
        englishButtonDescription: 'Angielski',
      }
    }
  }
  language;

  constructor(selectedLanguage) {
    this.language = this.languagesContainer[selectedLanguage];
  }
}

