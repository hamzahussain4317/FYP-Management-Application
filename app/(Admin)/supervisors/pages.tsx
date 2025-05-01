"use client";
import { useEffect, useState } from "react";
import { useAdminContext } from "@/context/AdminContext";
import ListSkeleton from "@/Components/ListSkeleton";
import SearchBar from "@/Components/SearchBar";

export default function Supervisors() {
  const {
    fetchDummySupervisors,
    supervisors,
    total,
    isLoading,
    error,
    handleSearch,
    handleFilterBy,
  } = useAdminContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSupervisors, setSelectedSupervisors] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchDummySupervisors(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(total / pageSize);
  const filters: supervisorFilterBy = {
    bySupervisorName: true,
    byGroupName: false,
    byProjectName: false,
    byStudentRoll: false,
  };
  return (
    <div className="wrapper mx-auto p-4 h-full flex flex-col justify-between items-center global-text-size">
      <div className="w-full flex items-center justify-between p-2 mb-6 space-x-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-light-text dark:text-dark-text">
          Students List
        </h1>
        <SearchBar
          onFilterBy={handleFilterBy}
          onSearch={handleSearch}
          filters={filters}
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 w-full text-center animate-fade-in">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="w-full bg-light-surface dark:bg-dark-surface shadow-soft rounded-lg p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-light-text dark:text-dark-text">
            Loading Students...
          </h1>
          <ListSkeleton length={pageSize} />
        </div>
      )}

      {/* No Students Found */}
      {!isLoading && supervisors.length === 0 && (
        <div className="text-gray-500 text-center my-10 animate-fade-in">
          No students found.
        </div>
      )}

      {/* Students List */}
      {!isLoading && supervisors.length > 0 && (
        <div className="w-full bg-light-surface dark:bg-dark-surface shadow-soft rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold global-text-size dark:text-dark-muted text-center">
              Total Students: {total}
            </p>
            <div className="flex items-center space-x-4">
              <select
                id="pageSize"
                value={`${selectAll ? "All" : "Selected Only"}`}
                onChange={(e) => {
                  if (e.target.value === "All") {
                    setSelectAll(true);
                    setSelectedSupervisors([]);
                  }
                  if (e.target.value === "Selected Only") {
                    setSelectAll(false);
                    setSelectedSupervisors([...selectedSupervisors]);
                  }
                }}
                className="border border-light-border dark:border-dark-border rounded-md p-2"
              >
                <option value={"All"}>All</option>
                <option value={"Selected Only"}>Selected Only</option>
              </select>
              <button>
                <span className="mr-2 px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-md hover:bg-light-primary dark:hover:bg-dark-primary disabled:opacity-50 transition-colors">
                  Delete
                </span>
                <span className="mr-2 px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-md hover:bg-light-primary dark:hover:bg-dark-primary disabled:opacity-50 transition-colors">
                  Register
                </span>
              </button>
            </div>
          </div>
          {/* Supervisors Table */}
          <table className="w-full border mb-4 table-auto">
            <thead>
              <tr className="bg-gray-100 dark:bg-dark-surface h-[4rem] text-left">
                <th className="w-[3rem] px-2"> {/* Checkbox */}</th>
                <th className="w-[7rem] px-4 text-dark-primary">
                  Supervisor Name
                </th>
                <th className="max-w-[200px] px-4 text-dark-primary">Email</th>
                <th className="max-w-[200px] px-4 text-dark-primary">
                  Groups Handled
                </th>
                <th className="px-4 text-dark-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {supervisors.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-light-border dark:border-dark-border h-[4.5rem] hover:bg-gray-50 dark:hover:bg-dark-muted transition"
                >
                  <td className="px-2 text-center">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={selectedSupervisors.includes(s.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSupervisors((prev) => [...prev, s.id]);
                        } else {
                          setSelectedSupervisors((prev) =>
                            prev.filter((id) => id !== s.id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="px-4 font-mono font-bold">{s.rollNumber}</td>
                  <td className="px-4 truncate font-bold">
                    {s.name.split(" ").slice(0, 2).join(" ")}
                  </td>
                  <td className="px-4 truncate font-bold">
                    {s.groupName.split(" ").slice(0, 2).join(" ")}
                  </td>
                  <td className="px-4 space-x-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition">
                      Delete
                    </button>
                    <button
                      className={`bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow transition ${
                        s.isRegistered
                          ? "cursor-not-allowed bg-dark-muted hover:bg-dark-muted"
                          : ""
                      } disabled={s.isRegistered}`}
                    >
                      Register
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <label
          htmlFor="pageSize"
          className="text-light-muted dark:text-dark-muted"
        >
          Page Size:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="mt-2 border border-light-border dark:border-dark-border rounded-md p-2"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex items-center justify-center gap-4 mt-8 mb-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-md hover:bg-light-primary dark:hover:bg-dark-primary disabled:opacity-50 transition-colors"
        >
          Prev
        </button>
        <span className="text-light-text dark:text-dark-text">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-md hover:bg-light-primary dark:hover:bg-dark-primary disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
