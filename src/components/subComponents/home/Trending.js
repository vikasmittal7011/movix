import React, { useState } from "react";

import "../../../css/trending.css";
import SwitchTab from "../common/SwitchTab";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../common/Carousel";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endPoint}`);

  const handleTabChnage = (tab) => {
    const endValue = tab?.toLowerCase();
    setEndPoint(endValue);
  };

  return (
    <div className="carouselSection">
      <div className="container contentWrapper">
        <span className="carouselTitle">Trending</span>
        <SwitchTab data={["Day", "Week"]} onTabChange={handleTabChnage} />
      </div>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
