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

  const isActive = (path: string) => currentPath === path;
  return (
    <div className="sideBar p-4">
      <ul className="sidebar-menu space-y-14 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {itemDetails.map((item, index) => (
          <li key={index} className="text-sm sm:text-base md:text-lg w-full">
            <Link
              href={`/${item.itemRoute}`}
              className={`${isActive(`/${item.itemRoute}`) ? "active" : ""}`}
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
