import Link from "next/link"
export default function stdSideBar(){
    return(
        <div className="sideBar">
        <ul className="sidebar-menu">
          <li>
          <i className="fa-solid fa-house fa-2x"></i>
            <Link href="#home">Home</Link>
          </li>
          <li>
          <i className="fa-solid fa-people-group fa-2x"></i>
            <Link href="#group">Group</Link>
          </li>
          <li>
          <i className="fa-solid fa-file fa-2x"></i>
            <Link href="#proposal">Proposal</Link>
          </li>
          <li>
          <i className="fa-solid fa-list fa-2x"></i>
            <Link href="#supervisors">Supervisors</Link>
          </li>
          <li>
          <i className="fa-solid fa-bars-progress fa-2x"></i>
            <Link href="#manage-fyp">Manage FYP</Link>
          </li>
        </ul>
      </div>
    )
}