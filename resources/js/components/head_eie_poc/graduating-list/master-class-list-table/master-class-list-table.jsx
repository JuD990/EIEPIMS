import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

const MasterClassListTable = ({ searchQuery, selectedProgram, selectedYearLevel }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ candidate_for_graduating: '' });

  useEffect(() => {
    const employeeId = localStorage.getItem("employee_id");
    if (!employeeId) {
      console.error('Employee ID not found in localStorage');
      return;
    }

    fetch(`/api/master-class-list-department/${employeeId}`)
    .then((response) => response.ok ? response.json() : Promise.reject('Failed to fetch data'))
    .then((data) => {
      setData(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const handleGraduatingStatusChange = async (rowIndex, e) => {
    const newValue = e.target.value;
    const updatedData = [...data];
    const selectedStudent = updatedData[rowIndex];
    selectedStudent.candidate_for_graduating = newValue;

    setData(updatedData); // Update UI immediately

    try {
      const response = await fetch(`/api/update-grad-candidate/${selectedStudent.class_lists_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate_for_graduating: newValue,
        }),
      });

      if (response.ok) {
        window.location.reload(); // ✅ Refresh the page
      } else {
        console.error('Failed to update graduating status');
      }
    } catch (err) {
      console.error('Error updating graduating status:', err);
    }
  };

  const handleUpdateClick = (row) => {
    setFormData({
      ...row.original,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/master-class-list/${formData.class_lists_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updated = await response.json();
        setData((prevData) => prevData.map((item) =>
        item.class_lists_id === updated.class_lists_id ? updated : item
        ));
        setShowModal(false);
      } else {
        console.error('Failed to update');
      }
    } catch (err) {
      console.error('Error updating data:', err);
    }
  };

  const columns = React.useMemo(() => [
    { Header: "No.", accessor: "class_lists_id" },
    { Header: "Full Name", accessor: (row) => `${row.firstname} ${row.middlename} ${row.lastname}` },
    { Header: "Student ID", accessor: "student_id" },
    { Header: "Email", accessor: "email" },
    { Header: "Year Level", accessor: "year_level" },
    { Header: "Department", accessor: "department" },
    { Header: "Program", accessor: "program" },
    { Header: "Classification", accessor: "classification" },
    { Header: "Gender", accessor: "gender" },
  ], [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <>
    <div style={{ overflowY: "auto", height: "550px", marginLeft: "350px", marginRight: "35px", border: "1px solid #ddd", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", position: "relative" }}>
    <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()} style={{ position: "sticky", top: 0, background: "#F4F7FC" }}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()} style={{ padding: "25px 45px", textAlign: "center", borderBottom: "none", fontFamily: "Poppins", fontWeight: "500", backgroundColor: "#F4F7FC" }}>
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
          <td {...cell.getCellProps()} style={{ padding: "15px 20px", borderBottom: "1px solid #ddd", borderLeft: "1px solid #ddd", textAlign: "center", fontFamily: "Poppins", fontWeight: "500" }}>
          {cell.render("Cell")}
          </td>
        ))}
        </tr>
      );
    })}
    </tbody>
    </table>
    </div>
    </>
  );
};

export default MasterClassListTable;
