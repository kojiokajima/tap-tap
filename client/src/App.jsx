import React from "react";
import { useDispatch } from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom'
import "./App.css";

import {Dashboard, SignIn, SignUp} from './components/index'



function App() {
  const dispatch = useDispatch();


  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route  path="/signin" component={SignIn} />
        <Route  path="/signup" component={SignUp} />
        <Route  path="/dashboard/:id" component={Dashboard} />
      </Switch>

    </div>
  );
}

export default App;
