import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import axios from 'axios';

const TableComponent = ({ course_code }) => {
  const [students, setStudents] = useState([]); // State to store students
  const [loading, setLoading] = useState(true); // Loading state

  // Log course_code to verify it's passed correctly
  useEffect(() => {
    console.log("Course Code received in Table:", course_code);
    if (course_code) {
      axios.get(`/api/epgf-scorecard/students?course_code=${course_code}`)
      .then((response) => {
        if (response.data.success) {
          setStudents(response.data.students); // Set the fetched students data
          setLoading(false);
        } else {
          console.error('No active students found');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
    }
  }, [course_code]);

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      { Header: 'No.', accessor: 'no' },
      { Header: 'Full Name', accessor: 'fullName' },
      { Header: 'Year Level', accessor: 'yearLevel' },
      { Header: 'PGF Average', accessor: 'pgfAverage' },
      { Header: 'Proficiency', accessor: 'proficiency' },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            width: '120px',
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="Reading">Reading</option>
          <option value="Writing">Writing</option>
          <option value="Listening">Listening</option>
          </select>
        ),
      },
      { Header: 'Consistency', accessor: 'consistency' },
      { Header: '', accessor: 'scoreConsistency' },
      { Header: 'Clarity', accessor: 'clarity' },
      { Header: '', accessor: 'scoreClarity' },
      { Header: 'Articulation', accessor: 'articulation' },
      { Header: '', accessor: 'scoreArticulation' },
      { Header: 'Intonation & Stress', accessor: 'intonationAndStress' },
      { Header: '', accessor: 'scoreIntonation&Stress' },
      { Header: 'Rating', accessor: 'pronunciationRating' },
      { Header: 'Accuracy', accessor: 'accuracy' },
      { Header: '', accessor: 'scoreAccuracy' },
      { Header: 'Clarity of Thought', accessor: 'clarityOfThought' },
      { Header: '', accessor: 'scoreClarityOfThought' },
      { Header: 'Syntax', accessor: 'syntax' },
      { Header: '', accessor: 'scoreSyntax' },
      { Header: 'Rating', accessor: 'grammarRating' },
      { Header: 'Quality of Response', accessor: 'qualityOfResponse' },
      { Header: '', accessor: 'scoreQualityOfResponse' },
      { Header: 'Detail of Response', accessor: 'detailOfResponse' },
      { Header: '', accessor: 'scoreDetailOfResponse' },
      { Header: 'Rating', accessor: 'fluencyRating' },
      {
        Header: 'Comment',
        accessor: 'comment',
        Cell: ({ value, row, column, updateData }) => (
          <textarea
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            width: '400px',
            height: '40px',
            padding: '4px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            resize: 'vertical',
          }}
          />
        ),
      },
    ],
    []
  );

  // Format student data for table (adding index and full name)
  const tableData = students.map((student, index) => ({
    no: index + 1,
    fullName: `${student.firstname} ${student.lastname}`,
    yearLevel: student.year_level,
    pgfAverage: student.epgf_average,
    proficiency: student.proficiency_level,
    type: student.type,
    consistency: student.consistency,
    clarity: student.clarity,
    articulation: student.articulation,
    intonationAndStress: student.intonation_and_stress,
    pronunciationRating: student.pronunciation_rating,
    accuracy: student.accuracy,
    clarityOfThought: student.clarity_of_thought,
    syntax: student.syntax,
    qualityOfResponse: student.quality_of_response,
    detailOfResponse: student.detail_of_response,
    fluencyRating: student.fluency_rating,
    comment: student.comment,
  }));

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: tableData },
    useSticky // Enable sticky plugin
  );

  // Function to update the cell data
  const updateData = (rowIndex, columnId, newValue) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][columnId] = newValue;
    // Update state with new data
    setStudents(updatedData);
    console.log('Updated data:', updatedData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
    style={{
      overflowX: 'auto',
      height: '500px',
      marginLeft: '320px',
      marginRight: '40px',
      border: '1px solid #ddd',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }}
    >
    <table
    {...getTableProps()}
    style={{
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: '0',
    }}
    >
    <thead>
    {headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column, index) => (
        <th
        {...column.getHeaderProps()}
        style={{
          backgroundColor: '#F4F7FC',
          color: '#383838',
          padding: '25px 20px',
          textAlign: 'center',
          borderBottom: 'none',
          fontFamily: 'Poppins',
          fontWeight: '500',
          position: 'sticky',
          top: 0,
          left: index < 2 ? `${index * 50}px` : 'auto',
          zIndex: index < 2 ? 3 : 2,
        }}
        >
        {column.render('Header')}
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
            textAlign: [
              "consistency",
              "clarity",
              "articulation",
              "intonationAndStress",
              "accuracy",
              "clarityOfThought",
              "syntax",
              "qualityOfResponse",
              "detailOfResponse"
            ].includes(cell.column.id)
            ? "left"  // Align left for the listed columns
            : "center", // Default to center for others
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
  );
};

export default TableComponent;
