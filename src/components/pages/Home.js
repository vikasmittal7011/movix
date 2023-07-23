import React from "react";

import HeroBanner from "../subComponents/home/HeroBanner";
import "../../css/home.css";

const Home = () => {
  return (
    <div className="homePage container px-5">
      <HeroBanner />
    </div>
  );
};

export default Home;
