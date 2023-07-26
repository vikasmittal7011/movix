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
import { PlayIcon } from "./PlayIcon";
import VideoPopUp from "../common/VideoPopUp";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const {
    url: { imageUrl, backDropImageSize, posterImageSize },
  } = useSelector((state) => state.home);

  const imagePath = imageUrl + backDropImageSize?.[3];

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((c) => c.job === "Director");
  const writer = crew?.filter(
    (c) => c.job === "Writer" || c.job === "Screenplay" || c.job === "Story"
  );

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

  const showInfo = (title, value) => (
    <div className="infoItem">
      <span className="text bold">{title}: </span>
      <span className="text">{value}</span>
    </div>
  );

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
              <div className="rating">
                <CircleRating rating={data?.vote_average?.toFixed(1)} />
              </div>
              <div
                className="playbtn"
                onClick={() => {
                  setShow(true);
                  setVideoId(video?.key);
                }}
              >
                <PlayIcon />
                <span className="text">Watch Trailer</span>
              </div>
            </div>
            <div className="overview">
              <div className="heading">Overview</div>
              <div className="description">{data?.overview}</div>
            </div>
            <div className="info">
              {data?.status && showInfo("Status", data?.status)}
              {data?.release_date &&
                showInfo(
                  "Release Date",
                  dayjs(data?.release_date).format("MMM D, YYYY")
                )}
              {data?.runtime &&
                showInfo("Duration", toHoursAndMinutes(data?.runtime))}
            </div>
            {director?.length > 0 && (
              <div className="info">
                <span className="text bold">Director: </span>
                <span className="text">
                  {director.map((d, i) => (
                    <span key={i}>
                      {d.name}
                      {director.length - 1 !== i && ", "}
                    </span>
                  ))}
                </span>
              </div>
            )}
            {writer?.length > 0 && (
              <div className="info">
                <span className="text bold">Writer: </span>
                <span className="text">
                  {writer.map((w, i) => (
                    <span key={i}>
                      {w.name}
                      {writer.length - 1 !== i && ", "}
                    </span>
                  ))}
                </span>
              </div>
            )}
            {data?.created_by?.length > 0 && (
              <div className="info">
                <span className="text bold">Creator: </span>
                <span className="text">
                  {data?.created_by?.map((c, i) => (
                    <span key={i}>
                      {c.name}
                      {data?.created_by?.length - 1 !== i && ", "}
                    </span>
                  ))}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <VideoPopUp
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );

  const showSkeleton = () => (
    <div className="detailsBannerSkeleton">
      <div className="container d-md-flex">
        <div className="left skeleton px-5"></div>
        <div className="right px-5">
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
