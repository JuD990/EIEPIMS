import React from "react";
import { useTable } from 'react-table';
import "./monthly-performance-summary.css";

const MonthlyPerformanceSummary = () => {
    // Get the current month
    const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed, so we add 1

    // Define the months
    const monthsFirstHalf = ['January', 'February', 'March', 'April', 'May'];
    const monthsSecondHalf = ['August', 'September', 'October', 'November', 'December'];

    // Set the data conditionally based on the current month
    const data = React.useMemo(() => {
        let monthsToDisplay = [];

        if (currentMonth >= 1 && currentMonth <= 5) {
            monthsToDisplay = monthsFirstHalf;
        } else if (currentMonth >= 8 && currentMonth <= 12) {
            monthsToDisplay = monthsSecondHalf;
        }

        return monthsToDisplay.map(month => ({
            month,
            epgfAverage: Math.floor(Math.random() * 30) + 50, // Dummy data for demonstration
            proficiencyLevel: 'Advanced',
            cefrRating: 'C1',
            cefrCategory: 'Proficient',
        }));
    }, [currentMonth]);

    const columns = React.useMemo(
        () => [
            { Header: 'Month', accessor: 'month' },
            { Header: 'EPGF Average', accessor: 'epgfAverage' },
            { Header: 'Proficiency Level', accessor: 'proficiencyLevel' },
            { Header: 'CEFR Rating', accessor: 'cefrRating' },
            { Header: 'CEFR Category', accessor: 'cefrCategory' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className="student-monthly-performance-summary-card-1 card-1">
        <div className="card-header">
        <h2 className="card-title-1">EIE Monthly Performance Summary</h2>
        </div>
        <div className="card-body">
        <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
            </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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

export default MonthlyPerformanceSummary;
