import React from "react";

import "../../css/details.css";
import DetailsBanner from "../subComponents/details/DetailsBanner";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Cast from "../subComponents/details/Cast";

const Details = () => {
  const { id, mediaType } = useParams();
  const { data } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: creditData, loading: creditLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={creditData?.crew} />
      <Cast data={creditData?.cast} loading={creditLoading} />
    </div>
  );
};

export default Details;
