import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryCard } from "./index";
import { setBeerList, selectBeerList } from '../../features/beerSlice'
import {ContentContainer, ContentTitle, BeerListContainer, BeerListItem} from '../styles/Dashboard.styles'


const DashboardFavorites = ({showModal}) => {
  const beerList = useSelector(selectBeerList);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("---------FAV USE EFFECT---------");
    axios.get("/FavoriteBeerData").then((response) => {
      console.log(response.data);
      dispatch(setBeerList(response.data));
    });
  }, []);

  return (
    // <div>
    <ContentContainer>

      {/* <h2 className="dashboard-title">My Taps</h2> */}
      <ContentTitle>Favorites</ContentTitle>
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

export default DashboardFavorites;
