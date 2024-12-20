import React, { useState, useRef, useEffect } from "react";
import { useTable } from "react-table";
import axios from "axios";
import Papa from "papaparse";
import "./implementing-subjects-table.css";
import sampleData from './sample-data.js';

const ImplementingSubjectsTable = () => {
  const [csvData, setCsvData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    courseTitle: '',
    code: '',
    courseCode: '',
    description: '',
    semester: '',
    department: '',
    program: '',
    assignedPOC: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
  });

  const columns = React.useMemo(
    () => [
      { Header: "Course Title", accessor: "courseTitle" },
      { Header: "Code", accessor: "code" },
      { Header: "Course Code", accessor: "courseCode" },
      { Header: "Description", accessor: "description" },
      { Header: "Semester", accessor: "semester" },
      { Header: "Department", accessor: "department" },
      { Header: "Program", accessor: "program" },
      { Header: "Assigned POC", accessor: "assignedPOC", Cell: ({ row }) => {
        const assignedPOC = row.original;
        return `${assignedPOC.firstName} ${assignedPOC.lastName}`;
      }},
      { Header: "Employee ID", accessor: "employeeID" },
      { Header: "Email", accessor: "email" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="action-button"
              onClick={() => handleUpdate(row.values)}
            >
              Update
            </button>
            <button
              className="action-button"
              onClick={() => handleClassList(row.values)}
            >
              Class List
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => sampleData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleUpdate = (rowData) => {
    setFormData({
      firstName: rowData.firstName,
      middleName: rowData.middleName,
      lastName: rowData.lastName,
      courseTitle: rowData.courseTitle,
      code: rowData.code,
      courseCode: rowData.courseCode,
      description: rowData.description,
      semester: rowData.semester,
      department: rowData.department,
      program: rowData.program,
      assignedPOC: `${rowData.firstName} ${rowData.lastName}`,
      employeeID: rowData.employeeID,
      email: rowData.email,
    });
    setShowModal(true);
  };

  const handleClassList = () => {
    document.getElementById("csv-upload").click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
          alert("CSV File Parsed Successfully");
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Updated Successfully");
    setShowModal(false);
  };

  // Handle clicks outside the modal or dropdown to close the modal
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        modalRef.current && !modalRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        dropdownButtonRef.current && !dropdownButtonRef.current.contains(e.target)
      ) {
        setShowModal(false);  // Close modal if click is outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

    // Fetch College POCs from the backend
    const fetchCollegePOCs = async () => {
      try {
        const response = await axios.get("/api/college-pocs");  // API endpoint
        setCollegePOCs(response.data);
      } catch (error) {
        console.error("Error fetching College POCs:", error);
      }
    };

    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    const dropdownRef = useRef(null);
    const dropdownButtonRef = useRef(null);
  
    const toggleDropdown = (e) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    };

    useEffect(() => {
      if (isOpen) {
        fetchCollegePOCs();  // Fetch data when dropdown is opened
      }
    }, [isOpen]);

  return (
    <div style={{ margin: "20px" }}>
      <div className="table-wrapper">
        <table {...getTableProps()} className="data-table">
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

      <input
        type="file"
        id="csv-upload"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

{showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "800px",
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
              <label
                style={{
                  display: "block",
                  fontSize: "20px",
                  color: "#383838",
                }}
              >
                Course Title:
              </label>
              <input
                type="text"
                name="courseTitle"
                value={formData.courseTitle}
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
                Code:
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
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
                Course Code:
              </label>
              <input
                type="text"
                name="code"
                value={formData.courseCode}
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
                Description:
              </label>
              <input
                type="text"
                name="code"
                value={formData.description}
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
                Semester:
              </label>
              <input
                type="text"
                name="code"
                value={formData.semester}
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
                name="code"
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
                name="code"
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


           
      <label style={{ display: "block", fontSize: "20px", color: "#383838" }}>
        Re-Assign POC:
      </label>

       {/*Dropdown*/}

    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
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

export default ImplementingSubjectsTable;
