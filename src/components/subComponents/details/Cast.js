import React, { useRef } from "react";
import { useSelector } from "react-redux";

import "../../../css/cast.css";
import LoadImage from "../common/LoadImage";
import avatar from "../../../images/avatar.png";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Cast = ({ data, loading }) => {
  const castContainer = useRef();
  const {
    url: { imageUrl, profileImageSize },
  } = useSelector((state) => state.home);

  const navigation = (dir) => {
    const container = castContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth - 15 )
        : container.scrollLeft + (container.offsetWidth - 15 );

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const displayImage = (path) => {
    const location = path ? imageUrl + profileImageSize?.[3] + path : avatar;
    return <LoadImage src={location} />;
  };

  const showData = () => (
    <div className="listItems" ref={castContainer}>
      {data?.map((item, i) => (
        <div className="listItem" key={i}>
          <div className="profileImg">{displayImage(item?.profile_path)}</div>
          <div className="name">{item?.name}</div>
          <div className="character">{item?.character}</div>
        </div>
      ))}
    </div>
  );

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection container">
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
      <div className="sectionHeading">Top Cast</div>
      {!loading ? (
        showData()
      ) : (
        <div className="castSkeleton">
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
        </div>
      )}
    </div>
  );
};

export default Cast;
