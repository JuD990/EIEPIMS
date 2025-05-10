import React, { useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "./department-eie-spark-performance.css";
import GraphDropdown from '../graph-dropdown/graph-dropdown';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const DepartmentEieSparkPerformance = () => {
    const [selectedSchoolYear, setSelectedSchoolYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("SCIS");

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const departmentData = {
        SCIS: {
            labels: ['BSIT', 'BSCS', 'ACT', 'BLIS'],
            datasets: [
                {
                    label: '1st Year',
                    data: [75, 80, 60, 90],
                    backgroundColor: '#0E9E48'
                },
                {
                    label: '2nd Year',
                    data: [65, 100, 55, 85],
                    backgroundColor: 'rgba(255, 206, 86, 0.7)'
                },
                {
                    label: '3rd Year',
                    data: [80, 85, 70, 60],
                    backgroundColor: '#0187F1'
                },
                {
                    label: '4th Year',
                    data: [90, 95, 80, 70],
                    backgroundColor: '#FF474A'
                }
            ]
        },
        CJE: {
            labels: ['BSCRIM'],
            datasets: [
                {
                    label: '1st Year',
                    data: [85],
                    backgroundColor: '#0E9E48'
                },
                {
                    label: '2nd Year',
                    data: [78],
                    backgroundColor: 'rgba(255, 206, 86, 0.7)'
                },
                {
                    label: '3rd Year',
                    data: [82],
                    backgroundColor: '#0187F1'
                },
                {
                    label: '4th Year',
                    data: [88],
                    backgroundColor: '#FF474A'
                }
            ]
        }
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
                display: true,
                anchor: 'end',
                align: 'bottom', // moves label inside top of bar
                formatter: (value) => value === 100 ? '100%\n' : `${value}%`,
                    font: {
                        weight: 'bold'
                    },
                    color: (context) => {
                        const value = context.dataset.data[context.dataIndex];
                        const bgColor = context.dataset.backgroundColor;
                        const background = Array.isArray(bgColor)
                        ? bgColor[context.dataIndex]
                        : bgColor;

                        const darkColors = ['#0E9E48', '#0187F1', '#FF474A'];
                        return (value === 100 && darkColors.includes(background)) ? '#FFFFFF' : '#000000';
                    },
                    padding: {
                        top: 6,
                        bottom: 6
                    },
                    clip: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: (value) => `${value}%`
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
        <div className="esl-spark-chart-container">
        <div className="esl-spark-chart-title">
        <select
        value={selectedDepartment}
        onChange={handleDepartmentChange}
        className="department-dropdown"
        >
        <option value="SCIS">SCIS EIE Spark Performance</option>
        <option value="CJE">CJE EIE Spark Performance</option>
        </select>
        <p>Target Completion Rate: 100%</p>
        </div>

        <GraphDropdown
        setSelectedSchoolYear={setSelectedSchoolYear}
        setSelectedSemester={setSelectedSemester}
        />

        <Bar data={departmentData[selectedDepartment]} options={options} />
        </div>
    );
};

export default DepartmentEieSparkPerformance;
