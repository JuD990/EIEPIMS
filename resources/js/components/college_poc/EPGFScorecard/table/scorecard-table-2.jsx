import React from 'react';
import { useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { sampleData } from './sample-data';

const TableComponent = () => {
  const columns = React.useMemo(
    () => [
      { Header: 'No.', accessor: 'no', width: 5 },
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
        overflowY: 'auto',
        height: '500px',
        marginLeft: '320px',
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
          tableLayout: 'fixed', // Ensure consistent column widths
        }}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                const isSticky = index < 5;
                const columnStyle = {
                    backgroundColor: '#F4F7FC',
                    color: '#383838',
                    padding: '15px 60px',
                    textAlign: 'center',
                    borderBottom: 'none',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    position: 'sticky',
                    top: 0,
                    zIndex: index < 5 ? 3 : 2,
                    boxSizing: 'border-box',
                    width: '200px',
                };

                // Apply `left` positioning for sticky columns only
                if (isSticky) {
                  columnStyle.left = `${index * 150}px`;
                }

                return (
                  <th
                    {...column.getHeaderProps()}
                    style={columnStyle}
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  const isSticky = index < 5;
                  const cellStyle = {
                    padding: '5px',
                    borderBottom: '1px solid #ddd',
                    borderLeft: '1px solid #ddd',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
		                maxWidth: '450px',
                    backgroundColor: isSticky ? '#fff' : 'transparent',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    boxSizing: 'border-box',
                  };

                  if (isSticky) {
                    cellStyle.position = 'sticky';
                    cellStyle.left = `${index * 150}px`;
                  }

                  return (
                    <td
                      {...cell.getCellProps()}
                      style={cellStyle}
                      title={cell.value}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
