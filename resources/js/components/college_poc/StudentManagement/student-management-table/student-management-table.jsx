import React, { useState } from "react";
import { useTable } from "react-table";
import studentData from "./sample-data"; // Adjust the path as necessary

const StudentManagementTable = () => {
  const data = React.useMemo(() => studentData, []);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    classification: '',
    yearLevel: '',
    status: '',
    reason: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      status: value,
      reason: value === 'Enrolled' ? '' : prevData.reason // Disable the reason if 'Enrolled'
    }));
  };

  const handleUpdateClick = (row) => {
    setFormData({
      firstName: row.original.firstName || '',
      middleName: row.original.middleName || '',
      lastName: row.original.lastName || '',
      classification: row.original.classification || '',
      yearLevel: row.original.yearLevel || '',
      status: row.original.status || '',
      reason: row.original.reason || ''
    });
    setShowModal(true);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "No.",
        accessor: "no",
      },
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }) => {
          const status = cell.value;
          let statusStyle = {};
          
          if (status === "Dropped") {
            statusStyle = { color: '#EA0000', fontWeight: 'bold' };
          } else if (status === "Shifted") {
            statusStyle = { color: '#18A0FB', fontWeight: 'bold' };
          }
  
          return (
            <div style={statusStyle}>
              {status}
            </div>
          );
        },
      },
      {
        Header: "Student ID",
        accessor: "studentId",
      },
      {
        Header: "Year Level",
        accessor: "yearLevel",
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
        Header: "Reason for Shift/Drop",
        accessor: "reason",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            style={{
              width: '88px',
              height: '35px',
              borderRadius: '12px',
              backgroundColor: '#0187F1',
              color: '#FFFFFF',
              fontSize: '15px',
              fontFamily: 'Poppins',
              fontWeight: '600', // SemiBold
              border: 'none',
              cursor: 'pointer',
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div
        style={{
          overflowY: 'auto',
          height: '500px',
          marginLeft: '320px',
          marginRight: '35px',
          border: '1px solid #ddd',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          position: 'relative', // To keep the table positioned properly
        }}
      >
        <table
          {...getTableProps()}
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            borderSpacing: '0',
            zIndex: 0, // Ensure table stays below modal
          }}
        >
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} style={{ position: 'sticky', top: 0, background: '#F4F7FC', zIndex: 1 }}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      padding: '25px 25px',
                      textAlign: 'center',
                      borderBottom: 'none',
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#F4F7FC',
                      zIndex: 2, // Ensures the header cells stay on top of the body
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '15px 20px',
                        borderBottom: '1px solid #ddd',
                        borderLeft: '1px solid #ddd',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '450px',
                        fontFamily: 'Poppins',
                        fontWeight: '500',
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

      {showModal && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '800px',
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
          border: '1px solid #333333',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          padding: '20px',
          overflowY: 'auto',
          fontFamily: 'Poppins',
        }}>
          <h2 style={{
            fontSize: '32px',
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: '800',
            color: '#333333',
            marginBottom: '20px',
          }}>
            Update Credentials
          </h2>
          <form>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '20px', color: '#383838' }}>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333333' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '20px', color: '#383838' }}>Middle Name:</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333333' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '20px', color: '#383838' }}>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333333' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '20px', color: '#383838' }}>Classification:</label>
              <select
                name="classification"
                value={formData.classification}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333333' }}
              >
                <option value="Re-Enrollee">Re-Enrollee</option>
                <option value="Transferee">Transferee</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '20px', color: '#383838' }}>Year Level:</label>
              <select
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333333' }}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '20px', color: '#383838' }}>Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleStatusChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333333' }}
              >
                <option value="Enrolled">Enrolled</option>
                <option value="Dropped">Dropped</option>
                <option value="Shifted">Shifted</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '20px', color: '#383838' }}>Reason for Shift/Drop:</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="reason for shift/dropping"
                disabled={formData.status === 'Enrolled'}
                style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #333333' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  width: '100px',
                  height: '40px',
                  backgroundColor: '#DE0051',
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
                  backgroundColor: '#0187F1',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default StudentManagementTable;
