'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function StdSideBar() {
  const CurrentPath = usePathname();
  const isActive = (path:string) => {
    return CurrentPath === path;
  };
  return (
    <div className="sideBar">
      <ul className="sidebar-menu">
        <li>
          <Link href="/Home" className={isActive('/Home')?"active":""}>
              <i className="fa-solid fa-house fa-2x"></i>
              Home
          </Link>
        </li>
        <li>
          <Link href="/group" className={isActive('/group')?"active":""}>
              <i className="fa-solid fa-people-group fa-2x"></i>
              Group
          </Link>
        </li>
        <li>
          <Link href="#proposal" className={isActive('/proposal')?"active":""}>
            <i className="fa-solid fa-file fa-2x"></i>
            Proposal
          </Link>
        </li>
        <li>
          <Link href="/supervisors"className={isActive('/supervisors')?"active":""}>
            <i className="fa-solid fa-list fa-2x"></i>
            Supervisors
          </Link>
        </li>
        <li>
          <Link href="/manage-fyp" className={isActive('/manage-fyp')?"active":""}>
            <i className="fa-solid fa-bars-progress fa-2x"></i>
            Manage FYP
          </Link>
        </li>
      </ul>
    </div>
  );
}
