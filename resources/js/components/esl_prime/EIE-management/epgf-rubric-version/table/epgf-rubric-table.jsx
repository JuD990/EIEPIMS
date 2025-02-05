import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

const Table = ({ rubricVersion }) => {
  const [rubricDetails, setRubricDetails] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRubricDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://127.0.0.1:8000/api/display-epgf-rubric", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        // Handle errors if data is empty or not found
        if (data.error) {
          setError(data.error);
          return;
        }

        setRubricDetails(data);
      } catch (error) {
        setError("Error fetching rubric details");
        console.error("Error fetching rubric details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRubricDetails();
  }, [rubricVersion]);

  useEffect(() => {
    if (rubricDetails) {
      // Helper function to remove duplicates from a string by splitting into words and rejoining
      const removeDuplicates = (text) => {
        const words = text?.split(/\s+/) || []; // Split on spaces, handle multiple spaces
        const cleanedWords = words.map((word) => word.replace(/[^\w\s]/g, "")); // Remove punctuation
        return [...new Set(cleanedWords)].join(" ");
      };

      // Function to format descriptors and replace '.' with a new line
      const formatDescriptor = (descriptor) => {
        if (!descriptor) return "";
        return descriptor.split(".").map((text, index) => (
          <span key={index}>
          {text.trim()}
          {index < descriptor.split(".").length - 1 && <br />}
          </span>
        ));
      };

      const formattedData = rubricDetails.pronunciations.map((pronunciation, index) => ({
        pronunciation: removeDuplicates(pronunciation.pronunciation || ""),
                                                                                        pronunciationDescriptor: formatDescriptor(pronunciation.descriptor || ""),
                                                                                        pronunciationRating: pronunciation.rating || "",
                                                                                        grammar: removeDuplicates(rubricDetails.grammars[index]?.grammar || ""),
                                                                                        grammarDescriptor: formatDescriptor(rubricDetails.grammars[index]?.descriptor || ""),
                                                                                        grammarRating: rubricDetails.grammars[index]?.rating || "",
                                                                                        fluency: removeDuplicates(rubricDetails.fluencies[index]?.fluency || ""),
                                                                                        fluencyDescriptor: formatDescriptor(rubricDetails.fluencies[index]?.descriptor || ""),
                                                                                        fluencyRating: rubricDetails.fluencies[index]?.rating || "",
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
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}

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
