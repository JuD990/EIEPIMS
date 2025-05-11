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
import axios from "axios";

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

const generateEmptyChartData = (labels) => ({
    labels,
    datasets: [
        {
            type: "line",
            label: "PGF Average",
            data: Array(labels.length).fill(0),
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
        },
        {
            type: "bar",
            label: "Completion Rate",
            data: Array(labels.length).fill(0),
                                            backgroundColor: "#42a5f5",
                                            order: 2,
                                            yAxisID: "y2",
        },
    ],
});

const semesterMonths = {
    "1st Semester": ["August", "September", "October", "November", "December"],
    "2nd Semester": ["January", "February", "March", "April", "May"],
};

const ImpSubjectsPerformance = () => {
    const currentMonth = new Date().getMonth();
    const defaultSemester = currentMonth >= 8 && currentMonth <= 12 ? "1st Semester" : "2nd Semester";
    const defaultSchoolYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

    const [selectedSchoolYear, setSelectedSchoolYear] = useState(defaultSchoolYear);
    const [selectedSemester, setSelectedSemester] = useState(defaultSemester);
    const [chartTitle, setChartTitle] = useState('');
    const [chartData, setChartData] = useState(generateEmptyChartData([]));
    const [classData, setClassData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [pgfMin, setPgfMin] = useState(undefined);
    const [pgfMax, setPgfMax] = useState(undefined);


    useEffect(() => {
        const fetchInitialClassData = async () => {
            try {
                const employee_id = localStorage.getItem("employee_id");
                const classResponse = await axios.get(`/api/implementing-subject-graph/${employee_id}`);

                if (classResponse.data.success) {
                    const data = classResponse.data.classData;
                    setClassData(data);
                    setChartTitle(prev => prev || (data[0]?.course_code ?? ""));
                } else {
                    setErrorMessage(classResponse.data.message);
                }
            } catch (error) {
                setErrorMessage("Error fetching class data.");
            }
        };

        fetchInitialClassData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!chartTitle || !selectedSemester || !selectedSchoolYear) return;

            setLoading(true);
            try {
                const ratingsResponse = await axios.get(`http://127.0.0.1:8000/api/performance-summary-rating`);
                const ratingsData = ratingsResponse.data.ratings;
                const pgfValues = ratingsData.map(r => parseFloat(r)).filter(val => !isNaN(val));

                if (pgfValues.length > 0) {
                    setPgfMin(Math.floor(Math.min(...pgfValues) * 10) / 10);
                    setPgfMax(Math.ceil(Math.max(...pgfValues) * 10) / 10);
                }

                const reportResponse = await axios.get(`/api/fetch-filtered-eie-reports`, {
                    params: {
                        course_code: chartTitle,
                        semester: selectedSemester,
                        school_year: selectedSchoolYear,
                    },
                });

                if (!reportResponse.data.success || reportResponse.data.data.length === 0) {
                    setErrorMessage(reportResponse.data.message || "No data found.");
                    setChartData(generateEmptyChartData(semesterMonths[selectedSemester]));
                    return;
                }

                const reportData = reportResponse.data.data;
                const labels = [];
                const completionRate = [];
                const pgfAverage = [];

                reportData.forEach((monthData) => {
                    labels.push(monthData.month);

                    if (!monthData.data || monthData.data.length === 0 || !monthData.data[0].epgf_average) {
                        completionRate.push(0);
                        pgfAverage.push("0.00");
                    } else {
                        const compRate = monthData.data.reduce((sum, item) => sum + parseFloat(item.completion_rate || 0), 0) / monthData.data.length;
                        const epgfAvg = monthData.data.reduce((sum, item) => sum + parseFloat(item.epgf_average || 0), 0) / monthData.data.length;

                        completionRate.push(parseFloat(compRate.toFixed(2)));
                        pgfAverage.push(epgfAvg.toFixed(2));
                    }
                });

                setChartData({
                    labels,
                    datasets: [
                        {
                            type: "line",
                            label: "PGF Average",
                            data: pgfAverage,
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
                        },
                        {
                            type: "bar",
                            label: "Completion Rate",
                            data: completionRate,
                            backgroundColor: "#42a5f5",
                            order: 2,
                            yAxisID: "y2",
                        },
                    ],
                });
            } catch (error) {
                setChartData(generateEmptyChartData(semesterMonths[selectedSemester]));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [chartTitle, selectedSemester, selectedSchoolYear]);

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
                        const datasetLabel = context.dataset.label;
                        const value = context.raw;
                        if (datasetLabel === 'Completion Rate') return `Completion Rate: ${value.toFixed(2)}%`;
                        if (datasetLabel === 'PGF Average') return `PGF Average: ${value}`;
                        return `${datasetLabel}: ${value}`;
                    },
                },
            },
            datalabels: { display: false },
        },
        scales: {
            y1: {
                type: "linear",
                position: "left",
                min: pgfMin,
                max: pgfMax,
                ticks: { stepSize: 0.5 },
                title: { display: true, text: "PGF Average" },
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
                title: { display: true, text: "Completion Rate" },
            },
        },
        interaction: {
            mode: 'nearest',
            intersect: false,
        },
    };

    return (
        <div className="chart-container">
        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
            <div className="title-dropdown-container">
            <select
            id="chart-title"
            value={chartTitle}
            onChange={handleTitleChange}
            className="title-dropdown"
            disabled={classData.length === 0}
            >
            {classData.length === 0 ? (
                <option value="">No Assigned Subject</option>
            ) : (
                classData.map((course, index) => (
                    <option key={index} value={course.course_code}>
                    {course.course_title} ({course.course_code})
                    </option>
                ))
            )}
            </select>
            </div>

            <div className="dropdown-wrapper">
            <GraphDropdown
            selectedSchoolYear={selectedSchoolYear}
            setSelectedSchoolYear={setSelectedSchoolYear}
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
            />
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <Chart type="bar" data={chartData} options={options} />
            </>
        )}
        </div>
    );
};

export default ImpSubjectsPerformance;
