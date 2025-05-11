import React, { useState, useEffect } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "./eie-spark-performance.css";
import GraphDropdown from '../graph-dropdown/graph-dropdown';
import axios from 'axios';

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

const EieSparkPerformance = ({ userDepartment }) => {
    const currentMonth = new Date().getMonth();
    const defaultSemester = currentMonth >= 8 && currentMonth <= 12 ? "1st Semester" : "2nd Semester";
    const defaultSchoolYear = `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;

    const [selectedSchoolYear, setSelectedSchoolYear] = useState(defaultSchoolYear);
    const [selectedSemester, setSelectedSemester] = useState(defaultSemester);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [pgfMin, setPgfMin] = useState();
    const [pgfMax, setPgfMax] = useState();
    const [programLabels, setProgramLabels] = useState([]);

    // Fetch PGF Averages
    useEffect(() => {
        const fetchPGFAverages = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://127.0.0.1:8000/api/performance-summary-rating");
                const ratingsData = response.data.ratings;
                const pgfValues = ratingsData.map(r => parseFloat(r)).filter(val => !isNaN(val));

                if (pgfValues.length > 0) {
                    setPgfMin(Math.floor(Math.min(...pgfValues) * 10) / 10);
                    setPgfMax(Math.ceil(Math.max(...pgfValues) * 10) / 10);
                } else {
                    setPgfMin(0.0);
                    setPgfMax(4.0);
                }
            } catch (error) {
                console.error("Error fetching PGF Averages:", error);
                setErrorMessage("Failed to fetch PGF Averages");
            } finally {
                setLoading(false);
            }
        };

        fetchPGFAverages();
    }, []);

    // Fetch Year Totals
    useEffect(() => {
        if (!userDepartment || userDepartment.trim() === "") {
            console.log("Waiting for valid userDepartment...");
            return;
        }

        const fetchYearTotals = async () => {
            setLoading(true);
            try {
                const baseUrl = "http://127.0.0.1:8000";

                const response = await axios.get(`${baseUrl}/dashboard-report-year-totals`, {
                    params: {
                        department: userDepartment,
                        semester: selectedSemester,
                        schoolYear: selectedSchoolYear,
                    },
                });
                console.log('API Response:', response.data);
                const { programs, yearProgramTotals } = response.data;

                // Validate the response data structure
                if (!Array.isArray(programs) || !yearProgramTotals) {
                    setErrorMessage("Invalid data structure from the server.");
                    return;
                }

                if (!programs || programs.length === 0 || !yearProgramTotals) {
                    setErrorMessage("No data found.");
                    return;
                }

                setProgramLabels(programs);

                const yearLevels = Object.keys(yearProgramTotals);
                const colorPalette = [
                    "#42a5f5", "#66bb6a", "#ffa726", "#ab47bc", "#ef5350",
                    "#26c6da", "#8d6e63", "#7e57c2", "#d4e157", "#5c6bc0"
                ];

                // Bar datasets for each year level's completion rate
                const barDatasets = yearLevels.map((yearLevel, idx) => ({
                    type: "bar",
                    label: `${yearLevel} Completion Rate`,
                    data: programs.map(program => {
                        const programData = yearProgramTotals[yearLevel]?.[program] || {};
                        const completionRate = programData?.completion_rate ?? 0;
                        return completionRate;
                    }),
                    backgroundColor: colorPalette[idx % colorPalette.length],
                    yAxisID: "y1",
                    order: 2,
                    datalabels: { display: false },
                }));

                // Calculate PGF averages across year levels per program
                const pgfAverages = programs.map(program => {
                    const pgfs = yearLevels.map(yearLevel => {
                        const programData = yearProgramTotals[yearLevel]?.[program] || {};
                        const pgf = programData?.epgf_average ?? 0; // Default to 0 if undefined
                        return pgf;
                    }).filter(val => val > 0); // Filter out invalid PGF values
                    return pgfs.length ? parseFloat((pgfs.reduce((a, b) => a + b, 0) / pgfs.length).toFixed(2)) : 0;
                });

                const lineDataset = {
                    type: "line",
              label: "PGF Average",
              data: pgfAverages,
              borderColor: "#FF474A",
              backgroundColor: "#FF474A",
              fill: false,
              tension: 0.4,
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: "#FF474A",
              pointBorderColor: "#FF474A",
              yAxisID: "y",
              order: 1,
              datalabels: { display: false },
                };

                // Set chart data
                setChartData({
                    labels: programs,
                    datasets: [lineDataset, ...barDatasets],
                });

            } catch (error) {
                console.error("Error fetching year totals:", error);
                setErrorMessage("Failed to fetch year totals.");
            } finally {
                setLoading(false);
            }
        };

        fetchYearTotals();
    }, [userDepartment, selectedSemester, selectedSchoolYear]);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        if (context.dataset.type === 'line') {
                            return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
                        }
                        return `${context.dataset.label}: ${context.parsed.y}%`;
                    }
                }
            },
            datalabels: {
                anchor: 'end',
                align: (context) => context.dataset.data[context.dataIndex] === 100 ? 'bottom' : 'top',
                formatter: (value, context) => context.dataset.type === 'line' ? value.toFixed(2) : `${value}%`,
                    font: { weight: 'bold' },
                    padding: { top: 10, bottom: 10 },
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: pgfMin,
                max: pgfMax,
                ticks: {
                    stepSize: 0.5,
                    callback: (value) => value.toFixed(2),
                },
                title: {
                    display: true,
                    text: 'PGF Average',
                }
            },
            y1: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: (value) => `${value}%`,
                    stepSize: 10
                },
                title: {
                    display: true,
                    text: 'Completion Rate (%)',
                },
                position: 'right',
                grid: { drawOnChartArea: false }
            },
            x: {
                title: { display: true, text: 'Programs' },
                stacked: false,
            }
        }
    };

    return (
        <div className="spark-chart-container">
        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
            <div className="spark-chart-title">
            <h2>{userDepartment} EIE Spark Performance</h2>
            <p>Target Completion Rate: 100%</p>
            </div>
            <GraphDropdown
            selectedSchoolYear={selectedSchoolYear}
            setSelectedSchoolYear={setSelectedSchoolYear}
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <Bar data={chartData} options={options} />
            </>
        )}
        </div>
    );
};

export default EieSparkPerformance;
