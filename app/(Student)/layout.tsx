"use client";

import "../globals.css";

import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";
import MessageHub from "@/Components/MessageHub";

const itemDetails: sideBarItems[] = [
  { itemRoute: "Home", itemName: "Home", itemIcon: "fa-house" },
  { itemRoute: "group", itemName: "Group", itemIcon: "fa-people-group" },
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
    itemIcon: "fa-tasks",
  },
  {
    itemRoute: "assignTask",
    itemName: "Assign Task",
    itemIcon: "fa-clipboard",
  },
];

const profileDetails: navItems = {
  dashboardName: "Student DashBoard",
  profileName: "Hamza Hussain",
  profilePhoto: "/Hamza.jpg",
  notificationNumber: 2,
  gender: "M",
};

// id will be fetched from contextAPI
const id: string = "12";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout relative">
      <NavBar profileDetails={profileDetails} id={id} />
      <SideBar itemDetails={itemDetails} />
      <main className="content">{children}</main>
      <MessageHub />
    </div>
  );
};

export default Layout;
