"use client";
import { useEffect, useState } from "react";
import { useAdminContext } from "@/context/AdminContext";

export default function Students() {
  const { fetchDummyStudents, students, total, isLoading, error } =
    useAdminContext();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const loadData = async () => {
      await fetchDummyStudents(currentPage, pageSize);
    };
    loadData();
  }, [currentPage]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoading && <div className="text-gray-500">Loading...</div>}
      {!isLoading && students.length === 0 && (
        <div className="text-gray-500">No students found.</div>
      )}

      {!isLoading && students.length > 0 && (
        <div className="bg-white shadow-md rounded p-4">
          <h1 className="text-2xl font-bold mb-4">Student List</h1>
          <p className="mb-4">Total Students: {total}</p>
          <ul className="mb-4">
            {students.map((student: any) => (
              <li key={student.id} className="border p-2 rounded mb-2">
                {student.name} - {student.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pagination Controls */}
      {/* <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <ul className="mb-4">
        {students.map((student: any) => (
          <li key={student.id} className="border p-2 rounded mb-2">
            {student.name} - {student.email}
          </li>
        ))}
      </ul> */}

      {/* Pagination Controls */}
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-1">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
