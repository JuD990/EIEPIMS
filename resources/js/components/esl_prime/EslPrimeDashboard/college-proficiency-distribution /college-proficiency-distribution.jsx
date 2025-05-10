import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './college-proficiency-distribution.css';
import GraphDropdown from '../graph-dropdown/graph-dropdown';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartDataLabels);

const CollegeProficiencyChart = () => {
    const [selectedSchoolYear, setSelectedSchoolYear] = useState(""); // State for selected school year
    const [selectedSemester, setSelectedSemester] = useState(""); // State for selected semester

    const data = {
        labels: ['CCS', 'CJE', 'CNR', 'CAS', 'CEA', 'CED', 'CBA'],
        datasets: [
            {
                label: 'Beginning',
                data: [15, 10, 20, 100, 12, 18, 14],
                backgroundColor: '#FF474A',
            },
            {
                label: 'Developing',
                data: [100, 100, 35, 20, 28, 22, 26],
                backgroundColor: 'rgba(255, 206, 86, 0.7)',
            },
            {
                label: 'Approaching',
                data: [35, 100, 30, 45, 40, 38, 36],
                backgroundColor: '#0E9E48',
            },
            {
                label: 'Proficient',
                data: [20, 100, 15, 30, 20, 22, 24],
                backgroundColor: '#0187F1',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
                },
            },
            datalabels: {
                anchor: 'end',
                align: (context) => {
                    // If value is 100, move label to the bottom
                    return context.dataset.data[context.dataIndex] === 100 ? 'bottom' : 'top';
                },
                formatter: (value) => `${value}%`,
                    font: {
                        weight: 'bold',
                    },
                    padding: {
                        top: 10,  // Padding for labels at the top
                        bottom: 10,  // Padding for labels at the bottom
                    },
                    color: (context) => {
                        // Check if the value is 100
                        if (context.dataset.data[context.dataIndex] === 100) {
                            // Change text color to white for certain background colors
                            const bgColor = context.dataset.backgroundColor[context.dataIndex];
                            if (bgColor === '#0E9E48' || bgColor === '#0187F1' || bgColor === '#FF474A') {
                                return '#FFFFFF'; // White color for 100% bars
                            }
                        }
                        return '#000000'; // Default color for other labels
                    }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Completion Rate (%)',
                },
                ticks: {
                    callback: (value) => value + '%',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Departments',
                },
            },
        },
    };

    return (
        <div className="cpd-chart-container">
        <div className="cpd-chart-header">
        <h2 className="cpd-chart-title">College Proficiency Distribution</h2>
        <p className="cpd-chart-subtitle">Target Completion Rate: 100%</p>
        </div>
        <GraphDropdown
        setSelectedSchoolYear={setSelectedSchoolYear}
        setSelectedSemester={setSelectedSemester}
        />
        <Bar data={data} options={options} />
        </div>
    );
};

export default CollegeProficiencyChart;
