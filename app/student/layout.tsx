"use client";

import "../globals.css";

import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";
import MessageHub from "@/Components/MessageHub";
import StudentContextProvider from "@/context/StudentContext";

const itemDetails: sideBarItems[] = [
  { itemRoute: "student/Home", itemName: "Home", itemIcon: "fa-house" },
  {
    itemRoute: "student/group",
    itemName: "Group",
    itemIcon: "fa-people-group",
  },
  {
    itemRoute: "student/project-oversight",
    itemName: "Project Oversight",
    itemIcon: "fa-chart-simple",
  },
  { itemRoute: "student/proposals", itemName: "Proposal", itemIcon: "fa-file" },
  {
    itemRoute: "student/Supervisors",
    itemName: "Supervisor List",
    itemIcon: "fa-list",
  },
  {
    itemRoute: "student/manage-fyp",
    itemName: "Task Monitoring",
    itemIcon: "fa-tasks",
  },
];

const isLeader = 0;
{
  isLeader
    ? itemDetails.push({
        itemRoute: "student/assignTask",
        itemName: "Assign Task",
        itemIcon: "fa-clipboard",
      })
    : itemDetails;
}

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
    <StudentContextProvider>
      <div className="layout relative">
        <NavBar profileDetails={profileDetails} id={id} />
        <SideBar itemDetails={itemDetails} />
        <main className="content">{children}</main>
        <MessageHub />
      </div>
    </StudentContextProvider>
  );
};

export default Layout;
