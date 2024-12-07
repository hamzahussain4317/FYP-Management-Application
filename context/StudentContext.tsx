"use client";
import { useContext, createContext, useState } from "react";

const StudentContext = createContext<any>(undefined);

export default function StudentContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [HomeDetails, setHomeDetails] = useState<ApiResponse>();
  return (
    <StudentContext.Provider value={{ HomeDetails, setHomeDetails }}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudentContext = () => useContext(StudentContext);
