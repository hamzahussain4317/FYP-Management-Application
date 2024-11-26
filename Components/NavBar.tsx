import Image from "next/image";

interface navBarProps {
  profileDetails: navItems;
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
              <i className="fa-solid fa-bell fa-2x"></i>
            </span>
            <span className="icon-button__badge">{notificationNumber}</span>
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
