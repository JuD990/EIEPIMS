import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../sidebar/esl-sidebar";
import UserInfo from '@user-info/User-info';
import "./esl-interview-scorecard.css";
import Table from "./table/interview-scorecard-table";
import InterviewScorecardButtons from "./interview-scorecard-buttons/interview-scorecard-buttons";

const eslPrimeDiagnostics = () => {
    const [version, setVersion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categoryAverages, setCategoryAverages] = useState({});
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

    const [ratings, setRatings] = useState({});
    const [overallAverage, setOverallAverage] = useState("0.00");
    const [dropdownValues, setDropdownValues] = useState({
        consistency: "",
        clarity: "",
        articulation: "",
        intonationAndStress: "",
        accuracy: "",
        clarityOfThought: "",
        syntax: "",
        qualityOfResponse: "",
        detailOfResponse: "",
    });

    const [remarks, setRemarks] = useState({
        "PGF Specific Remarks": "",
        "School Year Highlight": "",
        "School Year Lowlight": "",
        "SPARK Highlight": "",
        "SPARK Lowlight": "",
        "Usage in School/Online (When in School)": "",
        "Usage Offline (Home or Outside)": "",
        "Support Needed": ""
    });

    const handleClear = () => {
        setRatings({});
        setOverallAverage("0.00");
        setDropdownValues({
            consistency: "",
            clarity: "",
            articulation: "",
            intonationAndStress: "",
            accuracy: "",
            clarityOfThought: "",
            syntax: "",
            qualityOfResponse: "",
            detailOfResponse: "",
        });
        setRemarks({
            "PGF Specific Remarks": "",
            "School Year Highlight": "",
            "School Year Lowlight": "",
            "SPARK Highlight": "",
            "SPARK Lowlight": "",
            "Usage in School/Online (When in School)": "",
                   "Usage Offline (Home or Outside)": "",
                   "Support Needed": ""
        });
    };

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

                setOptions(newOptions);
            } catch (error) {
                console.error("Error fetching options:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!version) {
            fetchVersionAndOptions();
        }
    }, [version]);

    const handleOverallAverageChange = (avg) => {
        setOverallAverage(avg);
    };

    const handleCategoryAveragesChange = (averages) => {
        setCategoryAverages(averages);
    };

    return (
        <div>
        <Sidebar />
        <UserInfo />
        <br /><br /><br /><br /><br />
        <h1 style={{ fontFamily: 'Epilogue', fontWeight: 800, marginLeft: '340px', color: '#383838' }}>
        EIE Diagnostics
        </h1>

        <div className="esl-interview-scorecard-container">
        {loading && (
            <div style={{ textAlign: "center", padding: "5px", color: "#888" }}>
            EPGF Rubric version not set.
            </div>
        )}

        <InterviewScorecardButtons
        onClear={handleClear}
        overallAverage={overallAverage}
        ratings={ratings}
        remarks={remarks}
        categoryAverages={categoryAverages}
        />

        <Table
        options={options}
        onOverallAverageChange={handleOverallAverageChange}
        onClear={handleClear}
        ratings={ratings}
        setRatings={setRatings}
        dropdownValues={dropdownValues}
        setDropdownValues={setDropdownValues}
        onCategoryAveragesChange={handleCategoryAveragesChange}
        remarks={remarks}
        setRemarks={setRemarks}
        />
        </div>
        </div>
    );
};

export default eslPrimeDiagnostics;
