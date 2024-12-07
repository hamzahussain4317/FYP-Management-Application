import { useContext, createContext } from "react";
import { useState } from "react";

const SupervisorContext = createContext<any>(undefined);

export default function SupervisorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, SetProfile] = useState<>(undefined);
  <SupervisorContext.Provider value={}>{children}</SupervisorContext.Provider>;
}

export const useSupervisorContext = () => useContext(SupervisorContext);
