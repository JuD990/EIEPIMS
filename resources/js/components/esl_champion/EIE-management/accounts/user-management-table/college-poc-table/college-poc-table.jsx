import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import "./college-poc-table.css";

const UserManagementTable = ({ searchQuery }) => {
  const [collegePOCs, setCollegePOCs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    employee_id: "",
    email: "",
    department: "",
  });

  const handleCancel = () => {
    setShowModal(false);
    setFormData({
      firstname: "",
      middlename: "",
      lastname: "",
      employee_id: "",
      email: "",
      department: "",
    });
  };

  // Fetch College POCs data
  useEffect(() => {
    const fetchCollegePOCs = async () => {
      try {
        const response = await axios.get("/api/college-pocs");
        setCollegePOCs(response.data.data);
      } catch (error) {
        console.error("Error fetching College POCs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollegePOCs();
  }, []);

  // Function to reset the password
  const handleResetPassword = async (employeeId) => {
    try {
      const confirmReset = window.confirm(
        "Are you sure you want to reset the password for this College POC?"
      );
      if (!confirmReset) return;

      await axios.put(`/api/college-pocs/${employeeId}/reset-password`);
      alert("Password reset successfully!");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again.");
    }
  };

  // Handle modal open with selected row data
  const handleUpdateClick = (collegePOC) => {
    setFormData({
      firstname: collegePOC.firstname,
      middlename: collegePOC.middlename || "",
      lastname: collegePOC.lastname,
      employee_id: collegePOC.employee_id,
      email: collegePOC.email,
      department: collegePOC.department,
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
      const response = await axios.put(
        `/api/college-pocs/${formData.employee_id}`,
        formData
      );
      if (response.status === 200) {
        alert("College POC data updated successfully!");
        setShowModal(false);
        window.location.reload();
      } else {
        alert("Failed to update College POC data.");
      }
    } catch (error) {
      console.error("Error updating College POC data:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter College POCs based on search query
  const filteredCollegePOCs = (collegePOCs || []).filter((poc) =>
  [poc.firstname, poc.lastname, poc.employee_id, poc.email, poc.department]
  .some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
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
        Header: "Employee ID",
        accessor: "employee_id",
      },
      {
        Header: "Department",
        accessor: "department",
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
          onClick={() => handleResetPassword(row.original.employee_id)}
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
    [collegePOCs]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredCollegePOCs,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <div className="form-modal show" onClick={handleCancel}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
      <h2>Update Credentials</h2>
      <form onSubmit={handleFormSubmit}>
      {["firstname", "middlename", "lastname", "employee_id", "email", "department",].map(
        (field) => (
          <div key={field} style={{ marginBottom: "20px" }}>
          <label>{field.replace("_", " ").toUpperCase()}:</label>
          <input
          type="text"
          name={field}
          value={formData[field]}
          onChange={handleInputChange}
          />
          </div>
        )
      )}
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
