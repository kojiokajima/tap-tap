import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { PrimaryButton, BlankModal } from "./index";
import { HamburgerContainer, MyDrawer, MyMenu, SidebarContainerHam, SidebarProfileHam, SidebarButtonsHam } from '../styles/Hamburger.styles'
import { selectUser, logout } from "../../features/userSlice";
import { toggleIsBlankModalOpen } from "../../features/beerSlice";

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
      <MyDrawer open={isDrawerOpen} onClose={toggleDrawer}>
        <SidebarContainerHam>
          <SidebarProfileHam>
            {user?.firstName} {user?.lastName}
          </SidebarProfileHam>
          <SidebarButtonsHam>
            <PrimaryButton label={"+ Add Tap"} onClick={() => dispatch(toggleIsBlankModalOpen())} />
            <PrimaryButton label={"My Taps"} onClick={() => switchDashboard("")} />
            <PrimaryButton label={"Friends' Taps"} onClick={() => switchDashboard("friendstaps")} />
            <PrimaryButton label={"Favorites"} onClick={() => switchDashboard("favorites")} />
            <PrimaryButton label={"Untapped"} onClick={() => switchDashboard("untapped")} />
            <br />
            <br />
            <PrimaryButton label={"Logout"} onClick={signout} />
          </SidebarButtonsHam>
          <BlankModal />
        </SidebarContainerHam>
      </MyDrawer>
    </HamburgerContainer>
  );
};

export default Hamburger;