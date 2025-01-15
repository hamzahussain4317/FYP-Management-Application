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
    <aside className="sidebar p-8">
      <ul className="sidebar-menu space-y-14 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {itemDetails.map((item, index) => (
          <li key={index} className="text-sm sm:text-base md:text-lg w-full">
            <Link
              href={`/${item.itemRoute}`}
              className={`${
                isActive(`/${item.itemRoute}`) ? "active" : ""
              } flex justify-start items-center space-x-3`}
            >
              <div className="flex justify-center w-[4rem] h-10">
                <i
                  className={`fa-solid ${item.itemIcon} fa-2x sm:fa-lg w-full h-full`}
                ></i>
              </div>
              <span className="">{item.itemName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
