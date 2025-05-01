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

  const filters: groupFilterBy = {
    byGroupName: true,
    byProjectName: false,
    byStudentRoll: false,
  };

  return (
    <section className="wrapper mx-auto p-4 h-full flex flex-col justify-between items-center global-text-size">
      <div className="w-full flex items-center justify-between p-2 mb-6 space-x-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-light-text dark:text-dark-text">
          FYP Groups List
        </h1>
        <SearchBar
          onFilterBy={handleFilterBy}
          onSearch={handleSearch}
          filters={filters}
        />
      </div>
      {isLoading && (
        <div className="w-full rounded-lg p-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-light-text dark:text-dark-text">
            Loading Groups...
          </h1>
          <CardSkeleton length={10} />
        </div>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-2 overflow-y-auto">
        {!error.length && groups?.length ? (
          groups.map((group: GroupList, index: number) => {
            return (
              <li
                key={index}
                className={`rounded-lg dark:hover:border-dark-primary hover:scale-105 transition-all duration-300 border-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-background h-auto`}
              >
                <GroupList group={group} />
              </li>
            );
          })
        ) : (
          <div className="text-center text-red-500 font-bold">{error}. . .</div>
        )}
      </ul>
    </section>
  );
}
