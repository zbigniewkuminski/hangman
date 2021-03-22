import React from 'react';
import "./Navbar.scss";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
  state = {
    hooveredOverGameButton: false,
    currentLanguage: localStorage.getItem("lang"),
     languageVersion: {
     }
  }

  hooverDisplayGameOptions() {
  if (this.state.hooveredOverGameButton) {
    return (<div>
      <button className="dropdown-button"
      onClick={() => {this.toggleLanguage('pl')}}>{this.state.languageVersion.gameDropdownButtons.polishButtonDescription}</button>
      <button className="dropdown-button"
      onClick={() => {this.toggleLanguage('en')}}>{this.state.languageVersion.gameDropdownButtons.englishButtonDescription}</button>
      </div>
    )
   }
  }

  toggleLanguage(lang) {
        localStorage.setItem('lang', lang);
        this.props.history.push("/"+lang+"/game");
        this.setState({currentLanguage: lang});
  }

  componentWillMount() {
    this.generateCorrectLanguageDescriptions();
    this.props.history.listen((location,action) => {
        this.generateCorrectLanguageDescriptions();
        this.setState({currentLanguage:localStorage.getItem("lang")})
      });
}

generateCorrectLanguageDescriptions() {
  console.log(localStorage.getItem("lang"))
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
    console.log(this.state.currentLanguage);
    return (
<div className="navbar-menu row">
  <div className="row col-md-11 justify-content-between">
    <button className="navbar-button" onClick={() => {this.props.history.push("/"+this.state.currentLanguage+"/mainpage")}}>{this.state.languageVersion.homeButtonDescription}</button>

    <div
    onMouseEnter = {() => {this.setState({hooveredOverGameButton: true})}}
    onMouseLeave = {() => {this.setState({hooveredOverGameButton: false})}}>

    <button className="navbar-button" onClick={() => {this.props.history.push("/"+this.state.currentLanguage+"/game")}}>{this.state.languageVersion.gameButtonDescription}</button>{this.hooverDisplayGameOptions()}</div>
    <button className="navbar-button" onClick={() => {this.props.history.push("/"+this.state.currentLanguage+"/authors")}}>{this.state.languageVersion.authorsButtonDescription}</button>

    {
      (
        ()=>{if (this.props.location.pathname==='/pl/game' || this.props.location.pathname==='/en/game') {
         return (<button className="navbar-button" onClick={() => {this.toggleLanguage(this.state.currentLanguage === 'en' ? 'pl' : 'en')}}>{this.state.languageVersion.languageButtonDescription}</button>)}}
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
      gameButtonDescription: 'Game',
      authorsButtonDescription: 'Authors',
      languageButtonDescription: 'Polski',
      gameDropdownButtons: {
        polishButtonDescription: 'Polish',
        englishButtonDescription: 'English',
      }
    },
    polish: {
      homeButtonDescription: 'Strona główna',
      gameButtonDescription: 'Gra',
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

