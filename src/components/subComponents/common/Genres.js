import React from "react";

import "../../../css/genres.css";
import { useSelector } from "react-redux";

const Genres = ({ gen }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {gen.map((g) => {
        if (!genres[g]?.name) return null;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
