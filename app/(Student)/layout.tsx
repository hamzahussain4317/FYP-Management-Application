"use client";

import "../globals.css";

import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";

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
    itemRoute: "future",
    itemName: "Coming Soon",
    itemIcon: "fa-hourglass-start",
  },
];

const profileDetails: navItems = {
  dashboardName: "Student DashBorad",
  profileName: "Hamza Hussain",
  profilePhoto: "/Hamza.jpg",
  notificationNumber: 2,
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

/* <li className="text-sm sm:text-base md:text-lg">
          <Link href="/Home" className={isActive("/Home") ? "active" : ""}>
            <i className="fa-solid fa-house fa-2x sm:fa-lg"></i>
            Home
          </Link>
        </li>
        <li className="text-sm sm:text-base md:text-lg">
          <Link href="/group" className={isActive("/group") ? "active" : ""}>
            <i className="fa-solid fa-people-group fa-2x sm:fa-lg"></i>
            Group
          </Link>
        </li>
        <li className="text-sm sm:text-base md:text-lg">
          <Link
            href="/project-oversight"
            className={isActive("/project-oversight") ? "active" : ""}
          >
            <i className="fa-solid fa-chart-simple fa-2x sm:fa-lg"></i>
            Project Oversight
          </Link>
        </li>
        <li className="text-sm sm:text-base md:text-lg">
          <Link
            href="/proposals"
            className={isActive("/proposals") ? "active" : ""}
          >
            <i className="fa-solid fa-file fa-2x sm:fa-lg"></i>
            Proposal
          </Link>
        </li>
        <li className="text-sm sm:text-base md:text-lg">
          <Link
            href="/Supervisors"
            className={isActive("/Supervisors") ? "active" : ""}
          >
            <i className="fa-solid fa-list fa-2x sm:fa-lg"></i>
            Supervisors
          </Link>
        </li>
        <li className="text-sm sm:text-base md:text-lg">
          <Link
            href="/manage-fyp"
            className={isActive("/manage-fyp") ? "active" : ""}
          >
            <i className="fa-solid fa-tasks fa-2x sm:fa-lg"></i>
            Task Monitoring
          </Link>
        </li>
        <li className="text-sm sm:text-base md:text-lg">
          <Link
            href="/manage-fyp"
            className={isActive("/manage-fyp") ? "active" : ""}
          >
            <i className="fa-solid fa-tasks fa-2x sm:fa-lg"></i>
            Task Monitoring
          </Link>
        </li>
        <li className="text-sm sm:text-base md:text-lg">
          <Link
            href="/manage-fyp"
            className={isActive("/manage-fyp") ? "active" : ""}
          >
            <i className="fa-solid fa-tasks fa-2x sm:fa-lg"></i>
            Task Monitoring
          </Link>
        </li> */
