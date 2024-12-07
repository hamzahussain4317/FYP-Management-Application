"use client";
import { useAdminContext } from "@/context/AdminContext";
import GroupList from "../Components/GroupList";
import SearchGroup from "../Components/SearchGroup";
import { useEffect } from "react";

export default function FYPGroups() {
  const {
    filteredGroups,
    error,
    isLoading,
    fetchAllGroupDetails,
    handleSearch,
    handleFilterBy,
  } = useAdminContext();
  useEffect(() => {
    fetchAllGroupDetails();
  }, []);
  return (
    <section className="wrapper">
      <SearchGroup onFilterBy={handleFilterBy} onSearch={handleSearch} />
      <div
        className={`container mx-auto p-4 ${
          error.length ? "flex h-[500px] w-full" : ""
        } items-center justify-center`}
      >
        <ul className="flex flex-col justify-center space-y-6 w-full">
          {isLoading && !error && <p>Loading Groups List...</p>}
          {!error.length && filteredGroups.length ? (
            filteredGroups.map((group: GroupDetails, index: number) => {
              return (
                <li
                  key={index}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-150"
                  } rounded-lg p-2 hover:border-green-400  hover:scale-95 transition-all duration-300 border-2`}
                >
                  <GroupList group={group} />
                </li>
              );
            })
          ) : (
            <div className="text-center text-red-500 font-bold">
              {error}. . .
            </div>
          )}
        </ul>
      </div>
    </section>
  );
}
