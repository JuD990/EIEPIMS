import React from 'react';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import sampleData from './sample-data.js';

const TableComponent = () => {
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

  const data = React.useMemo(() => sampleData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSticky // Enable sticky plugin
  );

  // Function to update the cell data
  const updateData = (rowIndex, columnId, newValue) => {
    data[rowIndex][columnId] = newValue;
    // Re-render the table with updated data
    console.log('Updated data:', data);
  };

  return (
    <div
      style={{
        overflowX: 'auto',
        overflowY: 'auto',
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
