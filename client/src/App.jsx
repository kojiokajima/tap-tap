import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import axios from 'axios'

import "./App.css";
import {selectUser} from './features/userSlice'
import { Dashboard, SignIn, SignUp } from "./components/index";
import {login, logout} from './features/userSlice'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  useEffect(() => {
    // axios.get("/userAuth").then((response) => {
    //   if (response.data.loggedIn) {
    //     // console.log(response.data);
    //     dispatch(
    //       login({
    //         uid: response.data.uid,
    //         firstName: response.data.firstName,
    //         lastName: response.data.lastName,
    //         email: response.data.email,
    //       })
    //     );
    //   } else {
    //     dispatch(logout()) // -> delete currentUser from store
    //   }
    // });
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard/:id" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
