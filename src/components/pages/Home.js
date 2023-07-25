import React from "react";

import HeroBanner from "../subComponents/home/HeroBanner";
import "../../css/home.css";
import Trending from "../subComponents/home/Trending";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
    </div>
  );
};

export default Home;
