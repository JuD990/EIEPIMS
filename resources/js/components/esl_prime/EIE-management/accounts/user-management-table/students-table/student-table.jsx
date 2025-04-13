import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import "./student-table.css";
import UserManagementButtons from "../../user-management-buttons-students/user-management-button";

const UserManagementTable = ({searchQuery}) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    student_id: '',
    email: '',
    department: '',
    program: '',
    year_level: '',
  });

  const handleCancel = () => {
    setShowModal(false);
    setFormData({
      firstname: '',
      middlename: '',
      lastname: '',
      student_id: '',
      email: '',
      department: '',
      program: '',
      year_level: '',
    });
  };

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students");
        setStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Function to reset the password
  const handleResetPassword = async (studentId) => {
    try {
      const confirmReset = window.confirm(
        "Are you sure you want to reset the password for this student?"
      );
      if (!confirmReset) return;

      await axios.put(`/api/students/${studentId}/reset-password`);
      alert("Password reset successfully!");

      // Optionally refresh the student list or update the UI
      const updatedStudents = students.map((student) =>
      student.student_id === studentId ? { ...student, password: null } : student
      );
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again.");
    }
  };

  // Handle modal open with selected row data
  const handleUpdateClick = (student) => {
    setFormData({
      firstname: student.firstname,
      middlename: student.middlename || "",
      lastname: student.lastname,
      student_id: student.student_id,
      email: student.email,
      department: student.department,
      program: student.program,
      year_level: student.year_level,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put(`/api/update-students/${formData.student_id}`, formData);
      if (response.status === 200) {
        setStudents((prevStudents) =>
        prevStudents.map((student) =>
        student.student_id === formData.student_id ? { ...student, ...formData } : student
        )
        );
        setShowModal(false);
      } else {
        alert("Failed to update student data.");
      }
    } catch (error) {
      console.error("Error updating student data:", error);
      alert(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };


  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
  student.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.year_level.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: "No.",
        accessor: (_, index) => index + 1,
      },
      {
        Header: "Name",
        accessor: (row) =>
        `${row.firstname} ${row.middlename ? row.middlename + " " : ""}${row.lastname}`,
      },
      {
        Header: "Student ID",
        accessor: "student_id",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Year Level",
        accessor: "year_level",
      },
      {
        Header: "Program",
        accessor: "program",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="action-buttons">
          <button
          className="reset-pass-button"
          onClick={() => handleResetPassword(row.original.student_id)}
          >
          Reset Pass
          </button>
          <button
          className="edit-button"
          onClick={() => handleUpdateClick(row.original)}
          >
          Update
          </button>
          </div>
        ),
      },
    ],
    [students]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredStudents,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #333333",
  };

  return (
    <div>
    <div className="table-container">
    <table {...getTableProps()} className="non-sticky-table">
    <thead>
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
          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
        ))}
        </tr>
      );
    })}
    </tbody>
    </table>
    </div>

    {/* User Management Buttons Outside and Below the Table */}
    <div className="user-management-container">
    <UserManagementButtons />
    </div>

    {/* Modal */}
    {showModal && (
      <div className={`form-modal ${showModal ? 'show' : ''}`} onClick={handleCancel}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
      <h2>Update Credentials</h2>
      <form onSubmit={handleFormSubmit}>
      {[
        { name: "firstname", label: "First Name" },
        { name: "middlename", label: "Middle Name" },
        { name: "lastname", label: "Last Name" },
        { name: "student_id", label: "Student ID" },
        { name: "email", label: "Email" },
        { name: "department", label: "Department" },
        { name: "program", label: "Program" }
      ].map(({ name, label }) => (
        <div key={name} className="form-group">
        <label>{label}:</label>
        <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        />
        </div>
      ))}

      {/* Year Level Dropdown */}
      <div className="form-group">
      <label>Year Level:</label>
      <select name="year_level" value={formData.year_level} onChange={handleInputChange}>
      <option value="1st Year">1st Year</option>
      <option value="2nd Year">2nd Year</option>
      <option value="3rd Year">3rd Year</option>
      <option value="4th Year">4th Year</option>
      </select>
      </div>

      {/* Buttons */}
      <div className="button-container">
      <button type="button" className="cancel-button" onClick={handleCancel}>
      Cancel
      </button>
      <button type="submit" className="update-button" disabled={isSubmitting}>
      {isSubmitting ? "Updating..." : "Update"}
      </button>
      </div>
      </form>
      </div>
      </div>
    )}
    </div>
  );
};

export default UserManagementTable;
