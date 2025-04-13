import React, { useState, useEffect } from "react";
import axios from "axios";  // Import axios
import './freshmen-table.css';

// Mapping column names to data object keys
const columnToKeyMapping = {
    'Name': 'name',
    'Date of Interview': 'date_of_interview',
    'Time of Interview': 'time_of_interview',
    'Venue': 'venue',
    'Department': 'department',
    'Interviewer': 'interviewer',
    'Consistency': 'consistency_descriptor',
    'Clarity': 'clarity_descriptor',
    'Articulation': 'articulation_descriptor',
    'Intonation and Stress': 'intonation_and_stress_descriptor',
    'Average in Pronunciation': 'pronunciation_average',
    'Accuracy': 'accuracy_descriptor',
    'Clarity of Thought': 'clarity_of_thought_descriptor',
    'Syntax': 'syntax_descriptor',
    'Average in Grammar': 'grammar_average',
    'Quality of Response': 'quality_of_response_descriptor',
    'Detail of Response': 'detail_of_response_descriptor',
    'Average in Fluency': 'fluency_average',
    'Average PGF Rating': 'average_pgf_rating',
    'PGF Specific Remarks': 'pgf_specific_remarks',
    'School Year Highlight': 'school_year_highlight',
    'School Year Lowlight': 'school_year_lowlight',
    'SPARK Highlight': 'spark_highlight',
    'SPARK Lowlight': 'spark_lowlight',
    'Usage in School/Online (When in School)': 'usage_in_school_online',
    'Usage Offline (Home or Outside)': 'usage_offline',
    'Support Needed': 'support_needed',
    'Show Status': 'show_status'
};

