import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import "./student-table.css";

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
    });
    setShowModal(true); // Show the modal when clicking "Update"
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
    setIsSubmitting(true); // Set to true when submitting

    try {
      const response = await axios.put(`/api/students/${formData.student_id}`, formData);
      if (response.status === 200) {
        alert("Student data updated successfully!");
        setShowModal(false); // Close the modal after successful update
        window.location.reload(); // Refresh the page after the update
      } else {
        alert("Failed to update student data.");
      }
    } catch (error) {
      console.error("Error updating student data:", error);
      // Handle specific errors from the API
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Display the error message from the backend
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false); // Reset once done
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
  student.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

    {/* Modal */}
    {showModal && (
      <div
      className={`form-modal ${showModal ? 'show' : ''}`}
      onClick={handleCancel}
      >
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
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
      First Name:
      </label>
      <input
      type="text"
      name="firstname"
      value={formData.firstname}
      onChange={handleInputChange}
      style={inputStyle}
      />
      </div>
      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Middle Name:
      </label>
      <input
      type="text"
      name="middlename"
      value={formData.middlename}
      onChange={handleInputChange}
      style={inputStyle}
      />
      </div>
      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Last Name:
      </label>
      <input
      type="text"
      name="lastname"
      value={formData.lastname}
      onChange={handleInputChange}
      style={inputStyle}
      />
      </div>
      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Student ID:
      </label>
      <input
      type="text"
      name="student_id"
      value={formData.student_id}
      onChange={handleInputChange}
      style={inputStyle}
      />
      </div>
      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Email:
      </label>
      <input
      type="text"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      style={inputStyle}
      />
      </div>
      <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
      Department:
      </label>
      <input
      type="text"
      name="department"
      value={formData.department}
      onChange={handleInputChange}
      style={inputStyle}
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
      style={inputStyle}
      />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
      <button
      type="button"
      style={{
        width: "100px",
        height: "40px",
        backgroundColor: "#DE0051",
        color: "#FFFFFF",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
      }}
      onClick={handleCancel}
      >
      Cancel
      </button>
      <button
      type="submit"
      disabled={isSubmitting}
      style={{
        width: "100px",
        height: "40px",
        backgroundColor: isSubmitting ? "#B0B0B0" : "#0187F1",
        color: "#FFFFFF",
        borderRadius: "12px",
        border: "none",
        cursor: isSubmitting ? "not-allowed" : "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s ease", // Smooth color transition
      }}
      onMouseOver={(e) => {
        if (!isSubmitting) e.target.style.backgroundColor = "#0171D3"; // Darker blue on hover
      }}
      onMouseOut={(e) => {
        if (!isSubmitting) e.target.style.backgroundColor = "#0187F1"; // Default color
      }}
      >
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
