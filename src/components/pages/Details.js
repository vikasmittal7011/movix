import React from "react";

import "../../css/details.css";
import DetailsBanner from "../subComponents/details/DetailsBanner";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Cast from "../subComponents/details/Cast";
import VideoSection from "../subComponents/details/VideoSection";
import Similar from "../subComponents/details/Similar";
import Recommendation from "../subComponents/details/Recommendation";

const Details = () => {
  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: creditData, loading: creditLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={creditData?.crew} />
      <Cast data={creditData?.cast} loading={creditLoading} />
      <VideoSection data={data?.results} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
