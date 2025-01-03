import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

const Table = ({ rubricVersion }) => {
  const [rubricDetails, setRubricDetails] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRubricDetails = async () => {
      if (!rubricVersion) return;

      try {
        const response = await fetch("http://127.0.0.1:8000/api/get-rubric-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ version: rubricVersion }),
        });

        const data = await response.json();
        setRubricDetails(data);
      } catch (error) {
        console.error("Error fetching rubric details:", error);
      }
    };

    fetchRubricDetails();
  }, [rubricVersion]);

  useEffect(() => {
    if (rubricDetails) {
      const formattedData = rubricDetails.pronunciation.map((pronunciation, index) => ({
        pronunciation: pronunciation.pronunciation || "",
        pronunciationDescriptor: pronunciation.descriptor || "",
        pronunciationRating: pronunciation.rating || "",
        grammar: rubricDetails.grammar[index]?.grammar || "",
        grammarDescriptor: rubricDetails.grammar[index]?.descriptor || "",
        grammarRating: rubricDetails.grammar[index]?.rating || "",
        fluency: rubricDetails.fluency[index]?.fluency || "",
        fluencyDescriptor: rubricDetails.fluency[index]?.descriptor || "",
        fluencyRating: rubricDetails.fluency[index]?.rating || "",
      }));
      setData(formattedData);
    }
  }, [rubricDetails]);

  const columns = React.useMemo(
    () => [
      {
        Header: "EPGF Rubric",
        columns: [
          { Header: "Pronunciation", accessor: "pronunciation" },
          { Header: "Descriptor", accessor: "pronunciationDescriptor" },
          { Header: "Rating", accessor: "pronunciationRating" },
          { Header: "Grammar", accessor: "grammar" },
          { Header: "Descriptor", accessor: "grammarDescriptor" },
          { Header: "Rating", accessor: "grammarRating" },
          { Header: "Fluency", accessor: "fluency" },
          { Header: "Descriptor", accessor: "fluencyDescriptor" },
          { Header: "Rating", accessor: "fluencyRating" },
        ],
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div
    style={{
      overflowX: "auto",
      overflowY: "auto",
      height: "600px",
      marginLeft: "340px",
      marginRight: "35px",
      border: "1px solid #ddd",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    }}
    >
    <table
    {...getTableProps()}
    style={{
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: "0",
    }}
    >
    <thead>
    {headerGroups.map((headerGroup) => (
      <tr
      {...headerGroup.getHeaderGroupProps()}
      style={{
        backgroundColor: "#F4F7FC",
        color: "#383838",
        textAlign: "center",
        fontFamily: "Poppins",
      }}
      >
      {headerGroup.headers.map((column) => (
        <th
        {...column.getHeaderProps()}
        style={{
          backgroundColor: "#F4F7FC",
          color: "#383838",
          padding: "25px 25px",
          textAlign: "center",
          borderBottom: "none",
          fontFamily: "Poppins",
          fontSize: "18px",
          fontWeight: "normal",
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
            padding: "15px 20px",
            borderBottom: "1px solid #ddd",
            borderLeft: "1px solid #ddd",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            fontFamily: "Poppins",
            fontWeight: "500",
            textAlign: "left",
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

export default Table;
