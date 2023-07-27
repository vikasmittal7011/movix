import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import LoadImage from "./LoadImage";
import PosterFallback from "../../../images/no-poster.png";

import "../../../css/carousel.css";
import CircleRating from "./CircleRating";
import Genres from "./Genres";

const Carousel = ({ data, loading, endPoint, title }) => {
  const carouselContainer = useRef();
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { posterImageSize, imageUrl } = url;

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 4)
        : container.scrollLeft + (container.offsetWidth + 4);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const showImage = (imgName) => {
    const imagePath = imgName
      ? imageUrl + posterImageSize?.[6] + imgName
      : PosterFallback;
    return <LoadImage src={imagePath} />;
  };

  const showData = () => (
    <div className="carouselItems" ref={carouselContainer}>
      {data?.map((item) => {
        return (
          <div
            key={item.id}
            className="carouselItem"
            onClick={() => {
              navigate(`/${item.media_type || endPoint}/${item.id}`);
            }}
          >
            <div className="posterBlock">
              {showImage(item.poster_path)}
              <CircleRating rating={item.vote_average.toFixed(1)} />
              <Genres gen={item?.genre_ids?.slice(0, 2)} />
            </div>
            <div className="textBlock">
              <span className="title">{item.title || item.name}</span>
              <span className="date">
                {dayjs(item.release_date || item.first_air_date).format(
                  "MMM D, YYYY"
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const showSkeleton = () => (
    <div className="skeletonItem">
      <div className="posterBlock skeleton">
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="carousel">
      <div className="container">
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => {
            navigation("left");
          }}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => {
            navigation("right");
          }}
        />
        {!loading ? (
          showData()
        ) : (
          <div className="loadingSkeleton">
            {showSkeleton()}
            {showSkeleton()}
            {showSkeleton()}
            {showSkeleton()}
            {showSkeleton()}
            {showSkeleton()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
