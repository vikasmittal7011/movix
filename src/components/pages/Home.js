import React from "react";

import HeroBanner from "../subComponents/home/HeroBanner";
import "../../css/home.css";
import Trending from "../subComponents/home/Trending";
import Popular from "../subComponents/home/Popular";
import TopRated from "../subComponents/home/TopRated";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
