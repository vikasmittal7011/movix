import React from "react";

import HeroBanner from "../subComponents/home/HeroBanner";
import "../../css/home.css";
import Trending from "../subComponents/home/Trending";
import Popular from "../subComponents/home/Popular";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
    </div>
  );
};

export default Home;
