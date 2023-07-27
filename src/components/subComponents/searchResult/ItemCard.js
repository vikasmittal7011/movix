import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "../../../css/itemCard.css";
import LoadImage from "../common/LoadImage";
import CircleRating from "../common/CircleRating";
import Genres from "../common/Genres";
import PosterFallback from "../../../images/no-poster.png";

const ItemCard = ({ data, fromSearch, mediaType }) => {
  const {
    url: { imageUrl, posterImageSize },
  } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? imageUrl + posterImageSize?.[6] + data.poster_path
    : PosterFallback;
  return (
    <div
      className="itemCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <LoadImage className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default ItemCard;
