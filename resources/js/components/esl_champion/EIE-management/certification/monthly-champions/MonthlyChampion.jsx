import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import Certificate from "./MonthlyCertificate"; // Import the Certificate component
import "./MonthlyChampion.css";

const MonthlyChampion = ({ searchQuery }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/class-lists");
                console.log("📜 Raw API Data:", response.data);

                // Sorting the data from highest to lowest epgf_average
                const sortedData = response.data.sort((a, b) => b.epgf_average - a.epgf_average);
                setData(sortedData);
            } catch (error) {
                console.error("❌ Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // ✅ Filter data based on searchQuery
    const filteredData = data.filter((item) => {
        const fullName = `${item.firstname} ${item.lastname}`.toLowerCase();
        const yearLevel = item.year_level.toString().toLowerCase();
        const program = item.program.toLowerCase();
        const department = item.department.toLowerCase();

        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            yearLevel.includes(searchQuery.toLowerCase()) ||
            program.includes(searchQuery.toLowerCase()) ||
            department.includes(searchQuery.toLowerCase())
        );
    });

    const handleViewCertificate = async (rowData) => {
        console.log("🖥️ Selected Row Data:", rowData);

        if (!rowData.class_lists_id) {
            console.error("❌ ERROR: class_lists_id is missing! Check API response.");
            return;
        }

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/certificate/${rowData.class_lists_id}`);
            console.log("📜 API Response:", response.data);

            if (!response.data || Object.keys(response.data).length === 0) {
                console.error("❌ ERROR: Empty API response!");
                return;
            }

            const { name, year_level, department, dean_name, month, current_year, next_year, esl_champion } = response.data;

            console.log("✅ Extracted Data:", { name, year_level, department, dean_name, month, current_year, next_year, esl_champion });

            const certificateData = {
                name: name ?? "N/A",
                yearLevel: year_level ?? "N/A",
                department: department ?? "N/A",
                deanName: dean_name ?? "N/A",
                eslChampion: esl_champion ?? "N/A",
                month: month ?? "N/A",
                currentYear: current_year ?? "N/A",
                nextYear: next_year ?? "N/A",
            };

            console.log("🖼️ Final Certificate Data:", certificateData);

            // Generate PDF
            const doc = <Certificate {...certificateData} />;
            const pdfBlob = await pdf(doc).toBlob();
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, "_blank");

        } catch (error) {
            console.error("❌ Error fetching certificate data:", error);
        }
    };

    const columns = React.useMemo(
        () => [
            { Header: "Name", accessor: (row) => `${row.firstname} ${row.lastname}` },
            { Header: "Year Level", accessor: "year_level" },
            { Header: "Program", accessor: "program" },
            { Header: "Department", accessor: "department" },
            { Header: "EPGF Average", accessor: "epgf_average" },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <button
                    className="monthly-champion-action-btn"
                    onClick={() => handleViewCertificate(row.original)}
                    >
                    View Certificate
                    </button>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: filteredData, // ✅ Use filtered data
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
