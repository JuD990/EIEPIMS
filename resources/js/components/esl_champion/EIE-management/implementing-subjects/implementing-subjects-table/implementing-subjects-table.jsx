import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import axios from "axios";
import "./implementing-subjects-table.css";

const ImplementingSubjectsTable = ({ searchQuery, program, yearLevel, semester }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [formData, setFormData] = useState({
    courseTitle: "",
    code: "",
    courseCode: "",
    semester: "",
    program: "",
    activeStudents: "",
    enrolledStudents: "",
  });

  useEffect(() => {
    // Fetch data when component mounts or when filters/searchQuery change
    fetchData();
  }, [searchQuery, program, yearLevel, semester]);

  const employeeId = localStorage.getItem("employee_id");

  const fetchData = async () => {
    if (!employeeId) {
      setError("Employee ID is required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get("/api/esl-implementing-subjects", {
        headers: { employee_id: employeeId },
      });

      // Filter based on program, yearLevel, semester, and searchQuery
      const filteredData = response.data.filter((item) => {
        // Check if item matches the filters (program, yearLevel, semester)
        const matchesProgram = program ? item.program.toLowerCase() === program.toLowerCase() : true;
        const matchesYearLevel = yearLevel ? item.year_level.toLowerCase() === yearLevel.toLowerCase() : true;
        const matchesSemester = semester ? item.semester.toLowerCase() === semester.toLowerCase() : true;

        // Check if item matches the search query
        const matchesSearchQuery =
        searchQuery &&
        (item.course_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.semester.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesProgram && matchesYearLevel && matchesSemester && (!searchQuery || matchesSearchQuery);
      });

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (values) => {
    setFormData({
      courseTitle: values.course_title,
      code: values.code,
      courseCode: values.course_code,
      semester: values.semester,
      department: values.department,
      program: values.program,
      activeStudents: values.active_students,
      enrolledStudents: values.enrolled_students,
    });
    setShowUpdateModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/esl-update-implementing-subjects/${formData.courseCode}`,
        formData
      );
      if (response.status === 200) {
        console.log("✅ Successfully updated subject.");
        setShowUpdateModal(false);
        fetchData();
      }
    } catch (error) {
      console.error("❌ Error updating subject:", error.response?.data || error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Select",
        accessor: "select",
        Cell: ({ row }) => (
          <input
          type="checkbox"
          checked={selectedRows[row.id] || false}
          onChange={() =>
            setSelectedRows((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }))
          }
          />
        ),
      },
      { Header: "Course Title", accessor: "course_title" },
      { Header: "Code", accessor: "code" },
      { Header: "Course Code", accessor: "course_code" },
      { Header: "Semester", accessor: "semester" },
      { Header: "Department", accessor: "department" },
      { Header: "Program", accessor: "program" },
      { Header: "Assigned POC", accessor: "assigned_poc" },
      { Header: "Active Students", accessor: "active_students" },
      { Header: "Enrolled Students", accessor: "enrolled_students" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button className="action-button" onClick={() => handleUpdate(row.values)}>
          Update
          </button>
        ),
      },
    ],
    [selectedRows]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  useTable({ columns, data });

  return (
    <div style={{ margin: "20px" }}>
    {isLoading ? (
      <p>Loading data...</p>
    ) : error ? (
      <p style={{ color: "red" }}>{error}</p>
    ) : (
      <div className="table-wrapper">
      <table {...getTableProps()} className="data-table">
      <thead className="sticky-header">
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th {...column.getHeaderProps()}>{column.render("Header")}</th>
        ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
          {row.cells.map((cell) => (
            <td
            {...cell.getCellProps()}
            style={{
              textAlign: cell.column.id === "course_title" ? "left" : "center",
            }}
            >
            {cell.render("Cell")}
            </td>
          ))}

          </tr>
        );
      })}
      </tbody>
      </table>
      </div>
    )}
    {/* Modal */}
    {showUpdateModal && (
      <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "650px",
        backgroundColor: "#FFFFFF",
        borderRadius: "5px",
        border: "1px solid #333333",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        padding: "20px",
        overflowY: "auto",
        fontFamily: "Poppins",
      }}
      >
      <h2
      style={{
        fontSize: "32px",
        fontFamily: "Epilogue, sans-serif",
        fontWeight: "800",
        color: "#333333",
        marginBottom: "20px",
      }}
      >
      Update Credentials
      </h2>
      <form onSubmit={handleFormSubmit}>
      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Course Title:
      </label>
      <input
      type="text"
      name="courseTitle"
      value={formData.courseTitle}
      onChange={handleInputChange}
      style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #333333" }}
      />
      </div>
      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Code:
      </label>
      <input
      type="text"
      name="code"
      value={formData.code}
      onChange={handleInputChange}
      style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #333333" }}
      />
      </div>
      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Course Code:
      </label>
      <input
      type="text"
      name="courseCode"
      value={formData.courseCode}
      onChange={handleInputChange}
      style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #333333" }}
      />
      </div>
      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Semester:
      </label>
      <input
      type="text"
      name="semester"
      value={formData.semester}
      onChange={handleInputChange}
      style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #333333" }}
      />
      </div>

      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Program:
      </label>
      <input
      type="text"
      name="program"
      value={formData.program}
      onChange={handleInputChange}
      style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #333333" }}
      />
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
      <button
      type="button"
      onClick={() => setShowUpdateModal(false)}
      style={{
        padding: "10px 20px",
        backgroundColor: "#DC2626",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
        fontFamily: "Poppins",
      }}
      >
      Cancel
      </button>
      <button
      type="submit"
      style={{
        padding: "10px 20px",
        backgroundColor: "#6B6D76",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
        fontFamily: "Poppins",
      }}
      >
      Update
      </button>
      </div>
      </form>
      </div>
    )}
    </div>
  );
};

export default ImplementingSubjectsTable;
