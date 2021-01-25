import React from "react";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import Game from "./components/Game/Game";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Switch>
          <Route path="/mainpage" component={MainPage} />
          <Route path="/game" component={Game} />
          <Redirect to="/mainpage"/>
      </Switch>
    </div>
  );
}

export default App;
