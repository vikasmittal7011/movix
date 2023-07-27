import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "../../css/searchResult.css";
import { loadData } from "../../utils/api";
import noResults from "../../images/no-results.png";
import ItemCard from "../subComponents/searchResult/ItemCard";
import Spinner from "../subComponents/common/Spinner";
import LoadImage from "../subComponents/common/LoadImage";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = async () => {
    setLoading(true);
    const response = await loadData(
      `/search/multi?query=${query}&page=${pageNum}`
    );
    setData(response);
    setPageNum((prev) => prev + 1);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    const response = await loadData(
      `/search/multi?query=${query}&page=${pageNum}`
    );
    if (data?.results) {
      setData({ ...data, results: [...data?.results, ...response?.results] });
    } else {
      setData(data);
    }
    setPageNum((prev) => prev + 1);
  };

  const showResults = () => (
    <div className="container">
      {data?.results?.length > 1 ? displayData() : showSk()}
    </div>
  );

  const displayData = () => (
    <>
      <div className="pageTitle">{`Search ${
        data?.results?.length > 1 ? "results" : "result"
      } of '${query}'`}</div>
      <InfiniteScroll
        className="content"
        dataLength={data?.results?.length || []}
        next={fetchNextPageData}
        hasMore={pageNum <= data?.total_pages}
        loader={<Spinner initial={"false"} />}
      >
        {data?.results?.map((item, i) => {
          if (item.media_type === "person") return null;
          return <ItemCard key={i} data={item} fromSearch={true} />;
        })}
      </InfiniteScroll>
    </>
  );

  const showSk = () => (
    <>
      <div className="text-center my-4">
        <div className="resultNotFound text-light">
          Sorry, Results not found!
        </div>
        <LoadImage src={noResults} width={"500px"} />
      </div>
    </>
  );

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && showResults()}
    </div>
  );
};

export default SearchResult;
