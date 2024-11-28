"use client";

import "../globals.css";

import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";

const itemDetails: sideBarItems[] = [
  { itemRoute: "profile", itemName: "Profile", itemIcon: "fa-user-tie" },
  {
    itemRoute: "groups",
    itemName: "FYP Groups",
    itemIcon: "fa-people-group",
  },
  {
    itemRoute: "supervisors",
    itemName: "Supervisors",
    itemIcon: "fa-chart-simple",
  }
];

const profileDetails: navItems = {
  dashboardName: "Admin DashBoard",
  profileName: "My Admin",
  profilePhoto: "/Noreen.jpg",
  notificationNumber: 1,
  gender: "M",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <NavBar profileDetails={profileDetails} />
      <SideBar itemDetails={itemDetails} />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
