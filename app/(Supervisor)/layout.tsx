"use client";

import "../globals.css";

import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";

const itemDetails: sideBarItems[] = [
  { itemRoute: "profile", itemName: "Profile", itemIcon: "fa-user-tie" },
  {
    itemRoute: "manage-groups",
    itemName: "My Supervised Groups",
    itemIcon: "fa-people-group",
  },
  {
    itemRoute: "project-oversight",
    itemName: "Project Oversight",
    itemIcon: "fa-chart-simple",
  },
  { itemRoute: "proposals", itemName: "Proposal", itemIcon: "fa-file" },
  {
    itemRoute: "Supervisors",
    itemName: "Supervisor List",
    itemIcon: "fa-list",
  },
  {
    itemRoute: "manage-fyp",
    itemName: "Task Monitoring",
    itemIcon: "fa-paper-plane",
  },
  {
    itemRoute: "future",
    itemName: "Coming Soon",
    itemIcon: "fa-hourglass-start",
  },
];

const profileDetails: navItems = {
  dashboardName: "Supervisor DashBorad",
  profileName: "Zain Noreeen",
  profilePhoto: "/Noreen.jpg",
  notificationNumber: 4,
  gender: "F",
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
