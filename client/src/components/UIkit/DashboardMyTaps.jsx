import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBeerList, selectBeerList } from "../../features/beerSlice";

import { PrimaryCard } from "./index";

const DashboardMyTaps = (props) => {
  console.log("PROPS.BEERLIST ", props.beerList);
  const beerList = useSelector(selectBeerList);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/beerData").then((response) => {
      // --> user's beer list
      console.log("RESRES ", response.data);
      dispatch(setBeerList(response.data));
      console.log("BEER LIST IS ", beerList);
    });
  }, []);

  return (
    <div>
      <h2 className="dashboard-title">My Taps</h2>
      <div className="beerlist-container">
        {beerList.length > 1 &&
          beerList.map((beerItem, index) => (
            <div className="beerlist-item" key={index}>
              <PrimaryCard {...beerItem} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardMyTaps;
