"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
    <aside className="sidebar p-4 bg-light-surface dark:bg-dark-surface shadow-soft h-full flex flex-col justify-between items-center">
      <div className="h-[8%] max-h-[6rem] flex justify-center items-center mb-8 ">
        <Image
          className="logo-image"
          src={"/logo_darkbg.png"}
          alt={""}
          priority={false}
          width={250}
          height={250}
          quality={100}
        ></Image>
      </div>
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
