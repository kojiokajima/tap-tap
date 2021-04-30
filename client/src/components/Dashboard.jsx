import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";

import { selectUser, login, logout } from "../features/userSlice";
import { setCurrentBeer, selectBeerList, toggleIsModalOpen} from "../features/beerSlice";
import "./styles/Dashboard.styles.scss";
import { DashboardSide, DashboardFriendsTaps, DashboardMyTaps, DashboardFavorites, DashboardUntapped, Hamburger } from "./UIkit/index";
import {DashboardContainer} from './styles/Dashboard.styles'
import {BeerModal} from './UIkit/index'

const Dashboard = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const imageUrl =
    "https://images.unsplash.com/photo-1607611439230-fcbf50e42f7c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80";
  const beerList = useSelector(selectBeerList)

  const showModal = (beerItem) => {
    // console.log("BEER ITEM: ", beerItem.user_id); // --> id -> beerItem.id
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
    // dispatch(test())
  }

  useEffect(() => {
    console.log("DASHBOARD------");
    axios.get("/userAuth").then((response) => {
      // console.log("RESPONSE ", response.data);
      if (response.data.loggedIn) {
        console.log("YO LOGGEDIN");
        dispatch(
          login({
            uid: response.data.uid,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
          })
        );
        // console.log("USER IS ", user);
      } else {
        console.log("YO NOT LOGGEDIN");
        dispatch(logout());
        history.push("/signin");
      }
    });

  }, []); 

  return (
    <DashboardContainer>
    {/* <div className="dashboard"> */}
      <DashboardSide user={user} imageUrl={imageUrl} />

      {/* <ContentContainer> */}
      {/* <div className="content"> */}
        <Switch>
          {/* <Route exact path="/dashboard/:id(/yourtaps)?" render={() => <DashboardMyTaps beerList={beerList} />} /> */}
          <Route exact path="/dashboard/:id" render={() => <DashboardMyTaps beerList={beerList} showModal={showModal} />} />
          {/* <Route exact path="/dashboard/:id/friendstaps" component={DashboardFriendsTaps} /> */}
          <Route exact path="/dashboard/:id/friendstaps" render={() => <DashboardFriendsTaps beerList={beerList} showModal={showModal} />} />
          <Route exact path="/dashboard/:id/favorites" render={() => <DashboardFavorites beerList={beerList} showModal={showModal} />} />
          <Route exact path="/dashboard/:id/untapped" render={() => <DashboardUntapped beerList={beerList} showModal={showModal} />} />
        </Switch>
        <BeerModal />

        <Hamburger user={user} />

        
      {/* </ContentContainer> */}
    {/* </div> */}
    </DashboardContainer>
    // </div>
  );
};

export default Dashboard;
