import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryCard, BeerModal } from "./index";
import { setBeerList, test, setCurrentBeer, toggleIsModalOpen, selectBeerList, selectCurrentBeer, selectIsModalOpen, setAndShowModal} from '../../features/beerSlice'
import {ContentContainer, ContentTitle, BeerListContainer, BeerListItem} from '../styles/Dashboard.styles'


const DashboardUntapped = ({showModal}) => {
  const beerList = useSelector(selectBeerList);
  const currentBeer = useSelector(selectCurrentBeer);
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/untappedBeerData").then((response) => {
      // --> user's beer list
      // console.log("RESPONSE(/beerData) ", response.data);
      dispatch(setBeerList(response.data));
      // console.log("BEER LIST IS ", beerList);
    });
  }, []);

  return (
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

export default DashboardUntapped;
