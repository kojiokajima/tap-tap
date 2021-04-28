import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryCard, BeerModal } from "./index";
import { setBeerList, test, setCurrentBeer, toggleIsModalOpen, selectBeerList, selectCurrentBeer, selectIsModalOpen, setAndShowModal} from '../../features/beerSlice'

const DashboardFavorites = ({showModal}) => {
  const beerList = useSelector(selectBeerList);
  const currentBeer = useSelector(selectCurrentBeer);
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/FavoriteBeerData").then((response) => {
      dispatch(setBeerList(response.data));
    });
  }, []);

  return (
    <div>
      <h2 className="dashboard-title">Favorites</h2>
      <div className="beerlist-container">
        {beerList.length > 0 &&
          beerList.map((beerItem, index) => (
            <div className="beerlist-item" key={index}>
              {/* <PrimaryCard {...beerItem} onClick={() => showModal(beerItem)} /> */}
              <PrimaryCard {...beerItem} onClick={() => showModal(beerItem)} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardFavorites;
