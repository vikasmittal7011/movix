import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useFetch from "./hooks/useFetch";

import { useStateMethonds } from "./hooks/useStateMethods";
const Home = lazy(() => import("./components/pages/Home"));

const App = () => {
  const { getApiConfiguration } = useStateMethonds();

  const { data } = useFetch("/configuration");
  useEffect(() => {
    if (data) {
      const url = {
        imageUrl: data.images.secure_base_url,
        backDropImageSize: data.images.backdrop_sizes,
        posterImageSize: data.images.poster_sizes,
        profileImageSize: data.images.profile_sizes,
      };
      getApiConfiguration(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
