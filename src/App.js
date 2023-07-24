import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useFetch from "./hooks/useFetch";

import { useStateMethonds } from "./hooks/useStateMethods";
import NavBar from "./components/pages/NavBar";
import Footer from "./components/pages/Footer";
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
        <NavBar />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
