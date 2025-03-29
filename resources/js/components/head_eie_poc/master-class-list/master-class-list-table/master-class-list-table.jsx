import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

const MasterClassListTable = ({searchQuery}) => {
  const [data, setData] = useState([]); // State to hold the table data
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    classification: '',
    yearLevel: '',
    status: '',
    gender: '',
    reason: ''
  });

  // Fetch data from the backend
  useEffect(() => {
    fetch('/api/master-class-list')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      status: value,
      reason: value === "Enrolled" ? "" : formData.reason,
    });
  };

  const handleUpdateClick = (row) => {
    // Populate form data with selected row values
    const rowData = row.original; // Access the original row data
    setFormData({
      firstName: rowData.firstname || '',
      middleName: rowData.middlename || '',
      lastName: rowData.lastname || '',
      classification: rowData.classification || '',
      yearLevel: rowData.year_level || '',
      status: rowData.status || '',
      gender: rowData.gender || '',
      reason: rowData.reason_for_shift_or_drop || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/update-student/${formData.studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update data");
        return response.json();
      })
      .then((updatedData) => {
        // Update the table data with the updated row
        setData((prevData) =>
          prevData.map((item) =>
            item.master_class_list_id === updatedData.master_class_list_id
              ? updatedData
              : item
          )
        );
        setShowModal(false);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const filteredData = data.filter((row) => {
    const fullName = `${row.firstname} ${row.middlename ? row.middlename + '.' : ''} ${row.lastname}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      (row.status && row.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.reason_for_shift_or_drop && row.reason_for_shift_or_drop.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.classification && row.classification.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.email && row.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.year_level && row.year_level.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const columns = React.useMemo(
    () => [
      {
        Header: "No.",
        accessor: "master_class_list_id",
      },
      {
        Header: "Full Name",
        accessor: (row) =>
          `${row.firstname} ${row.middlename ? row.middlename + '.' : ''} ${
            row.lastname
          }`,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }) => {
          const status = cell.value;
          let statusStyle = {};

          if (status === "Dropped") {
            statusStyle = { color: "#EA0000", fontWeight: "bold" };
          } else if (status === "Shifted") {
            statusStyle = { color: "#18A0FB", fontWeight: "bold" };
          }

          return <div style={statusStyle}>{status}</div>;
        },
      },
      {
        Header: () => (
          <div style={{ whiteSpace: "nowrap", width: "100%" }}>Student ID</div>
        ),
        accessor: "student_id",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: () => (
          <div style={{ whiteSpace: "nowrap", width: "100%" }}>Year Level</div>
        ),
        accessor: "year_level",
      },
      {
        Header: "Classification",
        accessor: "classification",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: () => (
          <div style={{ whiteSpace: "nowrap" }}>Reason for Shift/Drop</div>
        ),
        accessor: "reason_for_shift_or_drop",
        Cell: ({ value }) => (
          <span>{value ? `- ${value}` : ""}</span> // Prepend '-' if there is content
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            style={{
              width: "88px",
              height: "35px",
              borderRadius: "12px",
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              fontSize: "15px",
              fontFamily: "Poppins",
              fontWeight: "600", // SemiBold
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleUpdateClick(row)}
          >
            Update
          </button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredData,
  });

  return (
    <>
      {/* Table */}
      <div
        style={{
          overflowY: "auto",
          height: "500px",
          marginLeft: "350px",
          marginRight: "35px",
          border: "1px solid #ddd",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          position: "relative",
        }}
      >
        <table
          {...getTableProps()}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderSpacing: "0",
            zIndex: 0,
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#F4F7FC",
                  zIndex: 1,
                }}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      padding: "25px 45px",
                      textAlign: "center",
                      borderBottom: "none",
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#F4F7FC",
                      zIndex: 2,
                    }}
                  >
                    {column.render("Header")}
                  </th>
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
                        padding: "15px 20px",
                        borderBottom: "1px solid #ddd",
                        borderLeft: "1px solid #ddd",
                        whiteSpace: "nowrap",
                        textAlign:
                          cell.column.id === "reason_for_shift_or_drop"
                            ? "left"
                            : "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        fontFamily: "Poppins",
                        fontWeight: "500",
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

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "880px",
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
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ display: "block", fontSize: "20px", color: "#383838" }}
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
                style={{ display: "block", fontSize: "20px", color: "#383838" }}
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
                style={{ display: "block", fontSize: "20px", color: "#383838" }}
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
                style={{ display: "block", fontSize: "20px", color: "#383838" }}
              >
                Classification:
              </label>
              <select
                name="classification"
                value={formData.classification}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              >
                <option value="Re-Enrollee">Re-Enrollee</option>
                <option value="Transferee">Transferee</option>
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ display: "block", fontSize: "20px", color: "#383838" }}
              >
                Year Level:
              </label>
              <select
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ display: "block", fontSize: "20px", color: "#383838" }}
              >
                Status:
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleStatusChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
              >
                <option value="Enrolled">Enrolled</option>
                <option value="Dropped">Dropped</option>
                <option value="Shifted">Shifted</option>
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ display: "block", fontSize: "20px", color: "#383838" }}
              >
                Reason for Shift/Drop:
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333333",
                }}
                disabled={formData.status === "Enrolled"}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  width: '100px',
                  height: '40px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  width: '100px',
                  height: '40px',
                  backgroundColor: '#6B6D76',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default MasterClassListTable;
