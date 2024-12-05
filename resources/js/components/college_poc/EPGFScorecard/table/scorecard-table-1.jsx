import React from 'react';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { sampleData } from './sample-data';

const TableComponent = () => {
  const columns = React.useMemo(
    () => [
      { Header: 'No.', accessor: 'no' },
      { Header: 'Full Name', accessor: 'fullName' },
      { Header: 'Year Level', accessor: 'yearLevel' },
      { Header: 'PGF Average', accessor: 'pgfAverage' },
      { Header: 'Proficiency', accessor: 'proficiency' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Consistency', accessor: 'consistency' },
      { Header: '', accessor: 'consistencyScore' },
      { Header: 'Articulation', accessor: 'articulation' },
      { Header: '', accessor: 'scoreArticulation' },
      { Header: 'Intonation & Stress', accessor: 'intonation&stress' },
      { Header: '', accessor: 'scoreIntonation&Stress' },
      { Header: 'Rating', accessor: 'pronunciationRating' },
      { Header: 'Accuracy', accessor: 'accuracy' },
      { Header: '', accessor: 'scoreAccuracy' },
      { Header: 'Clarity of Thought', accessor: 'clarityofthought' },
      { Header: '', accessor: 'scoreClarityofthought' },
      { Header: 'Syntax', accessor: 'syntax' },
      { Header: '', accessor: 'scoreSyntax' },
      { Header: 'Rating', accessor: 'grammarRating' },
      { Header: 'Quality of Response', accessor: 'qualityofresponse' },
      { Header: '', accessor: 'scoreQualityofresponse' },
      { Header: 'Detail of Response', accessor: 'detailofresponse' },
      { Header: '', accessor: 'scoreDetailofResponse' },
      { Header: 'Rating', accessor: 'fluencyRating' },
      { Header: 'Comment', accessor: 'comment' },
    ],
    []
  );

  const data = React.useMemo(() => sampleData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSticky // Enable sticky plugin
  );

  return (
    <div
      style={{
        overflowX: 'auto',
        overflowY: 'auto', // Add vertical scrolling
        height: '500px', // Set the fixed height as desired
        marginLeft: '350px',
        marginRight: '35px',
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
                    padding: '15px 20px',
                    textAlign: 'center',
                    borderBottom: 'none',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    position: 'sticky',
                    top: 0,
                    left: index < 5 ? `${index * 50}px` : 'auto',
                    zIndex: index < 5 ? 3 : 2,
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
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
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '450px',
                      position: index < 5 ? 'sticky' : 'auto',
                      left: index < 5 ? `${index * 50}px` : 'auto',
                      backgroundColor: index < 5 ? '#fff' : 'transparent',
                      fontFamily: 'Poppins',
                      fontWeight: '500',
                      borderRight: index === 4 ? '2px solid #6B6D76' : 'none',
                    }}
                    title={cell.value}
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
