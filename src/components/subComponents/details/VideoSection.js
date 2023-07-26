import React, { useState } from "react";

import "../../../css/videoSection.css";
// kg b: 12.45 2nd e: 1.30

import { PlayIcon } from "./PlayIcon";
import VideoPopup from "../common/VideoPopUp";
import LoadIamge from "../common/LoadImage";

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => (
    <div className="skItem">
      <div className="thumb skeleton"></div>
      <div className="row skeleton"></div>
      <div className="row2 skeleton"></div>
    </div>
  );

  const showVideos = () => (
    <div className="videos">
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
