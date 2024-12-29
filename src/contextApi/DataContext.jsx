import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [assignments, setAssignment] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <DataContext.Provider
      value={{ assignments, setAssignment, darkMode, setDarkMode }}
    >
      {children}
    </DataContext.Provider>
  );
};
