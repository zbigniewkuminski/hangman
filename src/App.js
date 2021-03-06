import React from "react";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./components/MainPage/MainPage";
import Game from "./components/Game/Game";
import TimeGame from "./components/TimeGame/TimeGame";
import AuthorsPage from "./components/AuthorsPage/AuthorsPage";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div id="navbar" className="row justify-content-center">
        <Navbar/>
      </div>
      <div className="row justify-content-center">
        <Switch>
          <Route path="/*/mainpage" component={MainPage} />
          <Route path="/*/game" component={Game} />
          <Route path="/*/timegame" component={TimeGame} />
          <Route path="/*/authors" component={AuthorsPage} />
          <Redirect to="/en/mainpage" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
