import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import Hero from "../assets/hero01.JPG";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'
import { PrimaryButton, PrimaryTextInput } from "../components/UIkit";
import {SignInOutContainer, SignInOutHero, SignInOutForm, ErrorMessage} from './styles/SignInOut.styles'
import {login, logout, selectUser, selectStore} from '../features/userSlice'

const SignIn = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const store = useSelector(selectStore)

  useEffect(() => {
    // console.log("USE EFFECT IN SIGNIN EVOKED");
    setError("")
    axios.get('/signin').then((response) => {
      // if (response.data.length < 50) {
      if (response.data.erro) {
        setError(response.data)
      }
    })

    // axios.get("/userAuth").then((response) => {
    //   console.log("THIS IS RES ", response.data);
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


    console.log("SELECT USER IS ", user);
    console.log("SELECT STORE IS ", store);
    
  }, [dispatch]);

// if (!user?.loggedIn) {
  return (
    <SignInOutContainer>
      <SignInOutHero></SignInOutHero>

      <SignInOutForm>
        <form action="/signin" method="post">
          <ErrorMessage>{error}</ErrorMessage>

          <PrimaryTextInput icon={"email"} label={"Email"} name={"email"} />
          <br/><br/>
          <PrimaryTextInput icon={"password"} label={"Password"} name={"password"} type={"password"} />
          <br/><br/><br/><br/>
          <PrimaryButton label={"Sign In"} />
          <br/><br/>
          <Link to="/signup" >don't have an account yet?</Link>
        </form>
      </SignInOutForm>
    </SignInOutContainer>
  );
}
// else {
//   <Redirect to="/dashboard" />
// }
// };

export default SignIn;