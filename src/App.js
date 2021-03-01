import React from "react";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import Game from "./components/Game/Game";
import AuthorsPage from "./components/AuthorsPage/AuthorsPage";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
        <Navbar/>
          <Switch>
          <Route path="/mainpage" component={MainPage} />
          <Route path="/game" component={Game} />
          <Route path="/authors" component={AuthorsPage} />
          <Redirect to="/mainpage"/>
      </Switch>
    </div>
  );
}

export default App;
