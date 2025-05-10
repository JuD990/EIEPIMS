import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "./imp-subjects-performance.css";
import GraphDropdown from '../graph-dropdown/graph-dropdown';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const subjectsData = {
    "Introduction to Computing": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                type: "line",
                label: "PGF Average",
                data: [3.2, 3.5, 2.8, 3.9, 3.0], // Updated data (4.00 - 0.00 range)
                borderColor: "#FF474A",
                backgroundColor: "#FF474A",
                fill: false,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: "#FF474A",
                pointBorderColor: "#FF474A",
                order: 1,
                yAxisID: "y1", // Link to the first y-axis (0.00 to 4.00)
            },
            {
                type: "bar",
                label: "Completion Rate",
                data: [80, 90, 70, 85, 75], // Updated data (0% - 100%)
                backgroundColor: "#42a5f5",
                order: 2,
                yAxisID: "y2", // Link to the second y-axis (0% to 100%)
            },
        ],
    },
    "Programming 1": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                type: "line",
                label: "PGF Average",
                data: [2.0, 2.3, 2.5, 3.2, 3.5], // Updated data (4.00 - 0.00 range)
                borderColor: "#FF474A",
                backgroundColor: "#FF474A",
                fill: false,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: "#FF474A",
                pointBorderColor: "#FF474A",
                order: 1,
                yAxisID: "y1", // Link to the first y-axis (0.00 to 4.00)
            },
            {
                type: "bar",
                label: "Completion Rate",
                data: [60, 70, 80, 90, 85], // Updated data (0% - 100%)
                backgroundColor: "#42a5f5",
                order: 2,
                yAxisID: "y2", // Link to the second y-axis (0% to 100%)
            },
        ],
    },
    "Data Structures": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                type: "line",
                label: "PGF Average",
                data: [1.8, 2.0, 2.5, 2.7, 3.0], // Updated data (4.00 - 0.00 range)
                borderColor: "#FF474A",
                backgroundColor: "#FF474A",
                fill: false,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: "#FF474A",
                pointBorderColor: "#FF474A",
                order: 1,
                yAxisID: "y1", // Link to the first y-axis (0.00 to 4.00)
            },
            {
                type: "bar",
                label: "Completion Rate",
                data: [50, 60, 70, 80, 75], // Updated data (0% - 100%)
                backgroundColor: "#42a5f5",
                order: 2,
                yAxisID: "y2", // Link to the second y-axis (0% to 100%)
            },
        ],
    },
    "Web Development": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                type: "line",
                label: "PGF Average",
                data: [2.5, 3.0, 2.8, 3.5, 3.3], // Updated data (4.00 - 0.00 range)
                borderColor: "#FF474A",
                backgroundColor: "#FF474A",
                fill: false,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: "#FF474A",
                pointBorderColor: "#FF474A",
                order: 1,
                yAxisID: "y1", // Link to the first y-axis (0.00 to 4.00)
            },
            {
                type: "bar",
                label: "Completion Rate",
                data: [85, 90, 80, 95, 92], // Updated data (0% - 100%)
                backgroundColor: "#42a5f5",
                order: 2,
                yAxisID: "y2", // Link to the second y-axis (0% to 100%)
            },
        ],
    },
};

const ImpSubjectsPerformance = () => {
    const currentMonth = new Date().getMonth();
    const defaultSemester = currentMonth >= 8 && currentMonth <= 12 ? "1st Semester" : "2nd Semester";
    const defaultSchoolYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

    const [selectedSchoolYear, setSelectedSchoolYear] = useState(defaultSchoolYear);
    const [selectedSemester, setSelectedSemester] = useState(defaultSemester);
    const [chartTitle, setChartTitle] = useState("Introduction to Computing");
    const [chartData, setChartData] = useState(subjectsData[chartTitle]);

    useEffect(() => {
        setChartData(subjectsData[chartTitle]); // Update chart data based on selected subject
    }, [chartTitle]);

    const handleTitleChange = (e) => {
        const selectedTitle = e.target.value;
        setChartTitle(selectedTitle);
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
        },
        scales: {
            y1: {
                type: "linear",
                position: "left",
                min: 0.00,
                max: 4.00,
                ticks: {
                    stepSize: 0.5,
                },
                title: {
                    display: true,
                    text: "PGF Average",
                },
            },
            y2: {
                type: "linear",
                position: "right",
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                    callback: function (value) {
                        return value + "%";
                    },
                },
                title: {
                    display: true,
                    text: "Completion Rate",
                },
            },
        },
    };

    return (
        <div className="chart-container">
        <div className="title-dropdown-container">
        <select
        id="chart-title"
        value={chartTitle}
        onChange={handleTitleChange}
        className="title-dropdown"
        >
        <option value="Introduction to Computing">Introduction to Computing</option>
        <option value="Programming 1">Programming 1</option>
        <option value="Data Structures">Data Structures</option>
        <option value="Web Development">Web Development</option>
        </select>
        </div>

        {/* Wrapper for additional dropdowns */}
        <div className="dropdown-wrapper">
        <GraphDropdown
        setSelectedSchoolYear={setSelectedSchoolYear}
        setSelectedSemester={setSelectedSemester}
        />
        </div>

        {/* Chart component */}
        <Chart type="bar" data={chartData} options={options} />
        </div>
    );
};

export default ImpSubjectsPerformance;
