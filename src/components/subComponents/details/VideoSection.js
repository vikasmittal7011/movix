import React, { useRef, useState } from "react";

import "../../../css/videoSection.css";

import { PlayIcon } from "./PlayIcon";
import VideoPopup from "../common/VideoPopUp";
import LoadIamge from "../common/LoadImage";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const VideoSection = ({ data, loading }) => {
  const videoContainer = useRef();
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const navigation = (dir) => {
    const container = videoContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const loadingSkeleton = () => (
    <div className="skItem">
      <div className="thumb skeleton"></div>
      <div className="row skeleton"></div>
      <div className="row2 skeleton"></div>
    </div>
  );

  const showVideos = () => (
    <div className="videos" ref={videoContainer}>
      {data?.map((v, i) => (
        <div
          key={i}
          className="videoItem"
          onClick={() => {
            setShow(true);
            setVideoId(v.key);
          }}
        >
          <div className="videoThumbnail">
            <LoadIamge
              src={`https://img.youtube.com/vi/${v.key}/mqdefault.jpg`}
            />
            <PlayIcon />
          </div>
          <div className="videoTitle">{v.name}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="videosSection container">
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
      <div className="sectionHeading">Official Videos</div>
      {!loading ? (
        showVideos()
      ) : (
        <div className="videoSkeleton">
          {loadingSkeleton()}
          {loadingSkeleton()}
          {loadingSkeleton()}
          {loadingSkeleton()}
        </div>
      )}
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
