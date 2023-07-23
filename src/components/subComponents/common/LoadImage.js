import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LoadImage = ({ src, className }) => {
  return (
    <LazyLoadImage
      className={className || ""}
      src={src}
      alt={src}
      effect="blur"
    ></LazyLoadImage>
  );
};

export default LoadImage;
