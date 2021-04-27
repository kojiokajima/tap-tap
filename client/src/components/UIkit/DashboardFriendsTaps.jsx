import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectBeerList, setBeerList } from "../../features/beerSlice";
import { PrimaryCard } from "./index";

const DashboardFriendsTaps = () => {
  const dispatch = useDispatch();
  const beerList = useSelector(selectBeerList);

  useEffect(() => {
    axios.get("/allBeerData").then((response) => {
      console.log("RESPONSE.DATA: ", response.data);
      // dispatch(setBeerList(response.data))
      dispatch(setBeerList(response.data));
    });
  }, [dispatch]);

  return (
    <div>
      <h2 className="dashboard-title">Friends Taps</h2>
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

export default DashboardFriendsTaps;
