"use client";
import { useAdminContext } from "@/context/AdminContext";
import GroupList from "../Components/GroupList";
import SearchGroup from "../Components/SearchGroup";
import { useEffect } from "react";

export default function FYPGroups() {
  const { filteredGroups, fetchAllGroupDetails, handleSearch, handleFilterBy } =
    useAdminContext();
  useEffect(() => {
    fetchAllGroupDetails();
  }, []);
  return (
    <section className="wrapper">
      <SearchGroup onFilterBy={handleFilterBy} onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <ul className="flex flex-col jusitfy-center space-y-6 w-full">
          {filteredGroups.map((group: GroupDetails, index: number) => {
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
          })}
        </ul>
      </div>
    </section>
  );
}
