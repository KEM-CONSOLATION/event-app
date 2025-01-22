import Link from "next/link";
import React, { useState } from "react";

interface TableProps {
  columns: {
    id: string;
    label: string;
    format?: (value: string | number | boolean) => string;
  }[];
  data: Record<string, string | number | boolean>[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [petsAllowedFilter, setPetsAllowedFilter] = useState<boolean | null>(
    null
  );

  const filteredData = data.filter((row) => {
    const matchesSearch = columns.some((column) => {
      const cellValue = row[column.id];
      if (typeof cellValue === "string") {
        return cellValue.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (typeof cellValue === "number") {
        return String(cellValue).includes(searchTerm);
      }
      if (typeof cellValue === "boolean") {
        return String(cellValue).includes(searchTerm);
      }
      return false;
    });

    const matchesPetsAllowed =
      petsAllowedFilter === null || row.petsAllowed === petsAllowedFilter;

    return matchesSearch && matchesPetsAllowed;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:bg-none focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mr-2">Pets Allowed:</label>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={petsAllowedFilter === null ? "" : petsAllowedFilter.toString()}
          onChange={(e) =>
            setPetsAllowedFilter(
              e.target.value === "" ? null : e.target.value === "true"
            )
          }
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.id}
                className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={String(row.id)} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="border border-gray-200 px-4 py-2 text-sm text-gray-700"
                >
                  <Link href={`events/${row.id}`}>
                    {column.format
                      ? column.format(row[column.id])
                      : row[column.id]}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
