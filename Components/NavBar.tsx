import { useAppWrapper } from "@/context/AppDataContext";
import Image from "next/image";
import NotificationList from "./NotificationList";

interface navBarProps {
  profileDetails: navItems;
  id: string;
}

const toggleNotificationSection = () => {
  const notificationList = document.getElementById(
    "notificationList"
  ) as HTMLElement | null;

  if (notificationList) {
    notificationList.classList.toggle("hidden");
  }
};


export default function NavBar({ profileDetails, id }: navBarProps) {
  const { userName , profilePic } = useAppWrapper();
  console.log(profilePic);

  const {
    dashboardName,
    profileName,
    profilePhoto,
    notificationNumber,
    gender,
  } = profileDetails;

  return (
    <nav className="stdNav">
      <div className="logo">
        {dashboardName} <span>(FYPM)</span>{" "}
      </div>
      <ul className="nav-links">
        <li className="stdName">
          {gender === "M" ? (
            <p>
              Hello Mr, <span>{userName}</span>
            </p>
          ) : (
            <p>
              Hello Ms, <span>{userName}</span>
            </p>
          )}
        </li>
        <li className="notification">
          <button type="button" className="icon-button">
            <span className="material-icons">
              <i
                className="fa-solid fa-bell fa-2x"
                onClick={toggleNotificationSection}
              ></i>
            </span>
            <span className="icon-button__badge">{notificationNumber}</span>
            <div
              id="notificationList"
              className="hidden overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            >
              <NotificationList receiverID={id} />
            </div>
          </button>
        </li>
        <li className="profile">
          <div className="profile-outer-div">
            <Image
              className="profile-pic"
              src={profilePhoto}
              alt={""}
              priority={false}
              width={45}
              height={45}
              quality={100}
            ></Image>
          </div>
        </li>
      </ul>
    </nav>
  );
}
