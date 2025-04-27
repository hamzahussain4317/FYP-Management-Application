"use client";
import { useEffect, useState } from "react";
import { useAdminContext } from "@/context/AdminContext";
import ListSkeleton from "@/Components/ListSkeleton";

export default function Students() {
  const { fetchDummyStudents, students, total, isLoading, error } =
    useAdminContext();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchDummyStudents(currentPage, pageSize);
  }, [currentPage]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="wrapper mx-auto p-4 h-full flex flex-col justify-between items-center global-text-size">
      {/* Error Message */}
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
      {!isLoading && students.length === 0 && (
        <div className="text-gray-500 text-center my-10 animate-fade-in">
          No students found.
        </div>
      )}

      {/* Students List */}
      {!isLoading && students.length > 0 && (
        <div className="w-full bg-light-surface dark:bg-dark-background shadow-soft rounded-xl p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-light-text dark:text-dark-text">
            Students List
          </h1>
          <p className="mb-6 text-light-muted dark:text-dark-muted text-center">
            Total Students: {total}
          </p>

          <ul className="flex flex-col gap-3 overflow-y-auto pr-2">
            {students.map((student: any) => (
              <li
                key={student.id}
                className=" w-full border border-light-border dark:border-dark-border p-4 rounded-md bg-light-background dark:bg-dark-background hover:shadow-md transition-shadow duration-300"
              >
                <span className="block font-semibold">{student.name}</span>
                <span className="block text-light-muted dark:text-dark-muted">
                  {student.email}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pagination Controls */}
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
