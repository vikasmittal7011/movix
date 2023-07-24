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

const Carousel = ({ data, loading }) => {
  const carouselContainer = useRef();
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { posterImageSize, imageUrl } = url;

  console.log(url);

  const navigation = (dir) => {};

  const showImage = (imgName) => {
    const imagePath = imageUrl
      ? imageUrl + posterImageSize[6] + imgName
      : PosterFallback;
    return <LoadImage src={imagePath} />;
  };

  const showData = () => (
    <div className="carouselItems">
      {data?.map((item) => {
        return (
          <div key={item.id} className="carouselItem">
            <div className="posterBlock">{showImage(item.poster_path)}</div>
            <div className="textBlock">
              <span className="title">{item.title || item.name}</span>
              <span className="date">
                {dayjs(item.release_date).format("MMM, D, YYYY")}
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
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => {
            navigation("left");
          }}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => {
            navigation("left");
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
