"use client";
import { useContext, createContext, useState } from "react";

const AppDataContext = createContext<any>(undefined);

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<number>();
  const [userName , setUserName]=useState<string>();
  const [profilePic , setProfilePic]=useState<string>();
  return (
    <AppDataContext.Provider
      value={{ userId, setUserId , userName , setUserName , profilePic , setProfilePic}}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export const useAppWrapper = () => useContext(AppDataContext);
