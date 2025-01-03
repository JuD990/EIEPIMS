import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const TableComponent = ({ course_code }) => {
  const [students, setStudents] = useState([]); // State to store students
  const [loading, setLoading] = useState(true); // Loading state
  const [pronunciationId, setPronunciationId] = useState(null);
  const [pronunciations, setPronunciations] = useState([]);

  // Fetch the active pronunciation ID from the backend
  useEffect(() => {
    const fetchActivePronunciation = async () => {
      try {
        const response = await axios.get('/active-pronunciation-id');
        setPronunciationId(response.data.pronunciation_id);
      } catch (error) {
        console.error('Error fetching active pronunciation ID:', error);
      }
    };

    fetchActivePronunciation();
  }, []);

  // Fetch the pronunciations based on the active pronunciation ID
  useEffect(() => {
    if (pronunciationId) {
      const fetchPronunciations = async () => {
        try {
          const response = await axios.get(`/api/pronunciations/${pronunciationId}`);
          setPronunciations(response.data);
        } catch (error) {
          console.error('Error fetching pronunciations:', error);
        }
      };

      fetchPronunciations();
    }
  }, [pronunciationId]);


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
            width: '100px',
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
      {
        Header: 'Consistency', accessor: 'consistency',

        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          </select>
        ),
      },
      { Header: '', accessor: 'scoreConsistency', },
      { Header: 'Clarity', accessor: 'clarity',
        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          </select>
        ),
      },
      { Header: '', accessor: 'scoreClarity' },
      { Header: 'Articulation', accessor: 'articulation',
        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          </select>
        ),
      },
      { Header: '', accessor: 'scoreArticulation' },
      { Header: 'Intonation & Stress', accessor: 'intonationAndStress',
        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          </select>
        ),
      },
      { Header: '', accessor: 'scoreIntonation&Stress' },
      { Header: 'Rating', accessor: 'pronunciationRating' },
      { Header: 'Accuracy', accessor: 'accuracy',
        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          </select>
        ),
      },
      { Header: '', accessor: 'scoreAccuracy' },
      { Header: 'Clarity of Thought', accessor: 'clarityOfThought',
        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          </select>
        ),
      },
      { Header: '', accessor: 'scoreClarityOfThought' },
      { Header: 'Syntax', accessor: 'syntax',
        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          </select>
        ),
      },
      { Header: '', accessor: 'scoreSyntax' },
      { Header: 'Rating', accessor: 'grammarRating', },
      { Header: 'Quality of Response', accessor: 'qualityOfResponse',
        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          </select>
        ),
      },
      { Header: '', accessor: 'scoreQualityOfResponse' },
      { Header: 'Detail of Response', accessor: 'detailOfResponse',
        Cell: ({ value, row, column, updateData }) => (
          <select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
          }}
          >
          <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          </select>
        ),
      },
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
    scoreConsistency: student.score_consistency, // Add the score for consistency
    clarity: student.clarity,
    scoreClarity: student.score_clarity, // Add the score for clarity
    articulation: student.articulation,
    scoreArticulation: student.score_articulation, // Add the score for articulation
    intonationAndStress: student.intonation_and_stress,
    scoreIntonationAndStress: student.score_intonation_and_stress, // Add the score for intonation and stress
    pronunciationRating: student.pronunciation_rating,
    accuracy: student.accuracy,
    scoreAccuracy: student.score_accuracy, // Add the score for accuracy
    clarityOfThought: student.clarity_of_thought,
    scoreClarityOfThought: student.score_clarity_of_thought, // Add the score for clarity of thought
    syntax: student.syntax,
    scoreSyntax: student.score_syntax, // Add the score for syntax
    qualityOfResponse: student.quality_of_response,
    scoreQualityOfResponse: student.score_quality_of_response, // Add the score for quality of response
    detailOfResponse: student.detail_of_response,
    scoreDetailOfResponse: student.score_detail_of_response, // Add the score for detail of response
    fluencyRating: student.fluency_rating,
    scoreFluencyRating: student.score_fluency_rating, // Add the score for fluency rating
    comment: student.comment,
  }));


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: tableData,
  });

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
      maxWidth: '100%',
    }}
    >
    <table
    {...getTableProps()}
    style={{
      maxWidth: '100%',
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
          position: index < 2 ? 'sticky' : 'static', // Make first two columns sticky
          left: index < 2 ? `${index * 50}px` : 'auto', // Adjust position for the first two columns
          zIndex: index < 2 ? 3 : 'auto', // Ensure the sticky columns stay on top
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
        {row.cells.map((cell, index) => (
          <td
          {...cell.getCellProps()}
          style={{
            padding: '15px 20px',
            borderBottom: '1px solid #ddd',
            borderLeft: '1px solid #ddd',
            whiteSpace: 'nowrap',
            textAlign: [
              'consistency',
              'clarity',
              'articulation',
              'intonationAndStress',
              'accuracy',
              'clarityOfThought',
              'syntax',
              'qualityOfResponse',
              'detailOfResponse',
            ].includes(cell.column.id)
            ? 'left' // Align left for the listed columns
            : 'center', // Default to center for others
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            fontFamily: 'Poppins',
            fontWeight: '500',
            position: index < 2 ? 'sticky' : 'static', // Sticky for the first two columns
            left: index < 2 ? `${index * 50}px` : 'auto', // Adjust position for first two columns
            zIndex: index < 2 ? 2 : 'auto', // Ensure sticky columns stay on top
            background: 'white',
          }}
          >
          {cell.render('Cell')}
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
