import React, {  useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

import {selectUser, selectStore, login} from '../features/userSlice'
import "./styles/Dashboard.styles.scss";

const Dashboard = () => {
  const user = useSelector(selectUser)
  const store = useSelector(selectStore)
  const [sessionExpired, setSessionExpired] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log("USER IS ", user);
    console.log("STORE IS ", store);
    axios.get("/userAuth").then((response) => {
      if (response.data.loggedIn) {
        console.log(response.data);
        dispatch(login({
          uid: response.data.uid,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        }))
      } else {
        setSessionExpired(true)
      }
    })

  }, [])

  if (!sessionExpired) {
    return (
      <div className="dashboard">
        <div className="sidebar">
          <div className="sidebar-profile">
            
            {user?.firstName}
          </div>
          <div className="sidebar-buttons">
  
          </div>
        </div>
        <div className="content">
          this is content
        </div>
      </div>
    );
  } else {
    return <Redirect to="/signin" />
  }
};

export default Dashboard;
