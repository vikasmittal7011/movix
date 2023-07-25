import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "../../../css/detailsBanner.css";
import useFetch from "../../../hooks/useFetch";
import Genres from "../common/Genres";
import CircleRating from "../common/CircleRating";
import LoadImage from "../common/LoadImage";
import PosterFallback from "../../../images/no-poster.png";

const DetailsBanner = ({ video, crew }) => {
  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const {
    url: { imageUrl, backDropImageSize, posterImageSize },
  } = useSelector((state) => state.home);

  const imagePath = imageUrl + backDropImageSize?.[3];

  const _genres = data?.genres?.map((g) => g.id);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const showPosterImg = (path) => {
    const imagePath = imageUrl + posterImageSize?.[6] + path;
    if (path) {
      return <LoadImage src={imagePath} className="posterImg" />;
    } else {
      return <LoadImage src={PosterFallback} className="posterImg" />;
    }
  };

  const showData = () => (
    <div>
      <div className="backdrop-img">
        <LoadImage src={imagePath + data?.backdrop_path} />
      </div>
      <div className="opacity-layer"></div>
      <div className="container">
        <div className="content">
          <div className="left">{showPosterImg(data?.poster_path)}</div>
          <div className="right">
            <div className="title">{`${data?.name || data?.title} (${dayjs(
              data?.release_date
            ).format("YYYY")})`}</div>
            <div className="subtitle">{data?.tagline}</div>
            <Genres gen={_genres} />
            <div className="row">
              <CircleRating rating={data?.vote_average} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const showSkeleton = () => (
    <div className="detailsBannerSkeleton">
      <div className="container">
        <div className="left skeleton"></div>
        <div className="right">
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="detailsBanner">
      {!loading ? showData() : showSkeleton()}
    </div>
  );
};

export default DetailsBanner;
