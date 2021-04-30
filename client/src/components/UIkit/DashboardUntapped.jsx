import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryCard } from "./index";
import {ContentContainer, ContentTitle, BeerListContainer, BeerListItem} from '../styles/Dashboard.styles'
import { setBeerList, selectBeerList} from '../../features/beerSlice'


const DashboardUntapped = ({showModal}) => {
  const beerList = useSelector(selectBeerList);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/untappedBeerData").then((response) => {
      dispatch(setBeerList(response.data));
    });
  }, []);

  return (
    <ContentContainer>
      <ContentTitle>Untapped</ContentTitle>
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

export default DashboardUntapped;
