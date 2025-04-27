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
  const { userName, profilePic } = useAppWrapper();

  const {
    dashboardName,
    profileName,
    profilePhoto,
    notificationNumber,
    gender,
  } = profileDetails;

  return (
    <nav className="navbar bg-light-surface dark:bg-dark-surface shadow-soft">
      <div className="flex justify-around items-center text-2xl font-bold p-4 h-full">
        {dashboardName}
      </div>
      <ul className="nav-links">
        <li className="profileName">
          {gender === "M" ? (
            <p className="text-lg">
              Hello Mr, <span>{profileName}</span>
            </p>
          ) : (
            <p>
              Hello Ms, <span>{profileName}</span>
            </p>
          )}
        </li>
        <li className="notification w-[3.5rem] h-[3.5rem]">
          <button type="button" className="icon-button w-full h-full">
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
          <Image
            className="profile-pic"
            src={profilePhoto}
            alt={""}
            priority={false}
            width={60}
            height={60}
            quality={100}
          ></Image>
        </li>
      </ul>
    </nav>
  );
}
