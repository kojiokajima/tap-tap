import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, Link} from 'react-router-dom'

import { PrimaryButton, BlankModal } from "./index";
import {SidebarContainer, SidebarProfile, SidebarButtons} from '../styles/Dashboard.styles'
import {selectUser,logout} from '../../features/userSlice'
import {toggleIsBlankModalOpen} from '../../features/beerSlice'

const DashboardSide = ({user}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userRef = useSelector(selectUser)

  const signout = () => {
    dispatch(logout());
    history.push("/signin")
  };

  return (
    <SidebarContainer>
      <SidebarProfile>
          {`${user?.firstName} ${user?.lastName}`}
      </SidebarProfile>
      <SidebarButtons>
        <PrimaryButton label={"+ Add Tap"} onClick={() => dispatch(toggleIsBlankModalOpen())} />
        <Link to={"/dashboard/" + userRef?.uid} >
          <PrimaryButton label={"My Taps"} />
        </Link>
        <Link to={"/dashboard/" + userRef?.uid + "/friendstaps"} >
          <PrimaryButton label={"Friends' Taps"} />
        </Link>
        <Link to={"/dashboard/" + userRef?.uid + "/favorites"} >
          <PrimaryButton label={"Favorites"} />
        </Link>
        <Link to={"/dashboard/" + userRef?.uid + "/untapped"} >
          <PrimaryButton label={"Untapped"} />
        </Link>
        <br/><br/>
        <PrimaryButton label={"Logout"} onClick={signout} />
      </SidebarButtons>
      <BlankModal />
    </SidebarContainer>
  );
};

export default DashboardSide;
