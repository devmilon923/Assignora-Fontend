import { useContext } from "react";
import { DataContext } from "../contextApi/DataContext";

const useData = () => {
  const context = useContext(DataContext);
  return context;
};
export default useData;
