import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

import {SignInOutContainer, SignInOutHero, SignInOutForm, ErrorMessage} from './styles/SignInOut.styles'
import { PrimaryButton, PrimaryTextInput } from "../components/UIkit";

const SignUp = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    setError("")
    axios.get("/signup").then((response) => {
      console.log(response);
      if (response.data.error) {
        setError(response.data.error)
      }
    })
  }, [])

  return (
    <SignInOutContainer>
      <SignInOutHero></SignInOutHero>

      <SignInOutForm>
        <form action="/signup" method="post">
          <ErrorMessage>{error}</ErrorMessage>

          <PrimaryTextInput icon={"name"} label={"First Name"} name={"firstName"} />
          <br/>
          <PrimaryTextInput icon={"name"} label={"Last Name"} name={"lastName"} />
          <br/>
          <PrimaryTextInput icon={"email"} label={"Email"} name={"email"} />
          <br/>
          <PrimaryTextInput icon={"password"} label={"Password"} name={"password"} type={"password"} />
          <br/>
          <PrimaryTextInput icon={"password"} label={"Confirm Password"} name={"confirmPassword"} type={"password"} />
          <br/><br/>
          <PrimaryButton label={"Sign Up"} />
          <br/><br/>
          <Link to="/signin" >already have an account?</Link>
        </form>
      </SignInOutForm>

    </SignInOutContainer>
  )
}

export default SignUp
