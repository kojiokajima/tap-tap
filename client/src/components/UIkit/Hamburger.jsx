import React, { useEffect, useState } from "react";
// import {DashboardSide} from './index'
// import {SidebarProfileHam, SidebarContainerHam} from './index'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Drawer } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import { PrimaryButton, BlankModal } from "./index";
import { toggleIsBlankModalOpen } from "../../features/beerSlice";
import { selectUser, logout } from "../../features/userSlice";

const Hamburger = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userRef = useSelector(selectUser);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const signout = () => {
    dispatch(logout());
    history.push("/signin");
  };

  const switchDashboard = (linkName) => {
    console.log("USERREF IS ", userRef);
    toggleDrawer()
    history.push(`/dashboard/${userRef.uid}/${linkName}`);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [])

  return (
    <HamburgerContainer>
      <MyMenu fontSize="large" onClick={toggleDrawer} />
      {/* <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}> */}
      <MyDrawer open={isDrawerOpen} onClose={toggleDrawer}>
        {/* {list(anchor)} */}
        <SidebarContainerHam>
          {/* <div className="sidebar-profile"> */}
          <SidebarProfileHam>
            {user?.firstName} {user?.lastName}
            {/* </span> */}
          </SidebarProfileHam>
          {/* </div> */}
          {/* <div className="sidebar-buttons"> */}
          <SidebarButtonsHam>
            <PrimaryButton label={"+ Add Tap"} onClick={() => dispatch(toggleIsBlankModalOpen())} />
            <PrimaryButton label={"My Taps"} onClick={() => switchDashboard("")} />
            <PrimaryButton label={"Friends' Taps"} onClick={() => switchDashboard("friendstaps")} />
            <PrimaryButton label={"Favorites"} onClick={() => switchDashboard("favorites")} />
            <PrimaryButton label={"Untapped"} onClick={() => switchDashboard("untapped")} />
            <br />
            <br />
            <PrimaryButton label={"Logout"} onClick={signout} />
            {/* </div> */}
          </SidebarButtonsHam>
          <BlankModal />
          {/* </div> */}
        </SidebarContainerHam>
      </MyDrawer>
    </HamburgerContainer>
  );
};

export default Hamburger;

const HamburgerContainer = styled.div`

`
const MyDrawer = styled(Drawer)`
  width: 300px;
`

const MyMenu = styled(Menu)`
  display: none;

  @media (max-width: 800px) {
    display: block;
    color: #401f01;
    position: absolute;
    top: 3%;
    right: 3%;
  }
`;



export const SidebarContainerHam = styled.div`
  background-color: #ffe3ca;
  width: 210px;
  height: 94vh;
  padding: 3vh 1vw;

  &-profile {
    display: flex;
    align-items: center;
    // justify-content: space-around;
    justify-content: center;
    margin-bottom: 5vh;

    & * {
      width: 130px;
    }

    & .profile-image {
      margin-right: 2vw;
    }
    & .profile-name {
    }
  }
`;

const SidebarProfileHam = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: space-around;
  // justify-content: center;
  color: #401f01;
  margin-bottom: 5vh;
  text-align: center;
`;

const SidebarButtonsHam = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around; 
  height: 70%;
  align-items: center;
`;
