export default function StdNavBar(){
    return(
        <nav className="stdNav">
        <div className="logo">
          Student Dashboard <span>(FYPM)</span>{" "}
        </div>
        <ul className="nav-links">
          <li className="stdName">
            <p>
              Hello Mr, <span>Ghulam Hussain</span>
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
            <div>{/* profile logic */}</div>
          </li>
        </ul>
      </nav>
    )
}