const Table = ({ department, attendance, schoolYear, searchQuery }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('Department:', department);
        console.log('Attendance:', attendance);
        console.log('School Year:', schoolYear);
    }, [department, attendance, schoolYear]);

    useEffect(() => {
        if (department && attendance && schoolYear) {
            fetchReports();
        }
    }, [department, attendance, schoolYear]);


    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/reports/first-year-diagnostic-report', {
                params: {
                    department,
                    status: attendance,
                    school_year: schoolYear
                }
            });

            // Log the response data to check its structure
            console.log("Response Data:", response.data);

            // Ensure the response data is an array before setting state
            if (Array.isArray(response.data)) {
                setData(response.data);  // Set the fetched data
            } else {
                console.error("Expected an array, but got:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const filteredData = Array.isArray(data) ? data.filter(row => {
        return Object.keys(row).some(key => {
            return row[key] && row[key].toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    }) : [];

    return (
        <div className="freshmen-table-container">
        <table border="1" cellPadding="10">
        <thead>
        <tr>
        <th colSpan="6"></th>
        <th colSpan="5" style={{ textAlign: 'center', fontSize: '24px' }}>Pronunciation</th>
        <th colSpan="4" style={{ textAlign: 'center', fontSize: '24px' }}>Grammar</th>
        <th colSpan="3" style={{ textAlign: 'center', fontSize: '24px' }}>Fluency</th>
        <th colSpan="10"></th>
        </tr>
        <tr>
        <th className="freshmen-sticky-col freshmen-sticky-header">Name</th>
        <th>Date of Interview</th>
        <th>Time of Interview</th>
        <th>Venue</th>
        <th>Department</th>
        <th>Interviewer</th>
        <th>Consistency</th>
        <th>Clarity</th>
        <th>Articulation</th>
        <th>Intonation and Stress</th>
        <th>Average in Pronunciation</th>
        <th>Accuracy</th>
        <th>Clarity of Thought</th>
        <th>Syntax</th>
        <th>Average in Grammar</th>
        <th>Quality of Response</th>
        <th>Detail of Response</th>
        <th>Average in Fluency</th>
        <th>Average PGF Rating</th>
        <th>PGF Specific Remarks</th>
        <th>School Year Highlight</th>
        <th>School Year Lowlight</th>
        <th>SPARK Highlight</th>
        <th>SPARK Lowlight</th>
        <th>Usage in School/Online <br/> (When in School)</th>
        <th>Usage Offline <br/> (Home or Outside)</th>
        <th>Support Needed</th>
        <th>Show Status</th>
        </tr>
        </thead>
        <tbody>
        {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
            {/* Displaying Basic Info */}
            <td className="freshmen-sticky-col">{row.name}</td>
            <td>{row.date_of_interview}</td>
            <td>{row.time_of_interview}</td>
            <td>{row.venue}</td>
            <td>{row.department}</td>
            <td>{row.interviewer}</td>

            {/* Displaying Consistency */}
            <td>
            {/* Display rating at the top with increased font size */}
            {row.consistency_rating && <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{row.consistency_rating}</div>}

            {row.consistency_descriptor && row.consistency_descriptor.split('-').map((part, index, arr) => (
                <span key={index}>
                {part}
                {index !== arr.length - 1 && <br />} {/* Add line break between parts */}
                </span>
            ))}
            </td>

            {/* Displaying Clarity */}
            <td>
            {/* Display rating at the top with increased font size */}
            {row.clarity_rating && <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{row.clarity_rating}</div>}

            {row.clarity_descriptor && row.clarity_descriptor.split('-').map((part, index, arr) => (
                <span key={index}>
                {part}
                {index !== arr.length - 1 && <br />} {/* Add line break between parts */}
                </span>
            ))}
            </td>

            {/* Displaying Articulation */}
            <td>
            {/* Display rating at the top with increased font size */}
            {row.articulation_rating && <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{row.articulation_rating}</div>}

            {row.articulation_descriptor && row.articulation_descriptor.split('-').map((part, index, arr) => (
                <span key={index}>
                {part}
                {index !== arr.length - 1 && <br />} {/* Add line break between parts */}
                </span>
            ))}
            </td>

            {/* Displaying Intonation and Stress */}
            <td>
            {/* Display rating at the top with increased font size */}
            {row.intonation_and_stress_rating && <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{row.intonation_and_stress_rating}</div>}

            {row.intonation_and_stress_descriptor && row.intonation_and_stress_descriptor.split('-').map((part, index, arr) => (
                <span key={index}>
                {part}
                {index !== arr.length - 1 && <br />} {/* Add line break between parts */}
                </span>
            ))}
            </td>

            {/* Displaying Pronunciation Average */}
            <td>
            {row.pronunciation_average || ''} {/* Display the average or empty if null */}
            </td>

            {/* Displaying Accuracy */}
            <td>
            {/* Display rating at the top with increased font size */}
            {row.accuracy_rating && <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{row.accuracy_rating}</div>}

            {row.accuracy_descriptor && row.accuracy_descriptor.split('-').map((part, index, arr) => (
                <span key={index}>
                {part}
                {index !== arr.length - 1 && <br />} {/* Add line break between parts */}
                </span>
            ))}
            </td>

            {/* Displaying Clarity of Thought */}
            <td>
            {/* Display rating at the top with increased font size */}
            {row.clarity_of_thought_rating && <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{row.clarity_of_thought_rating}</div>}

            {row.clarity_of_thought_descriptor && row.clarity_of_thought_descriptor.split('-').map((part, index, arr) => (
                <span key={index}>
                {part}
                {index !== arr.length - 1 && <br />} {/* Add line break between parts */}
                </span>
            ))}
            </td>

            {/* Displaying Syntax */}
            <td>
            {/* Display rating at the top with increased font size */}
            {row.syntax_rating && <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{row.syntax_rating}</div>}

            {row.syntax_descriptor && row.syntax_descriptor.split('-').map((part, index, arr) => (
                <span key={index}>
                {part}
                {index !== arr.length - 1 && <br />} {/* Add line break between parts */}
                </span>
            ))}
            </td>

            {/* Displaying Grammar Average */}
            <td>
            {row.grammar_average || ''} {/* Display the average or empty if null */}
            </td>

            {/* Displaying Quality of Response */}
            <td>
            {/* Display rating at the top with increased font size */}
            {row.quality_of_response_rating && <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{row.quality_of_response_rating}</div>}

            {row.quality_of_response_descriptor && row.quality_of_response_descriptor.split('-').map((part, index, arr) => (
                <span key={index}>
                {part}
                {index !== arr.length - 1 && <br />} {/* Add line break between parts */}
                </span>
            ))}
            </td>

            {/* Displaying Detail of Response */}
            <td>
            {/* Display rating at the top with increased font size */}
            {row.detail_of_response_rating && <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{row.detail_of_response_rating}</div>}

            {row.detail_of_response_descriptor && row.detail_of_response_descriptor.split('-').map((part, index, arr) => (
                <span key={index}>
                {part}
                {index !== arr.length - 1 && <br />} {/* Add line break between parts */}
                </span>
            ))}
            </td>

            {/* Displaying Fluency Average */}
            <td>
            {row.fluency_average || ''} {/* Display the average or empty if null */}
            </td>


            <td>{row.average_pgf_rating}</td>
            <td>{row.pgf_specific_remarks}</td>
            <td>{row.school_year_highlight}</td>
            <td>{row.school_year_lowlight}</td>
            <td>{row.spark_highlight}</td>
            <td>{row.spark_lowlight}</td>
            <td>{row.usage_in_school_online}</td>
            <td>{row.usage_offline}</td>
            <td>{row.support_needed}</td>
            <td>{row.show_status}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    );
};

export default Table;
