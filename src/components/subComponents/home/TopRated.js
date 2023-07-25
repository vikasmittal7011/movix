import React, { useState } from "react";

import "../../../css/carsuselSection.css";
import SwitchTab from "../common/SwitchTab";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../common/Carousel";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("movie");

  const { data, loading } = useFetch(`/${endPoint}/top_rated`);

  const handleTabChnage = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <div className="container contentWrapper">
        <span className="carouselTitle">Top Rated</span>
        <SwitchTab
          data={["Movies", "TV Shows"]}
          onTabChange={handleTabChnage}
        />
      </div>
      <Carousel endPoint={endPoint} data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
