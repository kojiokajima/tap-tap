import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";

import { BeerModal, DashboardSide, DashboardFriendsTaps, DashboardMyTaps, DashboardFavorites, DashboardUntapped, Hamburger } from "./UIkit/index";
import {DashboardContainer} from './styles/Dashboard.styles'
import { selectUser, login, logout } from "../features/userSlice";
import { setCurrentBeer, selectBeerList, toggleIsModalOpen} from "../features/beerSlice";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const beerList = useSelector(selectBeerList)

  const showModal = (beerItem) => {
    dispatch(setCurrentBeer({
      id: beerItem.id,
      userId: beerItem.user_id,
      name: beerItem.name,
      brewery: beerItem.brewery,
      style: beerItem.style,
      memo: beerItem.memo,
      untapped: beerItem.untapped,
      favorite: beerItem.favorite
    }))
    dispatch(toggleIsModalOpen())
  }

  useEffect(() => {
    axios.get("/userAuth").then((response) => {
      if (response.data.loggedIn) {
        dispatch(
          login({
            uid: response.data.uid,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
          })
        );
      } else {
        dispatch(logout());
        history.push("/signin");
      }
    });

  }, []); 

  return (
    <DashboardContainer>
      <DashboardSide user={user} />
        <Switch>
          <Route exact path="/dashboard/:id" render={() => <DashboardMyTaps beerList={beerList} showModal={showModal} />} />
          <Route exact path="/dashboard/:id/friendstaps" render={() => <DashboardFriendsTaps beerList={beerList} showModal={showModal} />} />
          <Route exact path="/dashboard/:id/favorites" render={() => <DashboardFavorites beerList={beerList} showModal={showModal} />} />
          <Route exact path="/dashboard/:id/untapped" render={() => <DashboardUntapped beerList={beerList} showModal={showModal} />} />
        </Switch>

        <BeerModal />
        <Hamburger user={user} />

    </DashboardContainer>
  );
};

export default Dashboard;
