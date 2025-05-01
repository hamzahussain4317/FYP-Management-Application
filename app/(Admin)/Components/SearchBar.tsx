import { useAdminContext } from "@/context/AdminContext";
import React from "react";

export interface SearchBarProps {
  onFilterBy: (
    filter: groupFilterBy | studentsFilterBy | supervisorFilterBy
  ) => void;
  onSearch: (searchText: string) => void;
  filters?: groupFilterBy | studentsFilterBy | supervisorFilterBy | null;
}
const SearchBar = ({ onFilterBy, onSearch, filters }: SearchBarProps) => {
  const { filter, searchText, setFilter, setSearchText } = useAdminContext();

  setFilter(filters);
  setSearchText(searchText);

  return (
    <div className={`w-full flex-grow flex justify-center items-center p-4 `}>
      <div className={`${filters ? "" : "flex-grow"}`}>
        <input
          type="text"
          className="p-2 border rounded-l-md w-full"
          placeholder="Search groups.."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="px-4 py-2 text-black bg-dark-primary rounded-r-md md:min-w-[5rem]"
          onClick={() => onSearch(searchText)}
        >
          Search
        </button>
      </div>
      {filters && (
        <select
          className="p-2 border rounded-md "
          value={
            filter.byGroupName
              ? "byGroupName"
              : filter.byProjectName
              ? "byProjectName"
              : "byStudentRoll"
          }
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
    </div>
  );
};

export default SearchBar;
