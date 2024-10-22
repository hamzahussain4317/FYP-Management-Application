import Image from "next/image";
export default function StdNavBar() {
  return (
    <nav className="stdNav">
      <div className="logo">
        Student Dashboard <span>(FYPM)</span>{" "}
      </div>
      <ul className="nav-links">
        <li className="stdName">
          <p>
            Hello Mr, <span>Hamza Hussain</span>
          </p>
        </li>
        <li className="notification">
          <button type="button" className="icon-button">
            <span className="material-icons">
              <i className="fa-solid fa-bell fa-2x"></i>
            </span>
            <span className="icon-button__badge">2</span>
          </button>
        </li>
        <li className="profile">
          <div className="profile-outer-div">
            <Image
              className="profile-pic"
              src={"/Hamza.jpg"}
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
