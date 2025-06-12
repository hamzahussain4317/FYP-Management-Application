import { useAdminContext } from "@/context/AdminContext";
import { useState, useEffect } from "react";
import React from "react";

export interface SearchBarProps {
  onFilterBy: (
    filter: groupFilterBy | studentsFilterBy | supervisorFilterBy
  ) => void;
  onSearch: (searchText: string) => void;
  filters?: groupFilterBy | studentsFilterBy | supervisorFilterBy | null;
}
const SearchBar = ({ onFilterBy, onSearch, filters }: SearchBarProps) => {
  const [filter, setFilter] = useState<
    groupFilterBy | studentsFilterBy | supervisorFilterBy | null
  >(filters || null);
  const [searchText, setSearchText] = useState<string>("");

  const getSelectedValue = () => {
    if (filter && "byGroupName" in filter) {
      return filter.byGroupName ? "byGroupName" : "byProjectName";
    } else if (filter && "byStudentRoll" in filter) {
      return "byStudentRoll";
    } else {
      return "";
    }
  };

  return (
    <div
      className={`w-full flex-grow flex justify-end items-center p-4 space-x-2 `}
    >
      {filters && (
        <select
          className="p-2 border rounded-md "
          value={getSelectedValue()}
          onChange={(e) =>
            onFilterBy(
              e.target.value === "byGroupName"
                ? {
                    byGroupName: true,
                    byProjectName: false,
                    byStudentRoll: false,
                  }
                : e.target.value === "byProjectName"
                ? {
                    byGroupName: false,
                    byProjectName: true,
                    byStudentRoll: false,
                  }
                : {
                    byGroupName: false,
                    byProjectName: false,
                    byStudentRoll: true,
                  }
            )
          }
        >
          <option value="byGroupName"> GroupName</option>
          <option value="byProjectName">ProjectName</option>
          <option value="byStudentRoll">StudentRoll</option>
        </select>
      )}
      <div
        className={`${
          filters ? "" : "flex-grow"
        } flex justify-beytween items-center `}
      >
        <input
          type="text"
          className="p-2 border rounded-l-md w-full"
          placeholder="Search groups.."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className=" w-auto px-4 py-2 text-black bg-dark-primary rounded-r-md md:min-w-[6rem] "
          onClick={() => onSearch(searchText)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
