import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import { Dashboard, SignIn, SignUp } from "./components/index";

function App() {

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
