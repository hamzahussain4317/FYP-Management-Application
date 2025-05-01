"use client";
import { useAdminContext } from "@/context/AdminContext";
import GroupList from "../Components/GroupList";
import SearchBar from "@/Components/SearchBar";
import CardSkeleton from "@/app/(Admin)/Components/CardSkeleton";
import { useEffect } from "react";

export default function FYPGroups() {
  const {
    fetchDummyGroups,
    groups,
    handleSearch,
    handleFilterBy,
    error,
    isLoading,
  } = useAdminContext();
  useEffect(() => {
    fetchDummyGroups();
  }, []);

  const groupFilterBy: groupFilterBy = {
    byGroupName: true,
    byProjectName: false,
    byStudentRoll: false,
  };

  return (
    <section className="wrapper">
      <div className="w-full flex items-center justify-between p-2 mb-6 space-x-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-light-text dark:text-dark-text">
          FYP Groups List
        </h1>
        <SearchBar
          onFilterBy={handleFilterBy}
          onSearch={handleSearch}
          filters={groupFilterBy}
        />
      </div>

      <div
        className={`container mx-auto p-4 ${
          error.length ? "flex h-[500px] w-full" : ""
        } items-center justify-center`}
      >
        <ul className="flex flex-col justify-center space-y-6 w-full">
          {isLoading && (
            <div className="w-full rounded-lg p-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-light-text dark:text-dark-text">
                Loading Groups...
              </h1>
              <CardSkeleton length={10} />
            </div>
          )}
          {!error.length && groups?.length ? (
            groups.map((group, index: number) => {
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
