import React, { useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "./eie-spark-performance.css";
import GraphDropdown from '../graph-dropdown/graph-dropdown';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const EieSparkPerformance = () => {
    const [selectedSchoolYear, setSelectedSchoolYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");

    const data = {
        labels: ['BSIT', 'BSCS', 'ACT', 'BLIS'],
        datasets: [
            {
                label: '1st Year',
                data: [75, 80, 60, 100],
                backgroundColor: '#0E9E48'  // Custom color for 1st Year
            },
            {
                label: '2nd Year',
                data: [100, 70, 55, 85],
                backgroundColor: 'rgba(255, 206, 86, 0.7)'  // No change for 2nd Year
            },
            {
                label: '3rd Year',
                data: [100, 85, 70, 60],
                backgroundColor: '#0187F1'  // Custom color for 3rd Year
            },
            {
                label: '4th Year',
                data: [90, 100, 80, 70],
                backgroundColor: '#FF474A'  // Custom color for 4th Year
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
                }
            },
            datalabels: {
                anchor: 'end',
                align: (context) => {
                    // Check if the value is 100 and move the label to the bottom
                    return context.dataset.data[context.dataIndex] === 100 ? 'bottom' : 'top';
                },
                formatter: (value) => `${value}%`,
                    font: {
                        weight: 'bold'
                    },
                    padding: {
                        top: 10, // Small padding for labels at the top
                        bottom: 10, // Padding for labels at the bottom
                    },
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value}%`,
                    stepSize: 10
                },
                title: {
                    display: true,
                    text: 'Completion Rate (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Programs'
                }
            }
        }
    };

    return (
        <div className="spark-chart-container">
        <div className="spark-chart-title">
        <h2>My Department EIE Spark Performance</h2>
        <p>Target Completion Rate: 100%</p>
        </div>
        <GraphDropdown
        setSelectedSchoolYear={setSelectedSchoolYear}
        setSelectedSemester={setSelectedSemester}
        />
        <Bar data={data} options={options} />
        </div>
    );
};

export default EieSparkPerformance;
