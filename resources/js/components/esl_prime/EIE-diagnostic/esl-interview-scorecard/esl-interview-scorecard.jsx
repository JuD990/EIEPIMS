import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../sidebar/esl-sidebar";
import UserInfo from '@user-info/User-info';
import "./esl-interview-scorecard.css";
import Table from "./table/interview-scorecard-table";
import InterviewScorecardButtons from "./interview-scorecard-buttons/interview-scorecard-buttons";

const eslPrimeDiagnostics = () => {
    const [version, setVersion] = useState(null);
    const [students, setStudents] = useState([]); // Store students
    const [loading, setLoading] = useState(true); // Loading state
    const [options, setOptions] = useState({
        consistency: [],
        clarity: [],
        articulation: [],
        intonationAndStress: [],
        accuracy: [],
        clarityOfThought: [],
        syntax: [],
        qualityOfResponse: [],
        detailOfResponse: []
    });

    useEffect(() => {
        // Load saved state from localStorage
        const savedStates = localStorage.getItem('submittedRows');
        if (savedStates) {
            setStudents(JSON.parse(savedStates));
        }
    }, []);

    useEffect(() => {
        // Save states to localStorage
        localStorage.setItem('submittedRows', JSON.stringify(students));
    }, [students]);

    // Fetch version and options data for each category
    useEffect(() => {
        const fetchVersionAndOptions = async () => {
            try {
                const versionResponse = await axios.get('/api/rubric/active-version');
                const versionString = versionResponse.data.version;

                if (!versionString) {
                    console.error("No version found in the response", versionResponse.data);
                    return;
                }

                const versionMatch = versionString.match(/^v(\d+)/);
                if (versionMatch) {
                    const majorVersion = versionMatch[1];
                    setVersion(majorVersion);
                    await fetchOptions(majorVersion);
                } else {
                    console.error("Version string doesn't match the expected format:", versionString);
                }
            } catch (error) {
                console.error("Error fetching version:", error);
            }
        };

        const fetchOptions = async (version) => {
            const categories = [
                'consistency', 'clarity', 'articulation', 'intonationStress', 'accuracy',
                'clarityOfThought', 'syntax', 'qualityOfResponse', 'detailOfResponse'
            ];

            const newOptions = {};

            try {
                // Fetch all categories in parallel
                await Promise.all(
                    categories.map(async (category) => {
                        const response = await axios.get(`/api/${category}/${version}`);
                        if (response.status === 200 && Array.isArray(response.data)) {
                            newOptions[category] = response.data.map(item => ({
                                id: item.id,
                                pronunciation: item.pronunciation,
                                rating: item.rating,
                                descriptor: item.descriptor,
                            }));
                        } else {
                            console.error(`${category} options not found or response data is not an array`);
                        }
                    })
                );

                setOptions(newOptions); // Update options in state
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error("Error fetching options:", error);
                setLoading(false);
            }
        };

        if (!version) {
            fetchVersionAndOptions();
        }
    }, [version]);

    const calculateAverage = (category, student) => {
        const selectedOptions = options[category]?.find(option => option.id === student[category]);
        return selectedOptions ? parseFloat(selectedOptions.rating.replace(',', '.')) : 0;
    };

    const calculateProficiency = (pronunciationAvg, grammarAvg, fluencyAvg) => {
        const epgfAverage = (pronunciationAvg + grammarAvg + fluencyAvg) / 3;
        const proficiencyLevels = [
            { threshold: 0.0, level: 'Beginning', color: '#E23F44' },
            { threshold: 0.5, level: 'Low Acquisition', color: '#E23F44' },
            { threshold: 0.75, level: 'High Acquisition', color: '#E23F44' },
            { threshold: 1.0, level: 'Emerging', color: '#FFCD56' },
            { threshold: 1.25, level: 'Low Developing', color: '#FFCD56' },
            { threshold: 1.5, level: 'High Developing', color: '#FFCD56' },
            { threshold: 1.75, level: 'Low Proficient', color: '#FFCD56' },
            { threshold: 2.0, level: 'Proficient', color: 'green' },
            { threshold: 2.25, level: 'High Proficient', color: 'green' },
            { threshold: 2.5, level: 'Advanced', color: 'green' },
            { threshold: 3.0, level: 'High Advanced', color: '#00008B' },
            { threshold: 4.0, level: 'Native/Bilingual', color: '#00008B' },
        ];

        const matchedLevel = proficiencyLevels.find(entry => epgfAverage <= entry.threshold);
        return matchedLevel ? { level: matchedLevel.level, color: matchedLevel.color } : { level: 'Unknown', color: 'black' };
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <Sidebar />
        <UserInfo />
        <br /><br /><br /><br /><br />
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#383838' }}>EIE Diagnostics</h1>
        <div className="esl-interview-scorecard-container">
        <InterviewScorecardButtons />
        <Table />
        </div>

        </div>
    );
};

export default eslPrimeDiagnostics;
