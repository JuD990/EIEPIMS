import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

const Table = () => {
  const [data, setData] = useState([]);

  const isJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/rubrics");
      const textData = await response.text();

      if (!isJSON(textData)) {
        throw new Error("Response is not valid JSON");
      }

      const backendData = JSON.parse(textData);
      console.log("Parsed JSON:", backendData);

      const formattedData = backendData.map((rubric) => ({
        pronunciation: rubric.pronunciation?.pronunciation || "",
        pronunciationDescriptor: rubric.pronunciation?.descriptor || "",
        pronunciationRating: rubric.pronunciation?.rating || "",
        grammar: rubric.grammar?.grammar || "",
        grammarDescriptor: rubric.grammar?.descriptor || "",
        grammarRating: rubric.grammar?.rating || "",
        fluency: rubric.fluency?.fluency || "",
        fluencyDescriptor: rubric.fluency?.descriptor || "",
        fluencyRating: rubric.fluency?.rating || "",
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const columns = React.useMemo(
    () => [
      {
        Header: "EPGF Rubric",
        columns: [
          {
            Header: "Pronunciation",
            accessor: "pronunciation",
            Cell: ({ row, value }) =>
            row.index > 0 && value === data[row.index - 1].pronunciation
            ? null
            : value,
          },
          {
            Header: "Descriptor",
            accessor: "pronunciationDescriptor",
            Cell: ({ value }) =>
            value.split(/(\.)/g).map((part, index, array) => (
              <React.Fragment key={index}>
              {part.trim()}
              {part === "." && index < array.length - 1 ? <br /> : null}
              </React.Fragment>
            )),
          },
          { Header: "Rating", accessor: "pronunciationRating" },
          {
            Header: "Grammar",
            accessor: "grammar",
            Cell: ({ row, value }) =>
            row.index > 0 && value === data[row.index - 1].grammar
            ? null
            : value,
          },
          {
            Header: "Descriptor",
            accessor: "grammarDescriptor",
            Cell: ({ value }) =>
            value.split(/(\.)/g).map((part, index, array) => (
              <React.Fragment key={index}>
              {part.trim()}
              {part === "." && index < array.length - 1 ? <br /> : null}
              </React.Fragment>
            )),
          },
          { Header: "Rating", accessor: "grammarRating" },
          {
            Header: "Fluency",
            accessor: "fluency",
            Cell: ({ row, value }) =>
            row.index > 0 && value === data[row.index - 1].fluency
            ? null
            : value,
          },
          {
            Header: "Descriptor",
            accessor: "fluencyDescriptor",
            Cell: ({ value }) =>
            value.split(/(\.)/g).map((part, index, array) => (
              <React.Fragment key={index}>
              {part.trim()}
              {part === "." && index < array.length - 1 ? <br /> : null}
              </React.Fragment>
            )),
          },
          { Header: "Rating", accessor: "fluencyRating" },
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
      overflowX: "auto",
      overflowY: "auto",
      height: "600px",
      marginLeft: "340px",
      marginRight: "35px",
      border: "1px solid #ddd",
      boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
    {headerGroups.map((headerGroup, index) => (
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
