import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../utils/axiosClient";
import * as XLSX from "xlsx";

const ITEMS_PER_PAGE = 5;

const AllEmployeePage = () => {
  const [emps, setEmps] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllEmployees = async () => {
    try {
      const response = await axiosClient.get("/all-emp", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setEmps(response.data.employees);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const deleteEmp = async (id) => {
    try {
      const response = await axiosClient.delete("/emp/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      toast.success(response.data.message);
      fetchAllEmployees();
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  // 🔎 SEARCH FILTER
  const filteredEmployees = useMemo(() => {
    return emps.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, emps]);

  // 📄 PAGINATION LOGIC
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 📊 EXPORT TO EXCEL
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "Employees.xlsx");
  };

  return (
    <div className="p-5">

      {/* SEARCH + EXPORT */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name, email, role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-1/3"
        />

        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="border w-full table-auto bg-blue-50 text-sm">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{emp.empId}</td>
                  <td className="border p-2">{emp.name}</td>
                  <td className="border p-2">{emp.role}</td>
                  <td className="border p-2">₹{emp.salary}</td>
                  <td className="border p-2">{emp.mobile}</td>
                  <td className="border p-2">{emp.email}</td>
                  <td className="border p-2">{emp.address}</td>
                  <td className="border p-2">
                    <img
                      src={emp.image}
                      alt=""
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        window.location.href = `/update-employee/${emp._id}`
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteEmp(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION BUTTONS */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllEmployeePage;

