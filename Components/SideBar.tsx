"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

interface SideBarItem {
  itemRoute: string;
  itemName: string;
  itemIcon: string;
}

interface SideBarProps {
  itemDetails: SideBarItem[];
}

export default function SideBar({ itemDetails }: SideBarProps) {
  const currentPath = usePathname();

  // const { id } = useParams();
  const id = 12;
  const leaderID = 13;
  const isActive = (path: string) => currentPath === path;
  const isLeader = () => id === leaderID;
  return (
    <div className="sideBar p-4">
      <ul className="sidebar-menu space-y-8 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {itemDetails.map((item) => (
          <li key={item.itemRoute} className="text-sm sm:text-base md:text-lg">
            <Link
              href={`/${item.itemRoute}`}
              // className={
              //   isLeader()
              //     ? isActive(`/${item.itemRoute}`)
              //       ? "active"
              //       : ""
              //     : "disabled"
              // }
              className="disabled"
            >
              <i className={`fa-solid ${item.itemIcon} fa-2x sm:fa-lg`}></i>
              <span className="ml-2">{item.itemName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
