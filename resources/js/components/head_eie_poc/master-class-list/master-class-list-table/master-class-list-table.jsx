import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

const MasterClassListTable = ({
  searchQuery,
  selectedProgram,
  selectedYearLevel,
}) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    department: '',
    program: '',
    classification: '',
    yearLevel: '',
    status: '',
    gender: '',
    reason: '',
    candidate_for_graduating: '',
  });

  // Fetch data from the backend
  useEffect(() => {
    const employeeId = localStorage.getItem("employee_id");

    fetch(`/api/master-class-list?employee_id=${employeeId}`)
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

  const handleGraduatingStatusChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      candidate_for_graduating: value,
    });
  };

  const handleUpdateClick = (row) => {
    const rowData = row.original;
    setFormData({
      master_class_list_id: rowData.master_class_list_id, // ← include ID
      firstName: rowData.firstname || '',
      middleName: rowData.middlename || '',
      lastName: rowData.lastname || '',
      department: rowData.department || '',
      program: rowData.program || '',
      classification: rowData.classification || '',
      yearLevel: rowData.year_level || '',
      status: rowData.status || '',
      gender: rowData.gender || '',
      reason: rowData.reason_for_shift_or_drop || '',
      candidate_for_graduating: rowData.candidate_for_graduating || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/master-class-list/${formData.master_class_list_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          middlename: formData.middleName,
          lastname: formData.lastName,
          department: formData.department,
          program: formData.program,
          classification: formData.classification,
          year_level: formData.yearLevel,
          status: formData.status,
          gender: formData.gender,
          reason_for_shift_or_drop: formData.reason,
          candidate_for_graduating: formData.candidate_for_graduating,
        }),
      });

      if (response.ok) {
        const updated = await response.json();

        // Update local state for immediate UI feedback
        setData((prevData) =>
        prevData.map((item) =>
        item.master_class_list_id === updated.master_class_list_id ? updated : item
        )
        );
        setShowModal(false);
      } else {
        console.error('Failed to update');
      }
    } catch (err) {
      console.error('Error updating data:', err);
    }
  };

  const filteredData = data.filter((row) => {
    const fullName = `${row.firstname} ${row.middlename ? row.middlename + '.' : ''} ${row.lastname}`.toLowerCase();

    const programMatch = selectedProgram
    ? row.program?.toLowerCase() === selectedProgram.toLowerCase()
    : true;

    const yearLevelMatch = selectedYearLevel
    ? row.year_level?.toString().toLowerCase() === selectedYearLevel.toLowerCase()
    : true;

    return (
      (
        fullName.includes(searchQuery.toLowerCase()) ||
        row.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.program?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.reason_for_shift_or_drop?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.classification?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.candidate_for_graduating?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.year_level?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      programMatch && yearLevelMatch
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
          `${row.firstname} ${row.middlename} ${
            row.lastname}`,
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
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Program",
        accessor: "program",
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
          <span>{value ? `- ${value}` : ""}</span>
        ),
      },
      {
        Header: "Candidate for Graduating",
        accessor: "candidate_for_graduating",
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
              fontWeight: "600",
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
          height: "550px",
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
            Department:
            </label>
            <input
            type="text"
            name="department"
            value={formData.department}
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
            Program:
            </label>
            <input
            type="text"
            name="program"
            value={formData.program}
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
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
            Candidate for Graduating?:
            </label>
            <select
            name="candidate_for_graduating"
            value={formData.candidate_for_graduating}
            onChange={handleGraduatingStatusChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #333333",
            }}
            >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
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
