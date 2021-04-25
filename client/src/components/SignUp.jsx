import React, {useEffect, useState} from 'react'
import { PrimaryButton, PrimaryTextInput } from "../components/UIkit";
import { Link } from "react-router-dom";
import {SignInOutContainer, SignInOutHero, SignInOutForm, ErrorMessage} from './styles/SignInOut.styles'


const SignUp = () => {
  const [error, setError] = useState("");

  return (
    <SignInOutContainer>
      <SignInOutHero></SignInOutHero>

      <SignInOutForm>
        <form action="/signin" method="post">
          <ErrorMessage>{error}</ErrorMessage>

          <PrimaryTextInput icon={"name"} label={"First Name"} />
          <br/><br/>
          <PrimaryTextInput icon={"name"} label={"Last Name"} />
          <br/><br/>
          <PrimaryTextInput icon={"email"} label={"Email"} />
          <br/><br/>
          <PrimaryTextInput icon={"password"} label={"Password"} />
          <br/><br/>
          <PrimaryTextInput icon={"password"} label={"Confirm Password"} />
          <br/><br/><br/><br/>
          <PrimaryButton label={"Sign Up"} onClick={() => {console.log("HOHO")}} />
          <br/><br/>
          <Link to="/signin" >already have an account?</Link>
        </form>
      </SignInOutForm>
    </SignInOutContainer>
  )
}

export default SignUp
