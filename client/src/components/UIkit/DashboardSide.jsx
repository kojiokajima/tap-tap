import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, useHistory, Link} from 'react-router-dom'

import { PrimaryButton, BlankModal } from "./index";
import {selectUser,logout} from '../../features/userSlice'
import {toggleIsBlankModalOpen} from '../../features/beerSlice'
import {SidebarContainer, SidebarProfile, SidebarButtons} from '../styles/Dashboard.styles'

const DashboardSide = ({user}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userRef = useSelector(selectUser)
  // const user = useSelector(selectUser)


  const signout = () => {
    dispatch(logout());
    history.push("/signin")
  };


  const switchDashboard = (linkName) => {
    // console.log("USERREF IS ", userRef);
    history.push(`/dashboard/${userRef.uid}/${linkName}`)
    // console.log("YAYA");
    // return <Redirect to={"dashboard/" + userRef.uid + "/" + linkName} />
  }

  return (
    // <div className="sidebar">
    <SidebarContainer>
      {/* <div className="sidebar-profile"> */}
      <SidebarProfile>
          {user?.firstName} {user?.lastName}
        {/* </span> */}
      </SidebarProfile>
      {/* </div> */}
      {/* <div className="sidebar-buttons"> */}
      <SidebarButtons>
        <PrimaryButton label={"+ Add Tap"} onClick={() => dispatch(toggleIsBlankModalOpen())} />
        <Link to={"/dashboard/" + userRef?.uid} >
          {/* <PrimaryButton label={"My Taps"} onClick={() => switchDashboard("")} /> */}
          <PrimaryButton label={"My Taps"} />
        </Link>
        <Link to={"/dashboard/" + userRef?.uid + "/friendstaps"} >
          {/* <PrimaryButton label={"Friends' Taps"} onClick={() => switchDashboard("friendstaps")}/> */}
          <PrimaryButton label={"Friends' Taps"} />
        </Link>
        <Link to={"/dashboard/" + userRef?.uid + "/favorites"} >
          {/* <PrimaryButton label={"Favorites"} onClick={() => switchDashboard("favorites")} /> */}
          <PrimaryButton label={"Favorites"} />
        </Link>
        <Link to={"/dashboard/" + userRef?.uid + "/untapped"} >
          {/* <PrimaryButton label={"Untapped"} onClick={() => switchDashboard("untapped")} /> */}
          <PrimaryButton label={"Untapped"} />
        </Link>
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
