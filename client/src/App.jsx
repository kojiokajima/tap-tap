import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import { Dashboard, SignIn, SignUp } from "./components/index";
import { AppContainer } from './components/styles/App.styles'

function App() {

  return (
    <AppContainer>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard/:id" component={Dashboard} />
      </Switch>
    </AppContainer>
  );
}

export default App;
