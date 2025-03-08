import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./HeadPOCTableComponent.css";

const TableComponent = () => {
    const [target, setTarget] = useState(100);
    const [department, setDepartment] = useState(null);
    const [enrollmentCount, setEnrollmentCount] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const months = ["August", "September", "October", "November", "December"];

    useEffect(() => {
        const fetchDepartmentAndData = async () => {
            try {
                const storedEmployeeId = localStorage.getItem("employee_id");
                const storedUserType = localStorage.getItem("userType");

                if (!storedEmployeeId || !storedUserType) {
                    setErrorMessage("Missing employee ID or user type.");
                    setLoading(false);
                    return;
                }

                // Fetch department
                const { data: departmentData } = await axios.get(
                    `/api/employee-department/${storedUserType}/${storedEmployeeId}`
                );

                if (!departmentData?.success) {
                    setErrorMessage(departmentData?.message || "Failed to fetch department.");
                    setLoading(false);
                    return;
                }

                setDepartment(departmentData.department);

                // Fetch enrollment data
                const { data: enrollmentData } = await axios.get(
                    `/api/programs-with-enrollment-first-semester/${departmentData.department}`
                );

                if (!enrollmentData?.success) {
                    setErrorMessage(enrollmentData?.message || "Failed to fetch enrollment data.");
                    setLoading(false);
                    return;
                }

                setEnrollmentCount(enrollmentData.enrollmentCount);
            } catch (error) {
                console.error("Error fetching data:", error);
                setErrorMessage("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDepartmentAndData();
    }, []);

    const calculateYearLevelTotals = (yearLevel) => {
        let totals = {};

        months.forEach((month) => {
            let totalSubmitted = 0;
            let totalCompletionRate = 0;
            let totalPGFAverage = 0;
            let count = 0;
            let topChampion = { name: "N/A", epgf_average: 0 };

            Object.values(enrollmentCount[yearLevel] || {}).forEach((programData) => {
                if (programData[month]) {
                    totalSubmitted += programData[month].submitted || 0;
                    totalCompletionRate += parseFloat(programData[month].completion_rate) || 0;
                    totalPGFAverage += parseFloat(programData[month].epgf_average) || 0;
                    count++;

                    // Ensure the champion is determined per month, per year level
                    if (programData[month].champion !== "N/A" && programData[month].epgf_average > topChampion.epgf_average) {
                        topChampion = {
                            name: programData[month].champion,
                            epgf_average: programData[month].epgf_average,
                        };
                    }
                }
            });

            totals[month] = {
                totalSubmitted,
                totalCompletionRate: count ? (totalCompletionRate / count).toFixed(2) : "0.00",
                       totalPGFAverage: count ? (totalPGFAverage / count).toFixed(2) : "0.00",
                       champion: topChampion.name || "N/A", // Store the top champion per month per year level
            };
        });

        return totals;
    };

    const calculateGrandTotal = () => {
        let grandTotals = {};

        months.forEach((month) => {
            let grandTotalSubmitted = 0;
            let grandTotalCompletionRate = 0;
            let grandTotalPGFAverage = 0;
            let count = 0;
            let overallChampion = { name: "N/A", epgf_average: 0 };

            Object.keys(enrollmentCount).forEach((yearLevel) => {
                const yearTotals = calculateYearLevelTotals(yearLevel)[month];
                grandTotalSubmitted += yearTotals.totalSubmitted;
                grandTotalCompletionRate += parseFloat(yearTotals.totalCompletionRate);
                grandTotalPGFAverage += parseFloat(yearTotals.totalPGFAverage);
                count++;

                // Ensure the overall department champion is chosen per month
                if (yearTotals.champion !== "N/A" && yearTotals.epgf_average > overallChampion.epgf_average) {
                    overallChampion = {
                        name: yearTotals.champion,
                        epgf_average: yearTotals.epgf_average,
                    };
                }
            });

            grandTotals[month] = {
                grandTotalSubmitted,
                grandTotalCompletionRate: count ? (grandTotalCompletionRate / count).toFixed(2) : "0.00",
                       grandTotalPGFAverage: count ? (grandTotalPGFAverage / count).toFixed(2) : "0.00",
                       champion: overallChampion.name || "N/A", // Overall department champion per month
            };
        });

        return grandTotals;
    };

    const grandTotal = useMemo(() => calculateGrandTotal(), [enrollmentCount]);

    if (loading) return <div className="spinner"></div>;

    const epgfProficiencyLevels = [
        { threshold: 0.00, level: "Beginning", color: "rgb(226, 63, 68)" },
        { threshold: 0.50, level: "Low Acquisition", color: "rgb(226, 63, 68)" },
        { threshold: 0.75, level: "High Acquisition", color: "rgb(226, 63, 68)" },
        { threshold: 1.00, level: "Emerging", color: "#FFCD56" },
        { threshold: 1.25, level: "Low Developing", color: "#FFCD56" },
        { threshold: 1.50, level: "High Developing", color: "#FFCD56" },
        { threshold: 1.75, level: "Low Proficient", color: "#FFCD56" },
        { threshold: 2.00, level: "Proficient", color: "green" },
        { threshold: 2.25, level: "High Proficient", color: "green" },
        { threshold: 2.50, level: "Advanced", color: "green" },
        { threshold: 3.00, level: "High Advanced", color: "#00008B" },
        { threshold: 4.00, level: "Native/Bilingual", color: "#00008B" },
    ];

    const getProficiencyLevel = (epgfAverage) => {
        for (let i = 0; i < epgfProficiencyLevels.length; i++) {
            const current = epgfProficiencyLevels[i];
            const previous = epgfProficiencyLevels[i - 1];

            if (
                (previous ? epgfAverage > previous.threshold : true) &&
                epgfAverage <= current.threshold
            ) {
                return { level: current.level, color: current.color };
            }
        }
        return { level: "Unknown", color: "black" };
    };

    const getCompletionExpectation = (completionRate) => {
        return parseFloat(completionRate) === 100 ? "Meets Expectation" : "Below Expectation";
    };


    return (
        <div className="dashboard-college-poc-container">
        <table className="dashboard-college-poc-table">
        <thead>
        {/* First header row for month grouping */}
        <tr>
        <th rowSpan="2">Year Level</th>
        <th rowSpan="2">Course</th>
        <th rowSpan="2">Expected Submissions</th>
        <th rowSpan="2">Target</th>
        <th rowSpan="2">Implementing Subjects</th>
        {months.map((month) => (
            <th key={month} colSpan="4" style={{ textAlign: "center" }}>{month}</th>
        ))}
        </tr>

        {/* Second header row for individual columns under each month */}
        <tr className="dashboard-college-poc-header-colored">
        {months.map(() => (
            <React.Fragment key={Math.random()}>
            <th>Submitted</th>
            <th>
            Completion Rate <br />
            <small style={{ fontWeight: "normal" }}>(Expectation)</small>
            </th>
            <th>
            PGF Average <br />
            <small style={{ fontWeight: "normal" }}>(Proficiency Level)</small>
            </th>
            <th>SPARK Champion</th>
            </React.Fragment>
        ))}
        </tr>
        </thead>
        <tbody>
        {Object.keys(enrollmentCount).map((yearLevel) => {
            let yearLevelTotalEnrolled = 0; // Track total enrolled per year level

            return (
                <React.Fragment key={yearLevel}>
                {Object.keys(enrollmentCount[yearLevel]).map((program, index) => {
                    const programData = enrollmentCount[yearLevel][program];
                    yearLevelTotalEnrolled += programData.total_enrolled || 0; // Accumulate total enrolled

                    return (
                        <tr key={index}>
                        <td>{yearLevel}</td>
                        <td>{program || "N/A"}</td>
                        <td>{programData.total_enrolled || 0}</td> {/* Expected Submissions */}
                        <td>{target}%</td>
                        <td>{programData.course_titles.join(", ") || "N/A"}</td>
                        {months.map((month) => (
                            <React.Fragment key={month}>
                            <td>{programData[month]?.submitted || 0}</td>
                            <td>
                            {programData[month]?.completion_rate || "0.00"}<br />
                            <small style={{ color: programData[month]?.completion_rate_expectation === "Meets Expectation" ? "green" : "black" }}>
                            {programData[month]?.completion_rate_expectation || "N/A"}
                            </small>
                            </td>
                            <td>
                            {programData[month]?.epgf_average || "0.00"} <br />
                            <small>{programData[month]?.proficiency_level || "N/A"}</small>
                            </td>
                            <td>{programData[month]?.champion || "N/A"}</td>
                            </React.Fragment>
                        ))}
                        </tr>
                    );
                })}

                {/* Year Level Total Row */}
                <tr className="year-level-total">
                <td colSpan="2">{yearLevel} Total</td>
                <td>{Object.values(enrollmentCount[yearLevel]).reduce((sum, program) => sum + (program.total_enrolled || 0), 0)}</td>
                <td>100%</td>
                <td></td>
                {months.map((month) => {
                    const totals = calculateYearLevelTotals(yearLevel)[month];
                    const proficiency = getProficiencyLevel(parseFloat(totals.totalPGFAverage));
                    return (
                        <React.Fragment key={month}>
                        <td>{totals.totalSubmitted}</td>
                        <td>
                        <span>
                        {totals.totalCompletionRate}%
                        </span>
                        <br />
                        <span>
                        {getCompletionExpectation(totals.totalCompletionRate)}
                        </span>
                        </td>
                        <td>
                        <span>
                        {totals.totalPGFAverage}
                        </span>
                        <br />
                        <span>
                        {proficiency.level}
                        </span>
                        </td>
                        <td>{totals.champion || "N/A"}</td>
                        </React.Fragment>
                    );
                })}
                </tr>
                </React.Fragment>
            );
        })}
        {/* Grand Total Row */}
        <tr className="grand-total">
        <td colSpan="2">{department} Total</td>
        <td>{Object.keys(enrollmentCount).reduce((sum, yearLevel) => sum + Object.values(enrollmentCount[yearLevel]).reduce((s, program) => s + (program.total_enrolled || 0), 0), 0)}</td>
        <td>100%</td>
        <td></td>
        {months.map((month) => {
            const totals = grandTotal[month];
            const proficiency = getProficiencyLevel(parseFloat(totals.grandTotalPGFAverage));
            return (
                <React.Fragment key={month}>
                <td>{totals.grandTotalSubmitted}</td>
                <td>
                <span>
                {totals.grandTotalCompletionRate}%
                </span>
                <br />
                <span>
                {getCompletionExpectation(totals.grandTotalCompletionRate)}
                </span>
                </td>
                <td>
                <span>
                {totals.grandTotalPGFAverage}
                </span>
                <br />
                <span>
                {proficiency.level}
                </span>
                </td>
                <td>{totals.champion || "N/A"}</td>
                </React.Fragment>
            );
        })}
        </tr>
        </tbody>

        </table>
        </div>
    );
};

export default TableComponent;
