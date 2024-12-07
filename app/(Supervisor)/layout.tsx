"use client";

import MessageHub from "@/Components/MessageHub";
import "../globals.css";

import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";

import SupervisorContextProvider from "@/context/SupervisorContext";

const itemDetails: sideBarItems[] = [
  { itemRoute: "profile", itemName: "Profile", itemIcon: "fa-user-tie" },
  {
    itemRoute: "manage-groups",
    itemName: "My Supervised Groups",
    itemIcon: "fa-people-group",
  },
  {
    itemRoute: "proposal-requests",
    itemName: "Proposals Request",
    itemIcon: "fa-file",
  },
];

const profileDetails: navItems = {
  dashboardName: "Supervisor DashBoard",
  profileName: "Zain Noreeen",
  profilePhoto: "/Noreen.jpg",
  notificationNumber: 4,
  gender: "F",
};
// id will be fetched from contextAPI
const id: string = "12";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SupervisorContextProvider>
      <div className="layout">
        <NavBar profileDetails={profileDetails} id={id} />
        <SideBar itemDetails={itemDetails} />
        <main className="content">{children}</main>
        <MessageHub />
      </div>
    </SupervisorContextProvider>
  );
};

export default Layout;
