"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const logout = () => {
    const role = Cookies.get("role");

    Cookies.remove("role");
    Cookies.remove("token");
    setTimeout(() => {
      if (role === "admin") {
        router.push("/admin-login");
        // TODO: set route for the student login
      } else if (role === "student") {
        router.push("/login");
      } else {
        router.push("/login");
      }
    }, 1000);
  };

  const isActive = (path: string) => currentPath === path;
  return (
    <aside className="sidebar p-4 bg-light-surface dark:bg-dark-surface shadow-soft h-full flex flex-col justify-between items-center">
      <div className="h-[8%] max-h-[6rem] flex justify-center items-center mb-8">
        <Image
          className="logo-image"
          src={"/logo_darkbg.png"}
          alt={""}
          priority={false}
          width={250}
          height={250}
          quality={100}
        />
      </div>

      <ul className="sidebar-menu space-y-14 overflow-y-auto max-h-[80%] w-full flex-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {itemDetails.map((item, index) => (
          <li key={index} className="text-sm sm:text-base md:text-lg w-full">
            <Link
              href={`/${item.itemRoute}`}
              className={`${
                isActive(`/${item.itemRoute}`) ? "active" : ""
              } flex justify-start items-center space-x-3 global-text-size rounded-lg p-2 transition duration-300 ease-in-out`}
            >
              <div className="flex justify-center w-[4rem] h-10">
                <i
                  className={`fa-solid ${item.itemIcon} fa-2x sm:fa-lg w-full h-full`}
                />
              </div>
              <span className="">{item.itemName}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 w-full">
        <button
          onClick={logout}
          className="flex justify-start items-center space-x-3 p-2 w-full hover:bg-red-100 dark:hover:bg-red-800 rounded-lg transition duration-300 pointer-cursor"
        >
          <div className="flex justify-center w-[4rem] h-10">
            <i className="fa-solid fa-sign-out fa-2x sm:fa-lg w-full h-full" />
          </div>
          <span className="text-red-600 dark:text-red-300">Logout</span>
        </button>
      </div>
    </aside>
  );
}
