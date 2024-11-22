"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function StdSideBar() {
  const CurrentPath = usePathname();
  const isActive = (path: string) => {
    return CurrentPath === path;
  };
  return (
    <div className="sideBar p-4">
      <ul className="sidebar-menu space-y-4 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <li className="text-sm sm:text-base md:text-lg">
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
      </ul>
    </div>
  );
}
