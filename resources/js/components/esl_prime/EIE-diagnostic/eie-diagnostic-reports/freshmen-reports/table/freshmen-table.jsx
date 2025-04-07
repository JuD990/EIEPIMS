import React, { useEffect } from "react";
import './freshmen-table.css';

// Sample data
const data = [
    {
        Name: 'Kobe Bryant',
        DateOfInterview: '2025-04-01',
        TimeOfInterview: '10:00 AM',
        Venue: 'Room 101',
        Department: 'Engineering',
        Interviewer: 'Jane Smith',
        Consistency: 'Good',
        Clarity: 'Excellent',
        Articulation: 'Average',
        IntonationAndStress: 'Good',
        AverageInPronunciation: '80%',
        Accuracy: '90%',
        ClarityOfThought: 'Excellent',
        Syntax: 'Good',
        AverageInGrammar: '85%',
        QualityOfResponse: 'Excellent',
        DetailOfResponse: 'Good',
        AverageInFluency: '80%',
        AveragePGFRating: '4.5',
        PGFSpecificRemarks: 'Needs improvement in clarity.',
        SchoolYearHighlight: 'Top of class.',
        SchoolYearLowlight: 'Missed some assignments.',
        SPARKHighlight: 'Excellent teamwork.',
        SPARKLowlight: 'Struggled with group work.',
        UsageInSchoolOnline: 'Regular use during online classes.',
        UsageOffline: 'Occasionally uses tech at home.',
        SupportNeeded: 'No additional support needed.',
        ShowStatus: 'Showed Up',
    },
    {
        Name: 'Micheal Jordan',
        DateOfInterview: '2025-04-01',
        TimeOfInterview: '10:00 AM',
        Venue: 'Room 101',
        Department: 'Engineering',
        Interviewer: 'Jane Smith',
        Consistency: 'Good',
        Clarity: 'Excellent',
        Articulation: 'Average',
        IntonationAndStress: 'Good',
        AverageInPronunciation: '80%',
        Accuracy: '90%',
        ClarityOfThought: 'Excellent',
        Syntax: 'Good',
        AverageInGrammar: '85%',
        QualityOfResponse: 'Excellent',
        DetailOfResponse: 'Good',
        AverageInFluency: '80%',
        AveragePGFRating: '4.5',
        PGFSpecificRemarks: 'Needs improvement in clarity.',
        SchoolYearHighlight: 'Top of class.',
        SchoolYearLowlight: 'Missed some assignments.',
        SPARKHighlight: 'Excellent teamwork.',
        SPARKLowlight: 'Struggled with group work.',
        UsageInSchoolOnline: 'Regular use during online classes.',
        UsageOffline: 'Occasionally uses tech at home.',
        SupportNeeded: 'No additional support needed.',
        ShowStatus: 'Showed Up',
    },
    {
        Name: 'Shaq Oneal',
        DateOfInterview: '2025-04-01',
        TimeOfInterview: '10:00 AM',
        Venue: 'Room 101',
        Department: 'Engineering',
        Interviewer: 'Jane Smith',
        Consistency: 'Good',
        Clarity: 'Excellent',
        Articulation: 'Average',
        IntonationAndStress: 'Good',
        AverageInPronunciation: '80%',
        Accuracy: '90%',
        ClarityOfThought: 'Excellent',
        Syntax: 'Good',
        AverageInGrammar: '85%',
        QualityOfResponse: 'Excellent',
        DetailOfResponse: 'Good',
        AverageInFluency: '80%',
        AveragePGFRating: '4.5',
        PGFSpecificRemarks: 'Needs improvement in clarity.',
        SchoolYearHighlight: 'Top of class.',
        SchoolYearLowlight: 'Missed some assignments.',
        SPARKHighlight: 'Excellent teamwork.',
        SPARKLowlight: 'Struggled with group work.',
        UsageInSchoolOnline: 'Regular use during online classes.',
        UsageOffline: 'Occasionally uses tech at home.',
        SupportNeeded: 'No additional support needed.',
        ShowStatus: 'Showed Up',
    },
// Add more sample rows as needed
];

const columns = [
    'Name', 'Date of Interview', 'Time of Interview', 'Venue', 'Department', 'Interviewer',
'Consistency', 'Clarity', 'Articulation', 'Intonation and Stress', 'Average in Pronunciation',
'Accuracy', 'Clarity of Thought', 'Syntax', 'Average in Grammar', 'Quality of Response',
'Detail of Response', 'Average in Fluency', 'Average PGF Rating', 'PGF Specific Remarks',
'School Year Highlight', 'School Year Lowlight', 'SPARK Highlight', 'SPARK Lowlight',
'Usage in School/Online (When in School)', 'Usage Offline (Home or Outside)', 'Support Needed', 'Show Status'
];

// Mapping column names to data object keys
const columnToKeyMapping = {
    'Name': 'Name',
    'Date of Interview': 'DateOfInterview',
    'Time of Interview': 'TimeOfInterview',
    'Venue': 'Venue',
    'Department': 'Department',
    'Interviewer': 'Interviewer',
    'Consistency': 'Consistency',
    'Clarity': 'Clarity',
    'Articulation': 'Articulation',
    'Intonation and Stress': 'IntonationAndStress',
    'Average in Pronunciation': 'AverageInPronunciation',
    'Accuracy': 'Accuracy',
    'Clarity of Thought': 'ClarityOfThought',
    'Syntax': 'Syntax',
    'Average in Grammar': 'AverageInGrammar',
    'Quality of Response': 'QualityOfResponse',
    'Detail of Response': 'DetailOfResponse',
    'Average in Fluency': 'AverageInFluency',
    'Average PGF Rating': 'AveragePGFRating',
    'PGF Specific Remarks': 'PGFSpecificRemarks',
    'School Year Highlight': 'SchoolYearHighlight',
    'School Year Lowlight': 'SchoolYearLowlight',
    'SPARK Highlight': 'SPARKHighlight',
    'SPARK Lowlight': 'SPARKLowlight',
    'Usage in School/Online (When in School)': 'UsageInSchoolOnline',
    'Usage Offline (Home or Outside)': 'UsageOffline',
    'Support Needed': 'SupportNeeded',
    'Show Status': 'ShowStatus'
};

const Table = ({ department, attendance, schoolYear, searchQuery }) => {

    // Filter data based on searchQuery
    const filteredData = data.filter(row => {
        return columns.some(column => {
            const key = columnToKeyMapping[column];
            return row[key] && row[key].toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    });

    useEffect(() => {
        console.log("Department:", department);
        console.log("Attendance:", attendance);
        console.log("School Year:", schoolYear);
        // You can filter or fetch data here based on department/attendance
    }, [department, attendance, schoolYear, searchQuery]);

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
            {columns.map((column, colIndex) => (
                <td
                key={colIndex}
                className={colIndex === 0 ? "freshmen-sticky-col" : ""}
                >
                {row[columnToKeyMapping[column]]}
                </td>
            ))}
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    );
};

export default Table;
