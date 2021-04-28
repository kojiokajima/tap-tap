import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Avatar } from "@material-ui/core";
import {useHistory, Link} from 'react-router-dom'

import { PrimaryButton, BlankModal } from "./index";
import {selectUser,logout} from '../../features/userSlice'
import {toggleIsBlankModalOpen} from '../../features/beerSlice'
import {SidebarContainer, SidebarProfile, SidebarButtons} from '../styles/Dashboard.styles'

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
    // <div className="sidebar">
    <SidebarContainer>
      {/* <div className="sidebar-profile"> */}
      <SidebarProfile>

        {/* <Avatar className="profile-image" alt="profile" src={imageUrl} /> */}
        {/* <span className="profile-name"> */}
          {user?.firstName} {user?.lastName}
        {/* </span> */}
      </SidebarProfile>
      {/* </div> */}
      {/* <div className="sidebar-buttons"> */}
      <SidebarButtons>
        <PrimaryButton label={"+ Add Tap"} onClick={() => dispatch(toggleIsBlankModalOpen())} />
        <PrimaryButton label={"My Taps"} onClick={() => switchDashboard("")} />
        <PrimaryButton label={"Friends' Taps"} onClick={() => switchDashboard("friendstaps")}/>
        <PrimaryButton label={"Favorites"} onClick={() => switchDashboard("favorites")} />
        <PrimaryButton label={"Untapped"} onClick={() => switchDashboard("untapped")} />
        <br/><br/>
        <PrimaryButton label={"Logout"} onClick={signout} />
      {/* </div> */}
      </SidebarButtons>
      <BlankModal />
    {/* </div> */}
    </SidebarContainer>
  );
};

export default DashboardSide;
