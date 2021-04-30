import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectBeerList, setBeerList } from "../../features/beerSlice";
import { PrimaryCard } from "./index";

import {ContentContainer, ContentTitle, BeerListContainer, BeerListItem} from '../styles/Dashboard.styles'

const DashboardFriendsTaps = ({showModal}) => {
  const dispatch = useDispatch();
  const beerList = useSelector(selectBeerList);

  useEffect(() => {
    console.log("---------FRIENDS USE EFFECT---------");
    axios.get("/allBeerData").then((response) => {
      // console.log("RESPONSE(/allBeerData)", response.data);
      // dispatch(setBeerList(response.data))
      console.log(response.data);
      dispatch(setBeerList(response.data));
      // console.log("beer list is ", beerList);
    });
  }, []);

  return (
    // <div>
    <ContentContainer>

      {/* <h2 className="dashboard-title">My Taps</h2> */}
      <ContentTitle>Friends' Taps</ContentTitle>
      {/* <div className="beerlist-container"> */}
      <BeerListContainer>

        {beerList.length > 0 &&
          beerList.map((beerItem, index) => (
            // <div className="beerlist-item" key={index}>
            <BeerListItem key={index}>
              {/* <PrimaryCard {...beerItem} onClick={() => showModal(beerItem)} /> */}
              <PrimaryCard {...beerItem} onClick={() => showModal(beerItem)} />
            {/* </div> */}
            </BeerListItem>
          ))}
      {/* </div> */}
      </BeerListContainer>
    {/* </div> */}
    </ContentContainer>
  );
};

export default DashboardFriendsTaps;
