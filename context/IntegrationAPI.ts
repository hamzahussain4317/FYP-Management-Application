import React, { createContext, useContext } from "react";

const AppContext = createContext({ hello: "world" });

export const AppDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allTasks, setAllTasks] = React.useState({ hello: "World" });

  return <AppContext.Provider value={allTasks}>{children}</AppContext.Provider>;
};
export default AppDataProvider;
export const useAppData = () => useContext(AppContext);
