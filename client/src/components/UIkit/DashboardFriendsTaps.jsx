import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { PrimaryCard } from "./index";
import {ContentContainer, ContentTitle, BeerListContainer, BeerListItem} from '../styles/Dashboard.styles'
import { selectBeerList, setBeerList } from "../../features/beerSlice";

const DashboardFriendsTaps = ({showModal}) => {
  const dispatch = useDispatch();
  const beerList = useSelector(selectBeerList);

  useEffect(() => {
    axios.get("/allBeerData").then((response) => {
      dispatch(setBeerList(response.data));
    });
  }, []);

  return (
    <ContentContainer>
      <ContentTitle>Friends' Taps</ContentTitle>
      <BeerListContainer>
        {beerList.length > 0 &&
          beerList.map((beerItem, index) => (
            <BeerListItem key={index}>
              <PrimaryCard {...beerItem} onClick={() => showModal(beerItem)} />
            </BeerListItem>
          ))
        }
      </BeerListContainer>
    </ContentContainer>
  );
};

export default DashboardFriendsTaps;
