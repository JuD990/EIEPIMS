import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TableComponent.css';

const TableComponent = ({ course_code }) => {
  const [version, setVersion] = useState(null);
  const [students, setStudents] = useState([]); // State to store students
  const [loading, setLoading] = useState(true); // Loading state
  const [consistencyOptions, setConsistencyOptions] = useState([]); // Options for consistency dropdown
  const [clarityOptions, setClarityOptions] = useState([]);
  const [articulationOptions, setArticulationOptions] = useState([]);
  const [intonationAndStressOptions, setIntonationAndStressOptions] = useState([]);
  const [accuracyOptions, setAccuracyOptions] = useState([]);
  const [clarityofthoughtOptions, setClarityOfThoughtOptions] = useState([]);
  const [syntaxOptions, setSyntaxOptions] = useState([]);
  const [qualityOfResponseOptions, setQualityOfResponseOptions] = useState([]);
  const [detailOfResponseOptions, setDetailOfResponseOptions] = useState([]);

  // Fetch students based on `course_code`
  useEffect(() => {
    if (course_code) {
      axios
      .get(`/api/epgf-scorecard/students?course_code=${course_code}`)
      .then((response) => {
        if (response.data.success) {
          setStudents(response.data.students); // Set the fetched students data
        } else {
          console.error('No active students found');
        }
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [course_code]);

  // Fetch consistency options based on version
  useEffect(() => {
    const fetchConsistencyOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/consistency/${version}`);
          if (response.status === 200 && Array.isArray(response.data)) {
            console.log('Consistency options:', response.data);
            const filteredConsistency = response.data.map(item => ({
              id: item.id,
              pronunciation: item.pronunciation,
              rating: item.rating,
              descriptor: item.descriptor,
            }));
            setConsistencyOptions(filteredConsistency);
          } else {
            console.error("No pronunciations found in the response");
          }
        } catch (error) {
          console.error("Error fetching consistency options:", error);
        }
      }
    };

    fetchConsistencyOptions();
  }, [version]);

  useEffect(() => {
    const fetchClarityOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/clarity/${version}`);
          console.log("API Response:", response); // Log the response data to see its structure

          if (response.status === 200 && Array.isArray(response.data)) {
            const filteredClarity = response.data.map(item => ({
              id: item.id,
              pronunciation: item.pronunciation,
              rating: item.rating,
              descriptor: item.descriptor,
            }));
            setClarityOptions(filteredClarity);
          } else {
            console.error("No clarity options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching clarity options:", error);
        }
      }
    };

    fetchClarityOptions();
  }, [version]);

  useEffect(() => {
    const fetchArticulationOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/articulation/${version}`);
          console.log("API Response:", response); // Log the response data to see its structure

          if (response.status === 200 && Array.isArray(response.data)) {
            const filteredArticulation = response.data.map(item => ({
              id: item.id,
              pronunciation: item.pronunciation,
              rating: item.rating,
              descriptor: item.descriptor,
            }));
            setArticulationOptions(filteredArticulation);
          } else {
            console.error("No articulation options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching articulation options:", error);
        }
      }
    };

    fetchArticulationOptions();
  }, [version]);

  useEffect(() => {
    const fetchIntonationAndStressOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/intonationStress/${version}`);
          console.log("API Response:", response);  // Check the API response
          if (response.status === 200 && Array.isArray(response.data)) {
            const filteredIntonationAndStress = response.data.map(item => ({
              id: item.id,
              pronunciation: item.pronunciation,
              rating: item.rating,
              descriptor: item.descriptor,
            }));
            setIntonationAndStressOptions(filteredIntonationAndStress);
            console.log("Updated Options:", filteredIntonationAndStress);  // Verify the options
          } else {
            console.error("No Intonation and Stress options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching Intonation and Stress options:", error);
        }
      }
    };

    fetchIntonationAndStressOptions();
  }, [version]);

  useEffect(() => {
    const fetchAccuracyOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/accuracy/${version}`);
          console.log("API Response:", response);  // Check the API response
          if (response.status === 200 && Array.isArray(response.data)) {
            const filteredAccuracy = response.data.map(item => ({
              id: item.id,
              pronunciation: item.pronunciation,
              rating: item.rating,
              descriptor: item.descriptor,
            }));
            setAccuracyOptions(filteredAccuracy);
            console.log("Updated Options:", filteredAccuracy);  // Verify the options
          } else {
            console.error("No Accuracy options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching Accuracy options:", error);
        }
      }
    };

    fetchAccuracyOptions();
  }, [version]);

  useEffect(() => {
    const fetchClarityOfThoughtOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/clarityOfThought/${version}`);
          console.log("API Response:", response);  // Check the API response
          if (response.status === 200 && Array.isArray(response.data)) {
            const filteredClarityOfThought = response.data.map(item => ({
              id: item.id,
              pronunciation: item.pronunciation,
              rating: item.rating,
              descriptor: item.descriptor,
            }));
            setClarityOfThoughtOptions(filteredClarityOfThought);
            console.log("Updated Options:", filteredClarityOfThought);  // Verify the options
          } else {
            console.error("No Clarity Of Thought options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching Clarity Of Thoughtoptions:", error);
        }
      }
    };

    fetchClarityOfThoughtOptions();
  }, [version]);

  useEffect(() => {
    const fetchSyntaxOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/syntax/${version}`);
          console.log("API Response:", response);  // Check the API response
          if (response.status === 200 && Array.isArray(response.data)) {
            const filteredSyntax = response.data.map(item => ({
              id: item.id,
              pronunciation: item.pronunciation,
              rating: item.rating,
              descriptor: item.descriptor,
            }));
            setSyntaxOptions(filteredSyntax);
            console.log("Updated Options:", filteredSyntax);  // Verify the options
          } else {
            console.error("No Syntax options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching Syntax options:", error);
        }
      }
    };

    fetchSyntaxOptions();
  }, [version]);

  useEffect(() => {
    const fetchQualityOfResponseOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/detailOfResponse/${version}`);
          console.log("API Response:", response);  // Check the API response
          if (response.status === 200 && Array.isArray(response.data)) {
            const filteredQualityOfResponse = response.data.map(item => ({
              id: item.id,
              pronunciation: item.pronunciation,
              rating: item.rating,
              descriptor: item.descriptor,
            }));
            setQualityOfResponseOptions(filteredQualityOfResponse);
            console.log("Updated Options:", filteredQualityOfResponse);  // Verify the options
          } else {
            console.error("No Quality Of Response options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching Quality Of Response options:", error);
        }
      }
    };

    fetchQualityOfResponseOptions();
  }, [version]);


  useEffect(() => {
    const fetchDetailOfResponseOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/detailOfResponse/${version}`);
          console.log("API Response:", response);  // Check the API response
          if (response.status === 200 && Array.isArray(response.data)) {
            const filteredDetailOfResponse = response.data.map(item => ({
              id: item.id,
              pronunciation: item.pronunciation,
              rating: item.rating,
              descriptor: item.descriptor,
            }));
            setDetailOfResponseOptions(filteredDetailOfResponse);
            console.log("Updated Options:", filteredDetailOfResponse);  // Verify the options
          } else {
            console.error("No Detail Of Response options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching Detail Of Response options:", error);
        }
      }
    };

    fetchDetailOfResponseOptions();
  }, [version]);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await axios.get('/api/rubric/active-version');
        const versionString = response.data.version;

        if (!versionString) {
          console.error("No version found in the response", response.data);
          return;
        }

        console.log("Fetched version string:", versionString);

        // Extract the major version using regex
        const versionMatch = versionString.match(/^v(\d+)/);
        if (versionMatch) {
          const majorVersion = versionMatch[1]; // The major version will be in the first capture group
          setVersion(majorVersion);  // Set the major version to state
          console.log("Extracted major version:", majorVersion);
        } else {
          console.error("Version string doesn't match the expected format:", versionString);
        }
      } catch (error) {
        console.error("Error fetching version:", error);
      }
    };

    fetchVersion();
  }, []); // Run this effect only once when the component mounts

  const columns = [
    'No',
    'Full Name',
    'Year Level',
    'PGF Average',
    'Proficiency',
    'Type',
    'Consistency',
    '',
    'Clarity',
    '',
    'Articulation',
    '',
    'Intonation and Stress',
    '',
    'Pronunciation',
    'Accuracy',
    '',
    'Clarity of Thought',
    '',
    'Syntax',
    '',
    'Grammar',
    'Quality Of Response',
    '',
    'Detail Of Response',
    '',
    'Fluency',
    'Comment',
  ];

  const updateData = (rowIndex, columnId, newValue) => {
    const updatedStudents = [...students];
    updatedStudents[rowIndex][columnId] = newValue;
    setStudents(updatedStudents);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Create a lookup for consistency options for faster access
  const consistencyLookup = consistencyOptions.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {});

  const clarityLookup = clarityOptions.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {});

  const articulationLookup = articulationOptions.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {});

  const intonationAndStressLookup = intonationAndStressOptions.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {});

  const accuracyLookup = accuracyOptions.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {});

  const clarityofthoughtLookup = clarityofthoughtOptions.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {});

  const syntaxLookup = syntaxOptions.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {});

  const qualityOfResponseLookup = qualityOfResponseOptions.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {});

  const detailOfResponseLookup = detailOfResponseOptions.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {});


  return (
    <div className="epgf-scorecard-table-container">
    <table className="epgf-scorecard-table">
    <thead>
    <tr>
    {columns.map((column, index) => (
      <th key={index}>{column}</th>
    ))}
    </tr>
    </thead>
    <tbody>
    {students.map((student, rowIndex) => {

      {/* Pronunciation */}
      const consistencySelectedOption = consistencyOptions?.find(option => option.id === student.consistency);
      const consistencyRating = consistencySelectedOption ? parseFloat((consistencySelectedOption.rating || '0.00').replace(',', '.')) : 0;

      const claritySelectedOption = clarityOptions?.find(option => option.id === student.clarity);
      const clarityRating = claritySelectedOption ? parseFloat((claritySelectedOption.rating || '0.00').replace(',', '.')) : 0;

      const articulationSelectedOption = articulationOptions?.find(option => option.id === student.articulation);
      const articulationRating = articulationSelectedOption ? parseFloat((articulationSelectedOption.rating || '0.00').replace(',', '.')) : 0;

      const intonationAndStressSelectedOption = intonationAndStressOptions?.find(option => option.id === student.intonation_and_stress);
      const intonationAndStressRating = intonationAndStressSelectedOption ? parseFloat((intonationAndStressSelectedOption.rating || '0.00').replace(',', '.')) : 0;

      const pronunciationAverage = (consistencyRating + clarityRating + articulationRating + intonationAndStressRating) / 4;

      {/* Grammar */}
      // Finding selected options
      const accuracySelectedOption = accuracyOptions?.find(option => option.id === student.accuracy);
      const clarityofthoughtSelectedOption = clarityofthoughtOptions?.find(option => option.id === student.clarity_of_thought);
      const syntaxSelectedOption = syntaxOptions?.find(option => option.id === student.syntax);

      // Parsing ratings
      const accuracyRating = accuracySelectedOption ? parseFloat((accuracySelectedOption.rating || '0.00').replace(',', '.')) : 0;
      const clarityofthoughtRating = clarityofthoughtSelectedOption ? parseFloat((clarityofthoughtSelectedOption.rating || '0.00').replace(',', '.')) : 0;
      const syntaxRating = syntaxSelectedOption ? parseFloat((syntaxSelectedOption.rating || '0.00').replace(',', '.')) : 0;

      // Calculating grammar average
      const grammarAverage = (accuracyRating + clarityofthoughtRating + syntaxRating) / 3;

      {/* Fluency */}

      const qualityOfResponseSelectedOption = qualityOfResponseOptions?.find(option => option.id === student.quality_of_response);
      const detailOfResponseSelectedOption = detailOfResponseOptions?.find(option => option.id === student.detail_of_response);

      const qualityOfResponseRating = qualityOfResponseSelectedOption ? parseFloat((qualityOfResponseSelectedOption.rating || '0.00').replace(',', '.')) : 0;
      const detailOfResponseRating = detailOfResponseSelectedOption ? parseFloat((detailOfResponseSelectedOption.rating || '0.00').replace(',', '.')) : 0;

      const fluencyAverage = (qualityOfResponseRating + detailOfResponseRating) / 2;

      const epgfAverage = (pronunciationAverage + grammarAverage + fluencyAverage) / 3;

      const epgfProficiencyLevels = [
        { threshold: 0.0, level: 'Beginning' },
        { threshold: 0.5, level: 'Low Acquisition' },
        { threshold: 0.75, level: 'High Acquisition' },
        { threshold: 1.0, level: 'Emerging' },
        { threshold: 1.25, level: 'Low Developing' },
        { threshold: 1.5, level: 'High Developing' },
        { threshold: 1.75, level: 'Low Proficient' },
        { threshold: 2.0, level: 'Proficient' },
        { threshold: 2.25, level: 'High Proficient' },
        { threshold: 2.5, level: 'Advanced' },
        { threshold: 3.0, level: 'High Advanced' },
        { threshold: 4.0, level: 'Native/Bilingual' },
      ];


      const getProficiencyLevel = (average) => {
        const matchedLevel = epgfProficiencyLevels.find(
          (entry) => average <= entry.threshold
        );
        return matchedLevel ? matchedLevel.level : 'Unknown';
      };


      return (
        <tr key={rowIndex}>
        <td>{rowIndex + 1}</td>
        <td><div style={{ textAlign: 'center' }}>{`${student.firstname} ${student.lastname}`}</div></td>
        <td><div style={{ textAlign: 'center' }}>{student.year_level}</div></td>

        {/* PGF Average */}
        <td>
        <div style={{ textAlign: 'center' }}> {epgfAverage.toFixed(2)} </div>
        </td>

        {/* Proficiency */}
        <td>
        <div style={{ textAlign: 'center' }}>{getProficiencyLevel(epgfAverage)}</div>
        </td>

        <td>
        <select
        value={student.type || ''}
        onChange={(e) => updateData(rowIndex, 'type', e.target.value)}
        style={{ width: '100px', padding: '4px', backgroundColor: 'transparent' }}
        >
        <option value="Reading">Reading</option>
        <option value="Writing">Writing</option>
        <option value="Listening">Listening</option>
        </select>
        </td>

        <td>
        <select
        value={student.consistency || ''}
        onChange={(e) => {
          const selectedOption = consistencyLookup[Number(e.target.value)];
          const newValue = selectedOption ? selectedOption.id : student.consistency;
          updateData(rowIndex, 'consistency', newValue);
        }}
        style={{ padding: '4px', backgroundColor: 'transparent', width: '350px', }}
        >
        {consistencyOptions.length === 0 ? (
          <option disabled>Loading options...</option>
        ) : (
          consistencyOptions.map(option => (
            <option key={option.id} value={option.id} style={{ fontSize: '12px', whiteSpace: 'pre-line',  }}>
            {option.descriptor.split('.').join(' \n')}
            </option>
          ))
        )}
        </select>
        <span style={{ fontSize: '12px', marginTop: '4px', display: 'block', textAlign: 'left' }}>
        Rating: {consistencyRating}
        </span>
        </td>
        <td> <div style={{ textAlign: 'center' }}> {consistencyRating} </div></td>

        {/* Similar dropdowns for clarity, articulation, and intonation */}
        {/* Clarity dropdown */}
        <td>
        <div>
        <select
        value={student.clarity || ''}
        onChange={(e) => {
          const selectedOption = clarityLookup[Number(e.target.value)];
          const newValue = selectedOption ? selectedOption.id : student.clarity;
          console.log('Selected Option:', selectedOption); // Debug log
          updateData(rowIndex, 'clarity', newValue); // Update clarity column
        }}
        style={{
          padding: '4px',
          backgroundColor: 'transparent',
          width: '350px',
        }}
        >
        {clarityOptions.length === 0 ? (
          <option disabled>Loading options...</option>
        ) : (
          clarityOptions.map(option => {
            const splitDescriptor = option.descriptor.split('.');
            const formattedDescriptor = splitDescriptor.join(' \n');

            return (
              <option
              key={option.id}
              value={option.id}
              style={{
                fontSize: '12px',
                whiteSpace: 'pre-line',
              }}
              >
              {formattedDescriptor}
              </option>
            );
          })
        )}
        </select>
        <span
        style={{
          fontSize: '12px',
          marginTop: '4px',
          display: 'block',
          textAlign: 'left',
        }}
        >
        Rating: {student.clarity ? clarityLookup[student.clarity]?.rating : '0.00'}
        </span>
        </div>
        </td>


        <td> <div style={{ textAlign: 'center' }}> {clarityRating} </div></td>



        {/* Articulation dropdown */}
        <td>
        <div>
        <select
        value={student.articulation || ''}
        onChange={(e) => {
          const selectedOption = articulationLookup[Number(e.target.value)];
          const newValue = selectedOption ? selectedOption.id : student.articulation;
          console.log('Selected Option:', selectedOption); // Debug log
          updateData(rowIndex, 'articulation', newValue); // Update articulation column
        }}
        style={{
          padding: '4px',
          backgroundColor: 'transparent',
          width: '350px',
        }}
        >
        {articulationOptions.length === 0 ? (
          <option disabled>Loading options...</option>
        ) : (
          articulationOptions.map(option => {
            const splitDescriptor = option.descriptor.split('.');
            const formattedDescriptor = splitDescriptor.join(' \n');

            return (
              <option
              key={option.id}
              value={option.id}
              style={{
                fontSize: '12px',
                whiteSpace: 'pre-line',
              }}
              >
              {formattedDescriptor}
              </option>
            );
          })
        )}
        </select>
        <span
        style={{
          fontSize: '12px',
          marginTop: '4px',
          display: 'block',
          textAlign: 'left',
        }}
        >
        Rating: {student.articulation ? articulationLookup[student.articulation]?.rating || '0.00' : '0.00'}
        </span>
        </div>
        </td>

        <td>
          <div style={{ textAlign: 'center' }}>
            {articulationRating}
          </div>
        </td>

        {/* Intonation and Stress dropdown */}
        <td>
        <div>
        <select
        value={student.intonation_and_stress || ''}
        onChange={(e) => {
          const selectedOption = intonationAndStressLookup[Number(e.target.value)];
          const newValue = selectedOption ? selectedOption.id : student.intonation_and_stress;
          console.log('Selected Option:', selectedOption); // Debug log
          updateData(rowIndex, 'intonation_and_stress', newValue); // Update column
        }}
        style={{
          padding: '4px',
          backgroundColor: 'transparent',
          width: '350px',
        }}
        >
        {intonationAndStressOptions.length === 0 ? (
          <option disabled>Loading options...</option> // Loading state
        ) : (
          intonationAndStressOptions.map(option => {
            const splitDescriptor = option.descriptor.split('.');
            const formattedDescriptor = splitDescriptor.join(' \n');

            return (
              <option
              key={option.id}
              value={option.id} // Ensure value corresponds to the ID
              style={{
                fontSize: '12px',
                whiteSpace: 'pre-line',
              }}
              >
              {formattedDescriptor}
              </option>
            );
          })
        )}
        </select>
        <span
        style={{
          fontSize: '12px',
          marginTop: '4px',
          display: 'block',
          textAlign: 'left',
        }}
        >
        Rating: {intonationAndStressRating || '0.00'}
        </span>
        </div>
        </td>
        <td>
          <div style={{ textAlign: 'center' }}>
            {intonationAndStressRating}
          </div>
        </td>

        {/* Pronunciation Average */}
        <td>
          <div style={{ textAlign: 'center' }}>
            {pronunciationAverage.toFixed(2)}
          </div>
        </td>

        {/* Grammar */}
        <td>
        <div>
        <select
        value={student.accuracy || ''}
        onChange={(e) => {
          const selectedOption = accuracyLookup[Number(e.target.value)];
          const newValue = selectedOption ? selectedOption.id : student.accuracy;
          console.log('Selected Option:', selectedOption); // Debug log
          updateData(rowIndex, 'accuracy', newValue); // Update column
        }}
        style={{
          padding: '4px',
          backgroundColor: 'transparent',
          width: '350px',
        }}
        >
        {accuracyOptions.length === 0 ? (
          <option disabled>Loading options...</option> // Loading state
        ) : (
          accuracyOptions.map(option => {
            const splitDescriptor = option.descriptor.split('.');
            const formattedDescriptor = splitDescriptor.join(' \n');

            return (
              <option
              key={option.id}
              value={option.id} // Ensure value corresponds to the ID
              style={{
                fontSize: '12px',
                whiteSpace: 'pre-line',
              }}
              >
              {formattedDescriptor}
              </option>
            );
          })
        )}
        </select>
        <span
        style={{
          fontSize: '12px',
          marginTop: '4px',
          display: 'block',
          textAlign: 'left',
        }}
        >
        Rating: {accuracyRating || '0.00'}
        </span>
        </div>
        </td>

        <td>
          <div style={{ textAlign: 'center' }}>
          {accuracyRating}
          </div>
        </td>

        <td>
          <div>
          <select
          value={student.clarity_of_thought || ''}
          onChange={(e) => {
            const selectedOption = clarityofthoughtLookup[Number(e.target.value)];
            const newValue = selectedOption ? selectedOption.id : student.clarity_of_thought;
            console.log('Selected Option:', selectedOption); // Debug log
            updateData(rowIndex, 'clarity_of_thought', newValue); // Update column
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
            width: '350px',
          }}
          >
          {clarityofthoughtOptions.length === 0 ? (
            <option disabled>Loading options...</option> // Loading state
          ) : (
            clarityofthoughtOptions.map(option => {
              const splitDescriptor = option.descriptor.split('.');
              const formattedDescriptor = splitDescriptor.join(' \n');

              return (
                <option
                key={option.id}
                value={option.id} // Ensure value corresponds to the ID
                style={{
                  fontSize: '12px',
                  whiteSpace: 'pre-line',
                }}
                >
                {formattedDescriptor}
                </option>
              );
            })
          )}
          </select>
          <span
          style={{
            fontSize: '12px',
            marginTop: '4px',
            display: 'block',
            textAlign: 'left',
          }}
          >
          Rating: {clarityofthoughtRating || '0.00'}
          </span>
          </div>
        </td>

        <td>
          <div style={{ textAlign: 'center' }}>
            {clarityofthoughtRating}
          </div>
        </td>

        <td>
        <div>
        <select
        value={student.syntax || ''}
        onChange={(e) => {
          const selectedOption = syntaxLookup[Number(e.target.value)];
          const newValue = selectedOption ? selectedOption.id : student.syntax;
          console.log('Selected Option:', selectedOption); // Debug log
          updateData(rowIndex, 'syntax', newValue); // Update column
        }}
        style={{
          padding: '4px',
          backgroundColor: 'transparent',
          width: '350px',
        }}
        >
        {syntaxOptions.length === 0 ? (
          <option disabled>Loading options...</option> // Loading state
        ) : (
          syntaxOptions.map(option => {
            const splitDescriptor = option.descriptor.split('.');
            const formattedDescriptor = splitDescriptor.join(' \n');

            return (
              <option
              key={option.id}
              value={option.id} // Ensure value corresponds to the ID
              style={{
                fontSize: '12px',
                whiteSpace: 'pre-line',
              }}
              >
              {formattedDescriptor}
              </option>
            );
          })
        )}
        </select>
        <span
        style={{
          fontSize: '12px',
          marginTop: '4px',
          display: 'block',
          textAlign: 'left',
        }}
        >
        Rating: {syntaxRating || '0.00'}
        </span>
        </div>
        </td>

        <td>
        <div style={{ textAlign: 'center' }}>
        {syntaxRating}
        </div>
        </td>

        <td>
        <div style={{ textAlign: 'center' }}>
        {grammarAverage.toFixed(2)}
        </div>
        </td>

        {/* Fluency */}
        <td>
        <div>
        <select
        value={student.quality_of_response || ''}
        onChange={(e) => {
          const selectedOption = qualityOfResponseLookup[Number(e.target.value)];
          const newValue = selectedOption ? selectedOption.id : student.quality_of_response;
          console.log('Selected Option:', selectedOption); // Debug log
          updateData(rowIndex, 'quality_of_response', newValue); // Update column
        }}
        style={{
          padding: '4px',
          backgroundColor: 'transparent',
          width: '350px',
        }}
        >
        {qualityOfResponseOptions.length === 0 ? (
          <option disabled>Loading options...</option> // Loading state
        ) : (
          qualityOfResponseOptions.map(option => {
            const splitDescriptor = option.descriptor.split('.');
            const formattedDescriptor = splitDescriptor.join(' \n');

            return (
              <option
              key={option.id}
              value={option.id} // Ensure value corresponds to the ID
              style={{
                fontSize: '12px',
                whiteSpace: 'pre-line',
              }}
              >
              {formattedDescriptor}
              </option>
            );
          })
        )}
        </select>
        <span
        style={{
          fontSize: '12px',
          marginTop: '4px',
          display: 'block',
          textAlign: 'left',
        }}
        >
        Rating: {qualityOfResponseRating || '0.00'}
        </span>
        </div>
        </td>


        <td>
        <div style={{ textAlign: 'center' }}>
        {qualityOfResponseRating}
        </div>
        </td>


        <td>
        <div>
        <select
        value={student.detail_of_response || ''}
        onChange={(e) => {
          const selectedOption = detailOfResponseLookup[Number(e.target.value)];
          const newValue = selectedOption ? selectedOption.id : student.detail_of_response;
          console.log('Selected Option:', selectedOption); // Debug log
          updateData(rowIndex, 'detail_of_response', newValue); // Update column
        }}
        style={{
          padding: '4px',
          backgroundColor: 'transparent',
          width: '350px',
        }}
        >
        {detailOfResponseOptions.length === 0 ? (
          <option disabled>Loading options...</option> // Loading state
        ) : (
          detailOfResponseOptions.map(option => {
            const splitDescriptor = option.descriptor.split('.');
            const formattedDescriptor = splitDescriptor.join(' \n');

            return (
              <option
              key={option.id}
              value={option.id} // Ensure value corresponds to the ID
              style={{
                fontSize: '12px',
                whiteSpace: 'pre-line',
              }}
              >
              {formattedDescriptor}
              </option>
            );
          })
        )}
        </select>
        <span
        style={{
          fontSize: '12px',
          marginTop: '4px',
          display: 'block',
          textAlign: 'left',
        }}
        >
        Rating: {detailOfResponseRating || '0.00'}
        </span>
        </div>
        </td>


        <td>
        <div style={{ textAlign: 'center' }}>
        {detailOfResponseRating}
        </div>
        </td>

        <td>
        <div style={{ textAlign: 'center' }}>
        {fluencyAverage.toFixed(2)}
        </div>
        </td>

        {/* Comment */}
        <td>
        {/* Textarea for the "Comment" column */}
        <textarea
        value={student.comment}
        onChange={(e) => updateData(rowIndex, 'comment', e.target.value)}
        style={{
          width: '450px',
          height: '40px',
          padding: '4px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          resize: 'vertical',
        }}
        aria-label={`Edit comment for ${student.fullName}`}
        placeholder="Add comment..."
        />
        </td>
        </tr>
      );
    })}
    </tbody>

    </table>
    </div>
  );
};

export default TableComponent;
