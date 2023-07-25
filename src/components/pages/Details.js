import React from "react";

import "../../css/details.css";
import DetailsBanner from "../subComponents/details/DetailsBanner";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id, mediaType } = useParams();
  const { data } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: creditData } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={creditData?.crew} />
    </div>
  );
};

export default Details;
