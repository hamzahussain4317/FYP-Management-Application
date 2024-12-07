"use client";
import { useContext, createContext, useState } from "react";

const AppDataContext = createContext<any>(undefined);

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<number>();
  return (
    <AppDataContext.Provider
      value={{ userId, setUserId}}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export const useAppWrapper = () => useContext(AppDataContext);
