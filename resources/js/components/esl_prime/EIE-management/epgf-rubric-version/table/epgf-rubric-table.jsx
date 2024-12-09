import React from "react";
import { useTable } from "react-table";
// every descriptor data must end with "." character to separate them by that character to have a clean look in the table 
const Table = () => {
  const data = React.useMemo(
    () => [
      {
        pronunciation: "Consistency",
        pronunciationDescriptor: "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        pronunciationRating: 5,
        grammar: "Accuracy",
        grammarDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        grammarRating: 5,
        fluency: "Quality of Response",
        fluencyDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        fluencyRating: 5,
      },
      {
        pronunciation: "Consistency",
        pronunciationDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        pronunciationRating: 5,
        grammar: "Accuracy",
        grammarDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        grammarRating: 4,
        fluency: "Quality of Response",
        fluencyDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        fluencyRating: 3,
      },
      {
        pronunciation: "Clarity",
        pronunciationDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        pronunciationRating: 5,
        grammar: "Clarity of Thought",
        grammarDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        grammarRating: 4,
        fluency: "Quality of Response",
        fluencyDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        fluencyRating: 3,
      },
      {
        pronunciation: "Articulation",
        pronunciationDescriptor: "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        pronunciationRating: 5,
        grammar: "Clarity of Thought",
        grammarDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        grammarRating: 5,
        fluency: "Detail of Response",
        fluencyDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        fluencyRating: 5,
      },
      {
        pronunciation: "Articulation",
        pronunciationDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        pronunciationRating: 5,
        grammar: "Syntax",
        grammarDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        grammarRating: 4,
        fluency: "Detail of Response",
        fluencyDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        fluencyRating: 3,
      },
      {
        pronunciation: "Intonation and Stress",
        pronunciationDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        pronunciationRating: 5,
        grammar: "Syntax",
        grammarDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        grammarRating: 4,
        fluency: "Detail of Response",
        fluencyDescriptor:  "- Can always satisfactorily answer and respond to scripted and non-scripted questions and settings. - Can often engage interviewer in spontaneous conversation within context of topic. - Can often elaborate and volunteer additional details. - Can often lead conversation with ease.",
        fluencyRating: 3,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "EPGF Rubric",
        columns: [
          {
            Header: "Pronunciation",
            accessor: "pronunciation",
            Cell: ({ row, value }) =>
              row.index > 0 &&
              value === data[row.index - 1].pronunciation
                ? null
                : value,
          },
          {
            Header: "Descriptor",
            accessor: "pronunciationDescriptor",
            Cell: ({ value }) => (
              <div>
                {value.split(/(\.)/g).map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part.trim()}
                    {part === '.' && index < array.length - 1 ? <br /> : null}
                  </React.Fragment>
                ))}
              </div>
            ),             
          },
          {
            Header: "Rating",
            accessor: "pronunciationRating",
          },
          {
            Header: "Grammar",
            accessor: "grammar",
            Cell: ({ row, value }) =>
              row.index > 0 &&
              value === data[row.index - 1].grammar
                ? null
                : value,
          },
          {
            Header: "Descriptor",
            accessor: "grammarDescriptor",
            Cell: ({ value }) => (
              <div>
                {value.split(/(\.)/g).map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part.trim()}
                    {part === '.' && index < array.length - 1 ? <br /> : null}
                  </React.Fragment>
                ))}
              </div>
            ),
            
          },
          {
            Header: "Rating",
            accessor: "grammarRating",
          },
          {
            Header: "Fluency",
            accessor: "fluency",
            Cell: ({ row, value }) =>
              row.index > 0 &&
              value === data[row.index - 1].fluency
                ? null
                : value,
          },
          {
            Header: "Descriptor",
            accessor: "fluencyDescriptor",
            Cell: ({ value }) => (
              <div>
                {value.split(/(\.)/g).map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part.trim()}
                    {part === '.' && index < array.length - 1 ? <br /> : null}
                  </React.Fragment>
                ))}
              </div>
            ),
          },
          {
            Header: "Rating",
            accessor: "fluencyRating",
          },
        ],
      },
    ],
    [data]
  );
  
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
      <div 
        style={{ 
          overflowX: 'auto',
          overflowY: 'auto',
          height: '600px',
          marginLeft: '340px',
          marginRight: '35px',
          border: '1px solid #ddd',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}
      >
        <div 
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
              {headerGroups.map((headerGroup, index) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  style={{
                    backgroundColor: '#F4F7FC',
                    color: '#383838',
                    textAlign: 'center',
                    fontFamily: 'Poppins',
                  }}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                          backgroundColor: '#F4F7FC',
                          color: '#383838',
                          padding: '25px 25px',
                          textAlign: 'center',
                          borderBottom: 'none',
                          fontFamily: 'Poppins',
                          //borderBottom: '1px solid #ddd',
                          fontSize: index === 0 ? "28px" : "18px",
                          fontWeight: index === 0 ? "bold" : "normal",
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
                  <tr
                    {...row.getRowProps()}
                    style={{
                      borderBottom: "1px solid #ddd",
                      backgroundColor: row.index % 2 === 0 ? "#f9f9f9" : "white",
                    }}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '15px 20px',
                          borderBottom: '1px solid #ddd',
                          borderLeft: '1px solid #ddd',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%',
                          fontFamily: 'Poppins',
                          fontWeight: '500',
                          textAlign: 'left',
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
      </div>
  );
};

export default Table;
