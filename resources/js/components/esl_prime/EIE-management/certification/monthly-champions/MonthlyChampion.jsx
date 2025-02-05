import React from "react";
import { useTable } from "react-table";
import "./MonthlyChampion.css"; // Ensure this file is included for styling
import Template from "@assets/eie-monthly-champ.png";

const MonthlyChampion = () => {
    // Sample data
    const data = React.useMemo(
        () => [
            { name: "John Doe", yearLevel: "2nd Year", program: "BS Computer Science", pgfAverage: 3.50 },
            { name: "Jane Smith", yearLevel: "3rd Year", program: "BS Information Technology", pgfAverage: 3.20 },
            { name: "Mike Johnson", yearLevel: "1st Year", program: "BS Nursing", pgfAverage: 2.80 },
        ],
        []
    );

    // Define table columns
    const columns = React.useMemo(
        () => [
            { Header: "Name", accessor: "name" },
            { Header: "Year Level", accessor: "yearLevel" },
            { Header: "Program", accessor: "program" },
            { Header: "PGF Average", accessor: "pgfAverage" },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <button className="monthly-champion-action-btn" onClick={() => handleAction(row.original)}>
                    Certificate
                    </button>
                ),
            },
        ],
        []
    );

    // Action button handler
    const handleAction = (rowData) => {
        // Create a temporary anchor element for the image download
        const link = document.createElement("a");
        link.href = Template;  // Set the href to the image URL
        link.download = Template.split("/").pop();  // Set the download filename (using the filename from URL)

        // Trigger the download by simulating a click
        link.click();
    };

    // Create table instance
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data
    });

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

export default MonthlyChampion;
