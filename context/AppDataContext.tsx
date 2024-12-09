"use client";
import { useContext, createContext, useState, useEffect } from "react";
import socket from "@/utils/socket";
const AppDataContext = createContext<any>(undefined);

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>();
  const [profilePic, setProfilePic] = useState<string>();
  const [socketState, setSocketState] = useState<any>(undefined);
  const [notifications, setNotifications] = useState<Notifications[]>();

  useEffect(() => {
    setSocketState(socket);
  }, []);
  return (
    <AppDataContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        profilePic,
        setProfilePic,
        socketState,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export const useAppWrapper = () => useContext(AppDataContext);
