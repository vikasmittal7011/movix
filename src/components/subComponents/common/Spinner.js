import React from "react";
import loading from "../../../images/loading.gif";

const Spinner = ({ initial }) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-center`}
      style={{ height: initial && "550px" }}
    >
      <img
        src={loading}
        alt="loading"
        height={!initial && "140px"}
        className="m-4"
      />
    </div>
  );
};

export default Spinner;
