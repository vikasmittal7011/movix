import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

import { getApiConfiguration, getGenres } from "../store/homeSlice";

export const useStateMethonds = () => {
  return bindActionCreators(
    {
      getApiConfiguration,
      getGenres,
    },
    useDispatch()
  );
};
