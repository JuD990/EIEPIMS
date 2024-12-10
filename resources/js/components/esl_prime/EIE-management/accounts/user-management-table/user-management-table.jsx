import React, { useState } from "react";
import { useTable } from "react-table";
import "./user-management-table.css";

const UserManagementTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Define columns
  const columns = React.useMemo(
    () => [
      {
        Header: "No.",
        accessor: "no",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Student ID",
        accessor: "studentId",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Year Level",
        accessor: "yearLevel",
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
            <button className="reset-pass-button">Reset Pass</button>
            <button className="edit-button" onClick={() => setShowModal(true)}>
              Update
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Sample data
  const data = React.useMemo(
    () => [
      {
        no: 1,
        name: "Name 1",
        studentId: "S123",
        department: "Computer Studies",
        yearLevel: "1st",
        program: "CS",
        email: "name1@example.com",
      },
      {
        no: 2,
        name: "Name 2",
        studentId: "S124",
        department: "Nursing",
        yearLevel: "2nd",
        program: "Nursing",
        email: "name2@example.com",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

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

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "auto",
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
          <form>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "20px",
                  color: "#383838",
                }}
              >
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "20px",
                  color: "#383838",
                }}
              >
                Middle Name:
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "20px",
                  color: "#383838",
                }}
              >
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "20px",
                  color: "#383838",
                }}
              >
                Student ID:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "20px",
                  color: "#383838",
                }}
              >
                Email:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "20px",
                  color: "#383838",
                }}
              >
                Department:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "20px",
                  color: "#383838",
                }}
              >
                Program:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
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
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  width: "100px",
                  height: "40px",
                  backgroundColor: "#0187F1",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
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

export default UserManagementTable;
