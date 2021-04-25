import React, { useEffect, useState } from "react";
import Hero from "../assets/hero01.JPG";
import { TextField, Icon, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
// import axios from 'axios'
import { PrimaryButton, PrimaryTextInput } from "../components/UIkit";
import styled from "styled-components";
import {SignUp} from './index'
import {SignInOutContainer, SignInOutHero, SignInOutForm, ErrorMessage} from './styles/SignInOut.styles'

const SignIn = () => {
  console.log("SIGNIN RENDERED");
  const [error, setError] = useState("");

  useEffect(() => {
    // console.log("USE EFFECT IN SIGNIN EVOKED");
    // axios.get('/signin').then((response) => {
    //   if (response.data.length < 50) {
    //     console.log(response);
    //     setError(response.data)
    //   }
    // })
  }, []);

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
          <PrimaryButton label={"Sign In"} onClick={() => {console.log("HOHO")}} />
          <br/><br/>
          <Link to="/signup" >don't have an account yet?</Link>
        </form>
      </SignInOutForm>
    </SignInOutContainer>
  );
};

export default SignIn;