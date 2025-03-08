import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import "./eie-performance-summary.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceSummary = () => {
    const [ratings, setRatings] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [yAxisConfig, setYAxisConfig] = useState({});

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/performance-summary")
        .then((response) => {
            const data = response.data;

            setRatings(data.ratings);

            setChartData({
                labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
                datasets: [
                    {
                        label: "1st Year",
                        data: data["1st_year"],
                        borderColor: "rgba(255, 99, 132, 1)",
                         backgroundColor: "rgba(255, 99, 132, 0.2)",
                         fill: true,
                    },
                    {
                        label: "2nd Year",
                        data: data["2nd_year"],
                        borderColor: "rgba(54, 162, 235, 1)",
                         backgroundColor: "rgba(54, 162, 235, 0.2)",
                         fill: true,
                    },
                    {
                        label: "3rd Year",
                        data: data["3rd_year"],
                        borderColor: "rgba(255, 206, 86, 1)",
                         backgroundColor: "rgba(255, 206, 86, 0.2)",
                         fill: true,
                    },
                    {
                        label: "4th Year",
                        data: data["4th_year"],
                        borderColor: "rgba(75, 192, 192, 1)",
                         backgroundColor: "rgba(75, 192, 192, 0.2)",
                         fill: true,
                    },
                ],
            });

            // Set Y-axis configuration using the unique ratings
            setYAxisConfig({
                min: Math.min(...data.ratings), // Set min as the lowest rating
                max: Math.max(...data.ratings), // Set max as the highest rating
            });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const options = {
        responsive: true,
        scales: {
            y: {
                min: yAxisConfig.min,
                max: yAxisConfig.max,
                ticks: {
                    stepSize: yAxisConfig.stepSize,
                    callback: function(value) {
                        if (typeof value === 'number') {
                            return value.toFixed(2);
                        }
                        return value;
                    }
                }
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="student-dashboard-card-3 card-3" style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
        <h2 className="card-title" style={{ marginBottom: "20px" }}>EIE Performance Summary</h2>
        <div style={{ width: "100%" }}>
        {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
        </div>
        </div>
    );
};

export default PerformanceSummary;
