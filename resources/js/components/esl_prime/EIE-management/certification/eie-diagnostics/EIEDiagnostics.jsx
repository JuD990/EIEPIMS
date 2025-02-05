import React from "react";
import { useTable } from "react-table";
import "./EIEDiagnostics.css";
import Template1 from "@assets/sample-diagnostics-1.png";
import Template2 from "@assets/sample-diagnostics-2.png";

const handleAction = () => {
    // Create two temporary anchor elements for both images
    const link1 = document.createElement("a");
    const link2 = document.createElement("a");

    // Set the href to the image URLs
    link1.href = Template1;
    link2.href = Template2;

    // Set the download filenames for both images
    link1.download = Template1.split("/").pop();
    link2.download = Template2.split("/").pop();

    // Trigger the download by simulating clicks
    link1.click();
    link2.click();
};

const EIEDiagnostics = () => {
    // Sample data with new columns
    const data = React.useMemo(
        () => [
            { name: "John Doe", lowAcquisition: 5, highAcquisition: 8, emerging: 7, lowDeveloping: 6, highDeveloping: 8, proficient: 9, highProficient: 10, advanced: 9, highAdvanced: 10, nativeBilingual: 10, cefr: "C1" },
            { name: "Jane Smith", lowAcquisition: 4, highAcquisition: 7, emerging: 6, lowDeveloping: 5, highDeveloping: 7, proficient: 8, highProficient: 9, advanced: 8, highAdvanced: 9, nativeBilingual: 10, cefr: "B2" },
            { name: "Mike Johnson", lowAcquisition: 3, highAcquisition: 6, emerging: 5, lowDeveloping: 4, highDeveloping: 6, proficient: 7, highProficient: 8, advanced: 7, highAdvanced: 8, nativeBilingual: 9, cefr: "B1" },
        ],
        []
    );

    // Define table columns with new structure
    const columns = React.useMemo(
        () => [
            { Header: "Name", accessor: "name" },
            { Header: "Low Acquisition", accessor: "lowAcquisition" },
            { Header: "High Acquisition", accessor: "highAcquisition" },
            { Header: "Emerging", accessor: "emerging" },
            { Header: "Low Developing", accessor: "lowDeveloping" },
            { Header: "High Developing", accessor: "highDeveloping" },
            { Header: "Proficient", accessor: "proficient" },
            { Header: "High Proficient", accessor: "highProficient" },
            { Header: "Advanced", accessor: "advanced" },
            { Header: "High Advanced", accessor: "highAdvanced" },
            { Header: "Native or Bilingual", accessor: "nativeBilingual" },
            { Header: "CEFR", accessor: "cefr" },
            {
                Header: "Action",
                accessor: "action",
                Cell: () => (
                    <button className="monthly-champion-action-btn" onClick={handleAction}>
                    Download Both Certificates
                    </button>
                ),
            }
        ],
        []
    );

    // Create table instance
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

    return (
        <div className="monthly-champion-container">
        <div className="monthly-champion-table-container">
        <table {...getTableProps()} className="monthly-champion-table">
        <thead>
        {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id} className="monthly-champion-th">
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
                <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id} className="monthly-champion-td">
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

export default EIEDiagnostics;
