import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Avatar } from "@material-ui/core";
import {useHistory, Link} from 'react-router-dom'

import { PrimaryButton, BlankModal } from "./index";
import {selectUser,logout} from '../../features/userSlice'
import {toggleIsBlankModalOpen} from '../../features/beerSlice'
import {Sidebarcontainer} from '../styles/Dashboard.styles'

const DashboardSide = ({imageUrl, user}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userRef = useSelector(selectUser)
  // const user = useSelector(selectUser)


  const signout = () => {
    dispatch(logout());
    history.push("/signin")
  };


  const switchDashboard = (linkName) => {
    console.log("USERREF IS ", userRef);
    history.push(`/dashboard/${userRef.uid}/${linkName}`)
  }

  return (
    <div className="sidebar">
    {/* <Sidebarcontainer> */}
      <div className="sidebar-profile">
        {/* <Avatar className="profile-image" alt="profile" src={imageUrl} /> */}
        {/* <span className="profile-name"> */}
          {user?.firstName} {user?.lastName}
        {/* </span> */}
      </div>
      <div className="sidebar-buttons">
        <PrimaryButton label={"+ Add Tap"} onClick={() => dispatch(toggleIsBlankModalOpen())} />
        <PrimaryButton label={"My Taps"} onClick={() => switchDashboard("")} />
        <PrimaryButton label={"Friends' Taps"} onClick={() => switchDashboard("friendstaps")}/>
        <PrimaryButton label={"Favorites"} onClick={() => switchDashboard("favorites")} />
        <PrimaryButton label={"Untapped"} onClick={() => switchDashboard("untapped")} />
        <PrimaryButton label={"Logout"} onClick={signout} />
      </div>
      <BlankModal />
    </div>
  );
};

export default DashboardSide;
