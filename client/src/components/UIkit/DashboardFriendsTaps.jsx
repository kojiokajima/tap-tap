import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectBeerList, setBeerList } from "../../features/beerSlice";
import { PrimaryCard } from "./index";

const DashboardFriendsTaps = ({showModal}) => {
  const dispatch = useDispatch();
  const beerList = useSelector(selectBeerList);

  useEffect(() => {
    axios.get("/allBeerData").then((response) => {
      console.log("RESPONSE(/allBeerData)", response.data);
      // dispatch(setBeerList(response.data))
      dispatch(setBeerList(response.data));
      console.log("beer list is ", beerList);
    });
  }, []);

  return (
    <div>
      <h2 className="dashboard-title">Friends Taps</h2>
      <div className="beerlist-container">
        {beerList.length > 1 &&
          beerList.map((beerItem, index) => (
            <div className="beerlist-item" key={index}>
              <PrimaryCard {...beerItem} onClick={() => showModal(beerItem)} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardFriendsTaps;
