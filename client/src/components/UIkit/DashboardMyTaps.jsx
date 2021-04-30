import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { PrimaryCard } from "./index";
import {ContentContainer, ContentTitle, BeerListContainer, BeerListItem} from '../styles/Dashboard.styles'
import { setBeerList, selectBeerList } from '../../features/beerSlice'

const DashboardMyTaps = ({showModal}) => {
  const beerList = useSelector(selectBeerList);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/beerData").then((response) => {
      dispatch(setBeerList(response.data));
    });
  }, []);

  return (
    <ContentContainer>
      <ContentTitle>My Taps</ContentTitle>
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

export default DashboardMyTaps;
