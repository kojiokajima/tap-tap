import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryCard, BeerModal } from "./index";
import { setBeerList, test, setCurrentBeer, toggleIsModalOpen, selectBeerList, selectCurrentBeer, selectIsModalOpen, setAndShowModal} from '../../features/beerSlice'

const DashboardMyTaps = ({showModal}) => {
  const beerList = useSelector(selectBeerList);
  const currentBeer = useSelector(selectCurrentBeer);
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  // const showModal = (beerItem) => {
  //   // console.log("BEER ITEM: ", beerItem);
  //   dispatch(setCurrentBeer({
  //     name: beerItem.name,
  //     brewery: beerItem.brewery,
  //     style: beerItem.style,
  //     memo: beerItem.memo,
  //     untapped: beerItem.untapped
  //   }))
  //   dispatch(toggleIsModalOpen())
  //   // dispatch(test())
  // }

  // console.log("YO BEER LIST ", beerList);

  useEffect(() => {
    axios.get("/beerData").then((response) => {
      // --> user's beer list
      // console.log("RESPONSE(/beerData) ", response.data);
      dispatch(setBeerList(response.data));
      // console.log("BEER LIST IS ", beerList);
    });
  }, []);

  return (
    <div>
      <h2 className="dashboard-title">My Taps</h2>
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

export default DashboardMyTaps;
