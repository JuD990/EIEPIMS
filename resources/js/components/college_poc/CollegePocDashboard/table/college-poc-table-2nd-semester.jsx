import React, { useState, useEffect } from 'react';
import './CollegePOCTableComponent.css';
import axios from 'axios';

const TableComponent = () => {
    const [target, setTarget] = useState(100);
    const currentYear = new Date().getFullYear();
    const [department, setDepartment] = useState(null);
    const [programs, setPrograms] = useState({}); // Group programs by semester and year level
    const [enrollmentCount, setEnrollmentCount] = useState({}); // Holds enrollment count by program and year level
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartmentAndPrograms = async () => {
            try {
                // Retrieve stored values
                const storedEmployeeId = localStorage.getItem('employee_id');
                const storedUserType = localStorage.getItem('userType');

                if (!storedEmployeeId || !storedUserType) {
                    setLoading(false);
                    return;
                }

                // Fetch department
                const departmentResponse = await axios.get(
                    `/api/employee-department/${storedUserType}/${storedEmployeeId}`
                );

                if (departmentResponse.data?.success) {
                    const department = departmentResponse.data.department;
                    setDepartment(department);

                    // Fetch programs and enrollment counts for the department
                    const programsResponse = await axios.get(`/api/programs-with-enrollment-second-semester/${department}`);

                    if (programsResponse.data?.success) {
                        const programsData = programsResponse.data.programs;
                        const enrollmentData = programsResponse.data.enrollmentCount;

                        if (typeof programsData === 'object' && programsData !== null) {
                            console.log('Fetched programs data:', programsData);
                            console.log('Fetched enrollment count:', enrollmentData);

                            setPrograms(programsData);
                            setEnrollmentCount(enrollmentData);
                        } else {
                            setErrorMessage('Invalid data format received for programs.');
                        }
                    } else {
                        setErrorMessage(programsResponse.data?.message || 'Failed to fetch programs.');
                    }
                } else {
                    setErrorMessage(departmentResponse.data?.message || 'Failed to fetch department.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMessage('Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartmentAndPrograms();
    }, []);

    const getStudentCountForProgram = (program, yearLevel) => {
        // Get the total student count for the program and year level
        const count = enrollmentCount[yearLevel]?.[program]?.total_enrolled || 0;
        return count;
    };

    const calculateTotalRow = (yearLevel) => {
        let totalSubmitted = 0;
        let totalCompletionRate = 0;
        let totalPGFAverage = 0;
        let count = 0;

        Object.keys(enrollmentCount[yearLevel] || {}).forEach((program) => {
            totalSubmitted += getStudentCountForProgram(program, yearLevel);
            // You can replace the following with actual completion rate and PGF values
            totalCompletionRate += 0;  // Placeholder, calculate properly
            totalPGFAverage += 0;      // Placeholder, calculate properly
            count++;
        });

        return {
            totalSubmitted,
            totalCompletionRate: totalCompletionRate / count, // average if needed
            totalPGFAverage: totalPGFAverage / count, // average if needed
        };
    };

    // Calculate Grand Total for all Year Levels
    const calculateGrandTotal = () => {
        let grandTotalSubmitted = 0;
        let grandTotalCompletionRate = 0;
        let grandTotalPGFAverage = 0;
        let count = 0;

        Object.keys(enrollmentCount).forEach((yearLevel) => {
            const totals = calculateTotalRow(yearLevel);
            grandTotalSubmitted += totals.totalSubmitted;
            grandTotalCompletionRate += totals.totalCompletionRate;
            grandTotalPGFAverage += totals.totalPGFAverage;
            count++;
        });

        return {
            grandTotalSubmitted,
            grandTotalCompletionRate: grandTotalCompletionRate / count, // average
            grandTotalPGFAverage: grandTotalPGFAverage / count, // average
        };
    };

    // Handle loading and error
    if (loading) {
        return <div>Loading...</div>;
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    // Handle case when no programs are available
    if (Object.keys(programs).length === 0 || Object.values(programs).every((semester) => Object.keys(semester).length === 0)) {
        return (
            <div className="dashboard-college-poc-container">
            <div className="no-data-message">No Implementing Subjects available in your department.</div>
            </div>
        );
    }

    const grandTotal = calculateGrandTotal();

    return (
        <div className="dashboard-college-poc-container">
        <table className="dashboard-college-poc-table">
        <thead>
        <tr className="dashboard-college-poc-header-colored">
        <th colSpan="5" className="dashboard-college-poc-table-header-cell"></th>
        <th colSpan="4" className="dashboard-college-poc-table-header-cell" style={{ textAlign: 'center' }}>
        January {currentYear}
        </th>
        <th colSpan="4" className="dashboard-college-poc-table-header-cell" style={{ textAlign: 'center' }}>
        February {currentYear}
        </th>
        <th colSpan="4" className="dashboard-college-poc-table-header-cell" style={{ textAlign: 'center' }}>
        March {currentYear}
        </th>
        <th colSpan="4" className="dashboard-college-poc-table-header-cell" style={{ textAlign: 'center' }}>
        April {currentYear}
        </th>
        <th colSpan="4" className="dashboard-college-poc-table-header-cell" style={{ textAlign: 'center' }}>
        May {currentYear}
        </th>
        </tr>
        <tr className="dashboard-college-poc-header-plain" style={{ textAlign: 'center' }}>
        <th className="dashboard-college-poc-table-header-cell">Year Level</th>
        <th className="dashboard-college-poc-table-header-cell">Course</th>
        <th className="dashboard-college-poc-table-header-cell">Expected Submission(s)</th>
        <th className="dashboard-college-poc-table-header-cell">Target</th>
        <th className="dashboard-college-poc-table-header-cell">Implementing Subjects</th>

        <th className="dashboard-college-poc-table-header-cell">Submitted</th>
        <th className="dashboard-college-poc-table-header-cell">Completion Rate</th>
        <th className="dashboard-college-poc-table-header-cell">PGF Average</th>
        <th className="dashboard-college-poc-table-header-cell">Name of SPARK Champion</th>

        <th className="dashboard-college-poc-table-header-cell">Submitted</th>
        <th className="dashboard-college-poc-table-header-cell">Completion Rate</th>
        <th className="dashboard-college-poc-table-header-cell">PGF Average</th>
        <th className="dashboard-college-poc-table-header-cell">Name of SPARK Champion</th>

        <th className="dashboard-college-poc-table-header-cell">Submitted</th>
        <th className="dashboard-college-poc-table-header-cell">Completion Rate</th>
        <th className="dashboard-college-poc-table-header-cell">PGF Average</th>
        <th className="dashboard-college-poc-table-header-cell">Name of SPARK Champion</th>

        <th className="dashboard-college-poc-table-header-cell">Submitted</th>
        <th className="dashboard-college-poc-table-header-cell">Completion Rate</th>
        <th className="dashboard-college-poc-table-header-cell">PGF Average</th>
        <th className="dashboard-college-poc-table-header-cell">Name of SPARK Champion</th>

        <th className="dashboard-college-poc-table-header-cell">Submitted</th>
        <th className="dashboard-college-poc-table-header-cell">Completion Rate</th>
        <th className="dashboard-college-poc-table-header-cell">PGF Average</th>
        <th className="dashboard-college-poc-table-header-cell">Name of SPARK Champion</th>
        </tr>
        </thead>

        <tbody>
        {Object.keys(enrollmentCount).map((yearLevel) => (
            <React.Fragment key={yearLevel}>
            <tr>
            <td colSpan="5" style={{ fontWeight: 'bold', textAlign: 'left', backgroundColor: '#d9edf7' }}>
            {yearLevel}
            </td>
            <td colSpan="4" style={{ fontWeight: 'bold', textAlign: 'left', backgroundColor: '#d9edf7' }}>
            {yearLevel}
            </td>
            <td colSpan="4" style={{ fontWeight: 'bold', textAlign: 'left', backgroundColor: '#d9edf7' }}>
            {yearLevel}
            </td>
            <td colSpan="4" style={{ fontWeight: 'bold', textAlign: 'left', backgroundColor: '#d9edf7' }}>
            {yearLevel}
            </td>
            <td colSpan="4" style={{ fontWeight: 'bold', textAlign: 'left', backgroundColor: '#d9edf7' }}>
            {yearLevel}
            </td>
            <td colSpan="4" style={{ fontWeight: 'bold', textAlign: 'left', backgroundColor: '#d9edf7' }}>
            {yearLevel}
            </td>
            </tr>
            {Object.keys(enrollmentCount[yearLevel]).map((program, index) => {
                const studentCount = getStudentCountForProgram(program, yearLevel);
                return (
                    <tr key={index}>
                    <td>{yearLevel}</td>
                    <td>{program || 'N/A'}</td>
                    <td>{studentCount}</td> {/* Display expected submissions (student count) */}
                    <td>{target}%</td>
                    <td>{enrollmentCount[yearLevel][program]?.course_titles.join(', ') || 'N/A'}</td>

                    {/* January */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>



                    {/* Repeat for other months */}
                    </tr>
                );
            })}

            {/* Total Row for Year Level */}
            <tr style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
            <td colSpan="2" style={{ textAlign: 'left' }}>{yearLevel} Total</td>
            <td>{calculateTotalRow(yearLevel).totalSubmitted}</td>
            <td>100%</td>
            <td></td>

            <td></td>
            <td>
            <span style={{ backgroundColor: 'yellow', padding: '5px' }}>100.00%</span>
            <span style={{ backgroundColor: 'lightblue', padding: '5px' }}>Meets Expectation</span>
            </td>
            <td>
            <span style={{ backgroundColor: 'yellow', padding: '5px' }}>3.50</span>
            <span style={{ backgroundColor: 'lightblue', padding: '5px' }}>High Advanced</span>
            </td>
            <td></td>

            {/* Repeat for the other months */}
            </tr>
            </React.Fragment>
        ))}

        {/* Grand Total Row */}
        <tr style={{ fontWeight: 'bold', backgroundColor: '#d9edf7' }}>
        <td colSpan="2" style={{ textAlign: 'left' }}>{department} Total</td>
        <td>{grandTotal.grandTotalSubmitted}</td>
        <td>100%</td>
        <td></td>
        <td></td>
        {/* Repeat for the other months */}
        </tr>
        </tbody>
        </table>
        </div>
    );
};

export default TableComponent;
