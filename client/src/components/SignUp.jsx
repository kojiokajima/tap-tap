import React, {useEffect, useState} from 'react'
import { PrimaryButton, PrimaryTextInput } from "../components/UIkit";
import { Link } from "react-router-dom";
import {SignInOutContainer, SignInOutHero, SignInOutForm, ErrorMessage} from './styles/SignInOut.styles'
import axios from 'axios';


const SignUp = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    setError("")
    axios.get("/signup").then((response) => {
      if (response.data.length < 50) {
        setError(response.data)
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
      {/* <PrimaryButton label={"go to sign in"} onClick={test} /> */}
    </SignInOutContainer>
  )
}

export default SignUp
