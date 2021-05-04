import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'

import { Link } from "react-router-dom";
import axios from 'axios'
import { PrimaryButton, PrimaryTextInput } from "../components/UIkit";
import {SignInOutContainer, SignInOutHero, SignInOutForm, ErrorMessage} from './styles/SignInOut.styles'
import { selectUser, selectStore} from '../features/userSlice'

const SignIn = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const user = useSelector(selectUser)
  const store = useSelector(selectStore)

  useEffect(() => {
    setError("")
    axios.get('/signin').then((response) => {
      if (response.data.error) {
        setError(response.data.error)
      }
    })
  }, [dispatch]);

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

export default SignIn;