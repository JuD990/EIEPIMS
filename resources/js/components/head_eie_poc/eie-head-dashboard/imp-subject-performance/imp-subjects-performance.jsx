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
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const subjectsData = {
    "Department": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                type: "line",
                label: "PGF Average",
                data: [3.2, 3.5, 2.8, 3.9, 3.0],
                borderColor: "#FF474A",
                backgroundColor: "#FF474A",
                fill: false,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: "#FF474A",
                pointBorderColor: "#FF474A",
                order: 1,
                yAxisID: "y1",
                // Hide data labels for PGF Average
                datalabels: {
                    display: false
                },
            },
            {
                type: "bar",
                label: "Completion Rate",
                data: [80, 90, 70, 85, 75],
                backgroundColor: "#42a5f5",
                order: 2,
                yAxisID: "y2",
                // Hide data labels for Completion Rate
                datalabels: {
                    display: false
                },
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
    const [chartTitle, setChartTitle] = useState("Department");
    const [chartData, setChartData] = useState(subjectsData[chartTitle]);

    useEffect(() => {
        setChartData(subjectsData[chartTitle]);
    }, [chartTitle]);

    const handleTitleChange = (e) => {
        setChartTitle(e.target.value);
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // Show tooltip only for "Completion Rate" data
                        if (context.dataset.yAxisID === 'y2') {
                            return `${context.dataset.label}: ${context.parsed.y}%`;
                        }

                        // Tooltip for "PGF Average" will show only on hover
                        if (context.dataset.yAxisID === 'y1') {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }

                        return ''; // Hide tooltip for any other case
                    },
                },
            },
        },
        scales: {
            y1: {
                type: "linear",
                position: "left",
                min: 0.00,
                max: 4.00,
                ticks: {
                    stepSize: 0.5,
                    // Hide PGF Average values from the y-axis labels
                    display: true, // Keep PGF Average visible in the chart
                },
                title: {
                    display: true,
                    text: "PGF Average",
                },
                grid: {
                    drawOnChartArea: false, // Disable grid for PGF Average line
                },
            },
            y2: {
                type: "linear",
                position: "right",
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                    callback: (value) => `${value}%`,
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
        <div className="chart-title">
        <h2>Full Department</h2>
        <p>Target Completion Rate: 100%</p>
        </div>
        <GraphDropdown
        setSelectedSchoolYear={setSelectedSchoolYear}
        setSelectedSemester={setSelectedSemester}
        />
        <Chart type="bar" data={chartData} options={options} />
        </div>
    );
};

export default ImpSubjectsPerformance;
