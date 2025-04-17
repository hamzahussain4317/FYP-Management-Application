"use client";
import { useContext, createContext, useState, useEffect } from "react";
import socket from "@/utils/socket";
const AppDataContext = createContext<any>(undefined);

type Theme = "light" | "dark";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>();
  const [profilePic, setProfilePic] = useState<string>();
  const [socketState, setSocketState] = useState<any>(undefined);
  const [theme, setTheme] = useState<Theme>("light");
  const [notifications, setNotifications] = useState<Notifications[]>();

  useEffect(() => {
    setSocketState(socket);

    // get theme from LocalStorage
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {}, []);
  return (
    <AppDataContext.Provider
      value={{
        theme,
        setTheme,
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
