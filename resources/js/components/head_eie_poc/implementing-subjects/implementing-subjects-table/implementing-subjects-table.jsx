import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import axios from "axios";
import "./implementing-subjects-table.css";

const ImplementingSubjectsTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isLoadingPocs, setIsLoadingPocs] = useState(true);
  const [formData, setFormData] = useState({
    courseTitle: "",
    code: "",
    courseCode: "",
    semester: "",
    program: "",
    employeeId: "",
    assigned_poc: "",
    email: "",
    enrolledStudents: "",
  });

  const [pocs, setPocs] = useState([]);
  const [csvErrors, setCsvErrors] = useState([]);
  const employeeId = localStorage.getItem("employee_id");

  const fetchData = async () => {
    if (!employeeId) {
      setError("Employee ID is required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get("/api/implementing-subjects", {
        headers: { "employee_id": employeeId },
      });
      if (JSON.stringify(response.data) !== JSON.stringify(data)) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch POCs from the API
  useEffect(() => {
    const fetchFilteredPocs = async () => {
      try {
        const response = await axios.get("/api/filtered-pocs", {
          params: { employee_id: employeeId },
        });

        setPocs(response.data);
      } catch (error) {
        console.error("Error fetching filtered POCs:", error);
        setError("Failed to fetch POCs. Please try again later.");
      } finally {
        setIsLoadingPocs(false);
      }
    };

    fetchFilteredPocs();
  }, [employeeId]);

  // Polling to refresh data
  useEffect(() => {
    fetchData();
  }, []);

  // Handle form data input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`);
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
      assigned_poc: values.assigned_poc,
      enrolledStudents: values.enrolled_students,
    });
    setShowUpdateModal(true);
  };

  const [isUpdating, setIsUpdating] = useState(false);

  const handlePocChange = (e) => {
    const selectedPocId = e.target.value;

    if (selectedPocId === "") {
      // Reset to null when 'None' is selected
      setFormData({
        ...formData,
        assigned_poc: null,
        employee_id: null,
        email: null,
      });
    } else {
      const selectedPoc = pocs.find((poc) => poc.employee_id === selectedPocId);
      if (selectedPoc) {
        setFormData({
          ...formData,
          assigned_poc: `${selectedPoc.firstname} ${selectedPoc.lastname}`,
          employee_id: selectedPoc.employee_id,
          email: selectedPoc.email,
        });
      }
    }
  };

  // Log formData after it changes
  useEffect(() => {

  }, [formData]); // Triggered after formData state changes

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    // Prepare data for API submission
    const updatedFormData = {
      ...formData,
      assigned_poc: formData.assigned_poc && formData.assigned_poc.trim() !== "" ? formData.assigned_poc : null,
      employee_id: formData.employee_id && formData.employee_id.trim() !== "" ? formData.employee_id : null,
      email: formData.email && formData.email.trim() !== "" ? formData.email : null,
    };

    try {
      const response = await axios.put(
        `/api/update-implementing-subjects/${updatedFormData.courseCode}`,
        updatedFormData
      );
      if (response.status === 200) {
        console.log("✅ Successfully updated subject.");
        setShowUpdateModal(false);
        fetchData(); // Refresh data after successful update
      }
    } catch (error) {
      console.error("❌ Error updating subject:", error.response?.data || error);
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Course Title", accessor: "course_title" },
      { Header: "Code", accessor: "code" },
      { Header: "Course Code", accessor: "course_code" },
      { Header: "Semester", accessor: "semester" },
      { Header: "Department", accessor: "department" },
      { Header: "Program", accessor: "program" },
      { Header: "Employee ID", accessor: "employee_id" },
      { Header: "Assigned POC", accessor: "assigned_poc" },
      { Header: "Email", accessor: "email" },
      { Header: "Enrolled Students", accessor: "enrolled_students" },
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
          </div>
        ),
      },
    ],
    []
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
                    <th
                      {...column.getHeaderProps()}
                      className={
                        column.id === "course_title" ? "sticky-column" : ""
                      }
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
                        className={
                          cell.column.id === "course_title" ? "sticky-column" : ""
                        }
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

      {/* Show CSV upload errors */}
      {csvErrors.length > 0 && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <h4>CSV Validation Errors:</h4>
          <ul>
            {csvErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
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

          <div style={{ marginBottom: "20px" }}>
          <label
          htmlFor="assignedPoc"
          style={{
            display: "block",
            fontSize: "18px",
            color: "#383838",
            marginBottom: "8px",
            fontWeight: "600",
          }}
          >
          Re-Assign POC:
          </label>
          <select
          id="assignedPoc"
          name="assignedPoc"
          value={formData.employee_id || ""}
          onChange={handlePocChange}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            fontSize: "16px",
            fontFamily: "Arial, sans-serif",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          aria-label="Select Point of Contact"
          >
          <option value="">None</option>
          {pocs.map((poc) => (
            <option key={poc.employee_id} value={poc.employee_id}>
            {poc.firstname} {poc.lastname} ({poc.email})
            </option>
          ))}
          </select>
          </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#DE0051",
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
                  backgroundColor: "#0187f1",
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
