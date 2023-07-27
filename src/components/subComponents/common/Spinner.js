import React from "react";
import loading from "../../../images/loading.gif";

const Spinner = ({ initial }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        className={`d-flex align-items-center justify-content-center`}
        style={{ height: initial && "550px" }}
      >
        <img src={loading} alt="loading" className="m-4" />
      </div>
    </div>
  );
};

export default Spinner;
