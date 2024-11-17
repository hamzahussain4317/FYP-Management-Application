"use client";

import "../globals.css";

import StdNavBar from "@/Components/StdNavBar";
import StdSideBar from "@/Components/StdSideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="student-layout">
      <StdNavBar />
      <StdSideBar />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
