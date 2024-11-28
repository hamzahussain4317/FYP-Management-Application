import React, { useState } from "react";

const SearchGroup = ({
  onFilterBy,
  onSearch,
}: {
  onFilterBy: (filter: groupFilterBy) => void;
  onSearch: (searchText: string) => void;
}) => {
  const [filter, setFilter] = useState({
    byGroupName: 1,
    byProjectName: 0,
    byStudentRoll: 0,
  });
  const [searchText, setSearchText] = useState("");

  return (
    <div className="grid grid-cols-3">
      <div className="flex items-center col-span-2">
        <input
          type="text"
          className="p-2 border rounded-l-md w-full"
          placeholder="Search tasks.."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          //we have to implement fetchAll for onClick on input field
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
          onClick={() => onSearch(searchText)}
        >
          Search
        </button>
      </div>
      <select
        className="p-2 border rounded-md col-span-1"
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
        <option value="byStudentRoll">Low</option>
      </select>
    </div>
  );
};

export default SearchGroup;
