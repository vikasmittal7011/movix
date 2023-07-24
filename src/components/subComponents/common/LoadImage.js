import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LoadImage = ({ src, className, height }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    console.log(windowWidth);
  }, [windowWidth]);

  return (
    <LazyLoadImage
      className={className || ""}
      src={src}
      alt={src}
      effect="blur"
      width="100%"
      height={height}
    ></LazyLoadImage>
  );
};

export default LoadImage;
