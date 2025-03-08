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
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
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
      const removeDuplicates = (text) => {
        const words = text?.split(/\s+/) || [];
        const cleanedWords = words.map((word) => word.replace(/[^\w\s]/g, ""));
        return [...new Set(cleanedWords)].join(" ");
      };

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
        id: pronunciation.id, // Ensure ID is present for updates
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

  const handleUpdate = (id, category) => {
    console.log(`Update ${category} for ID: ${id}`);
    // Implement the update logic (e.g., open a modal, navigate to a form, or send an API request)
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "EPGF Rubric",
        columns: [
          { Header: "Pronunciation", accessor: "pronunciation" },
          { Header: "Descriptor", accessor: "pronunciationDescriptor" },
          { Header: "Rating", accessor: "pronunciationRating" },
          {
            Header: "Action",
            accessor: "pronunciationUpdate",
            Cell: ({ row }) => (
              <button onClick={() => handleUpdate(row.original.id, "Pronunciation")} style={buttonStyle}>
              Update
              </button>
            ),
          },
          { Header: "Grammar", accessor: "grammar" },
          { Header: "Descriptor", accessor: "grammarDescriptor" },
          { Header: "Rating", accessor: "grammarRating" },
          {
            Header: "Action",
            accessor: "grammarUpdate",
            Cell: ({ row }) => (
              <button onClick={() => handleUpdate(row.original.id, "Grammar")} style={buttonStyle}>
              Update
              </button>
            ),
          },
          { Header: "Fluency", accessor: "fluency" },
          { Header: "Descriptor", accessor: "fluencyDescriptor" },
          { Header: "Rating", accessor: "fluencyRating" },
          {
            Header: "Action",
            accessor: "fluencyUpdate",
            Cell: ({ row }) => (
              <button onClick={() => handleUpdate(row.original.id, "Fluency")} style={buttonStyle}>
              Update
              </button>
            ),
          },
        ],
      },
    ],
    []
  );

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    fontFamily: "Poppins",
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div style={tableContainerStyle}>
    <table {...getTableProps()} style={tableStyle}>
    <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()} style={headerRowStyle}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()} style={headerCellStyle}>
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
        <tr {...row.getRowProps()} style={rowStyle(row.index)}>
        {row.cells.map((cell) => (
          <td {...cell.getCellProps()} style={cellStyle}>
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

// Styles
const tableContainerStyle = {
  overflowX: "auto",
  overflowY: "auto",
  height: "600px",
  marginLeft: "340px",
  marginRight: "35px",
  border: "1px solid #ddd",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  borderSpacing: "0",
};

const headerRowStyle = {
  backgroundColor: "#F4F7FC",
  color: "#383838",
  textAlign: "center",
  fontFamily: "Poppins",
};

const headerCellStyle = {
  backgroundColor: "#F4F7FC",
  color: "#383838",
  padding: "25px 25px",
  textAlign: "center",
  borderBottom: "none",
  fontFamily: "Poppins",
  fontSize: "18px",
  fontWeight: "normal",
};

const rowStyle = (index) => ({
  borderBottom: "1px solid #ddd",
  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
});

const cellStyle = {
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
};

export default Table;
