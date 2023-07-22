import React, { useEffect } from "react";

import { useStateMethonds } from "./hooks/useStateMethods";
import useFetch from "./hooks/useFetch";

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

  return <div>App</div>;
};

export default App;
