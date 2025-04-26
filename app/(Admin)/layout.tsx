"use client";
import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";
import MessageHub from "@/Components/MessageHub";
import AdminContextProvider from "@/context/AdminContext";

const itemDetails: sideBarItems[] = [
  { itemRoute: "addUser", itemName: "Add User", itemIcon: "fa-user" },
  {
    itemRoute: "groups",
    itemName: "FYP Groups",
    itemIcon: "fa-people-group",
  },
  {
    itemRoute: "students",
    itemName: "Students",
    itemIcon: "fa-user-graduate",
  },
  {
    itemRoute: "supervisors",
    itemName: "Supervisors",
    itemIcon: "fa-chart-simple",
  },
];

const profileDetails: navItems = {
  dashboardName: "Admin DashBoard",
  profileName: "My Admin",
  profilePhoto: "/Noreen.jpg",
  notificationNumber: 1,
  gender: "M",
};

const id: string = "123";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminContextProvider>
      <div className="layout">
        <NavBar profileDetails={profileDetails} id={id} />
        <SideBar itemDetails={itemDetails} />
        <main className="">{children}</main>
        <MessageHub />
      </div>
    </AdminContextProvider>
  );
};

export default Layout;
