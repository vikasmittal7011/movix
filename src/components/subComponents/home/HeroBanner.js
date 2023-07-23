import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import LoadImage from "../common/LoadImage";
import { useNavigate } from "react-router-dom";
import "../../../css/heroBanner.css";

const HeroBanner = () => {
  const navigate = useNavigate();
  const [getBackgroundImage, setGetBackgroundImage] = useState();
  const [query, setQuery] = useState("");
  const { imageUrl, backDropImageSize } = useSelector(
    (state) => state.home.url
  );
  const { data } = useFetch("/movie/upcoming");

  const searchQuery = () => {
    navigate(`/navigate/${query}`);
  };

  const handleClick = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && query) {
      searchQuery();
    }
  };

  useEffect(() => {
    if (data) {
      const bg =
        imageUrl +
        backDropImageSize[1] +
        data?.results[Math.floor(Math.random() * data?.results?.length)]
          ?.backdrop_path;
      setGetBackgroundImage(bg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="">
      <div className="back-drop-img">
        {getBackgroundImage && <LoadImage src={getBackgroundImage} />}
      </div>
      <div className="hero-banner-content">
        <span className="title">Welcome.</span>
        <span className="title">
          Millons of movies & TV shows details are aviable.Explore Now
        </span>
        <div className="search-input">
          <input
            type="search"
            placeholder="Search for movies and TV shows..."
            value={query}
            onKeyUp={handleKeyUp}
            onChange={handleClick}
          />
          <button onClick={searchQuery}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
