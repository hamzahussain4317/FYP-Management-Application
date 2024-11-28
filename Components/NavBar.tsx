import Image from "next/image";
import Link from "next/link";

interface navBarProps {
  profileDetails: navItems;
}

const toggleNotificationSection = () =>{
  // Get the section by its ID
  const notificationList = document.getElementById('notificationList') as HTMLElement | null;

  // If the section exists, toggle the 'hidden' class
  if (notificationList) {
    notificationList.classList.toggle('hidden');
  }
}

export default function NavBar({ profileDetails }: navBarProps) {
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
              Hello Mr, <span>{profileName}</span>
            </p>
          ) : (
            <p>
              Hello Ms, <span>{profileName}</span>
            </p>
          )}
        </li>
        <li className="notification">
          <button type="button" className="icon-button">
            <span className="material-icons">
              <i className="fa-solid fa-bell fa-2x" onClick={toggleNotificationSection}></i>
            </span>
            <span className="icon-button__badge">{notificationNumber}</span>
            <div id="notificationList" className="hidden overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <ul className="realtive flex-col justify-center align-center space-y-2 w-full">
                <li>
                  <p>First Notififcation</p>                  
                </li>
                <li>                  
                  <p>Second Notification</p>
                </li>
                <li>
                  <p>Third Notfication</p>                  
                </li>
                <li>
                  <p>Third Notfication</p>                  
                </li>
                <li>
                  <p>Third Notfication</p>                  
                </li>
                <li>
                  <p>Third Notfication</p>                  
                </li>
                <li>
                  <p>Third Notfication</p>                  
                </li>
              </ul>
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
