import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useStateMethonds } from "./hooks/useStateMethods";
import { loadData } from "./utils/api";
const NavBar = lazy(() => import("./components/pages/NavBar"));
const Footer = lazy(() => import("./components/pages/Footer"));
const Details = lazy(() => import("./components/pages/Details"));
const SearchResult = lazy(() => import("./components/pages/SearchResult"));
const Explore = lazy(() => import("./components/pages/Explore"));
const Home = lazy(() => import("./components/pages/Home"));
const PageNotFound = lazy(() => import("./components/pages/PageNotFound"));

const App = () => {
  const { getApiConfiguration, getGenres } = useStateMethonds();
  const fetchApiConfig = async (endPoint) => {
    const data = await loadData(endPoint);
    const url = {
      imageUrl: data.images.secure_base_url,
      backDropImageSize: data.images.backdrop_sizes,
      posterImageSize: data.images.poster_sizes,
      profileImageSize: data.images.profile_sizes,
    };
    getApiConfiguration(url);
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((point) => {
      promises.push(loadData(`/genre/${point}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    getGenres(allGenres);
  };

  useEffect(() => {
    fetchApiConfig("/configuration");
    genresCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/:mediaType/:id" element={<Details />} />
            <Route exact path="/search/:query" element={<SearchResult />} />
            <Route exact path="/explore/:mediaType" element={<Explore />} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
