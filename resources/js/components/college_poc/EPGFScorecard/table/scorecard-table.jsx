import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const TableComponent = ({ course_code }) => {
  const [students, setStudents] = useState([]); // State to store students
  const [loading, setLoading] = useState(true); // Loading state
  const [version, setVersion] = useState(null); // State to store the extracted version number
  const [consistencyOptions, setConsistencyOptions] = useState([]);
  const [clarityOptions, setClarityOptions] = useState([]);
  const [articulationOptions, setArticulationOptions] = useState([]);
  const [intonationAndStressOptions, setIntonationAndStressOptions] = useState([]);
  const [accuracyOptions, setAccuracyOptions] = useState([]);
  const [clarityofthoughtOptions, setClarityOfThoughtOptions] = useState([]);


  useEffect(() => {
    const fetchConsistencyOptions = async () => {
      if (version) {
        try {
          const response = await axios.get(`/api/consistency/${version}`);
          if (response.status === 200 && Array.isArray(response.data)) {
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
            console.error("No Intonation and Stress options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching Intonation and Stress options:", error);
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
            console.error("No Intonation and Stress options found or response data is not an array");
          }
        } catch (error) {
          console.error("Error fetching Intonation and Stress options:", error);
        }
      }
    };

    fetchClarityOfThoughtOptions();
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

  // Fetch students and filter based on course_code
  useEffect(() => {
    console.log("Course Code received in Table:", course_code);
    if (course_code) {
      axios.get(`/api/epgf-scorecard/students?course_code=${course_code}`)
      .then((response) => {
        if (response.data.success) {
          setStudents(response.data.students); // Set the fetched students data
          setLoading(false);
        } else {
          console.error('No active students found');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
    }
  }, [course_code]);

  // Define columns for the table
  const columns = useMemo(() => [
    { Header: 'No.', accessor: 'no' },
    { Header: 'Full Name', accessor: 'fullName' },
    { Header: 'Year Level', accessor: 'yearLevel' },
    { Header: 'PGF Average', accessor: 'pgfAverage' },
    { Header: 'Proficiency', accessor: 'proficiency' },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: ({ value, row, column, updateData }) => (
        <select
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          updateData(row.index, column.id, newValue);
        }}
        style={{ width: '100px', padding: '4px', backgroundColor: 'transparent' }}
        >
        <option value="Reading">Reading</option>
        <option value="Writing">Writing</option>
        <option value="Listening">Listening</option>
        </select>
      ),
    },
    {
      Header: 'Consistency',
      accessor: 'consistency',
      Cell: ({ value, row, column }) => {
        // Ensure value is a number for comparison
        const selectedOption = consistencyOptions?.find(option => option.id === Number(value));
        const rating = selectedOption?.rating || '0.00';

        return (
          <div>
          <select
          value={value || ''} // Fallback to empty string if value is undefined
          onChange={(e) => {
            const selectedOption = consistencyOptions.find(option => option.id === Number(e.target.value));
            const newValue = selectedOption ? selectedOption.id : value;
            console.log('Selected Option:', selectedOption); // Debug log
            updateData(row.index, column.id, newValue); // Update table data
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
            width: '150px',
          }}
          >
          {consistencyOptions.length === 0 ? (
            <option disabled>Loading options...</option>
          ) : (
            consistencyOptions.map(option => {
              const splitDescriptor = option.descriptor.split('.');
              const formattedDescriptor = splitDescriptor.join(' \n'); // Use a space followed by a newline

              return (
                <option
                key={option.id}
                value={option.id}
                style={{
                  fontSize: '12px',
                  whiteSpace: 'pre-line', // Ensure newlines are respected inside the option
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
          Rating: {rating}
          </span>
          </div>
        );
      },
    },
    {
      Header: '',
      accessor: 'scoreConsistency',
      Cell: ({ row }) => {
        const selectedOption = consistencyOptions?.find(option => option.id === row.original.consistency);
        return parseFloat((selectedOption?.rating || '0.00').replace(',', '.'));
        console.log('Consistency Score:', rating); // Debug log
      },
    },
    {
      Header: 'Clarity',
      accessor: 'clarity',
      Cell: ({ value, row, column }) => {
        // Ensure value is a number for comparison
        const selectedOption = clarityOptions?.find(option => option.id === Number(value));
        const rating = selectedOption?.rating || '0.00';

        return (
          <div>
          <select
          value={value || ''} // Fallback to empty string if value is undefined
          onChange={(e) => {
            const selectedOption = clarityOptions.find(option => option.id === Number(e.target.value));
            const newValue = selectedOption ? selectedOption.id : value;
            console.log('Selected Option:', selectedOption); // Debug log
            updateData(row.index, column.id, newValue); // Update table data
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
            width: '150px',
          }}
          >
          {clarityOptions.length === 0 ? (
            <option disabled>Loading options...</option>
          ) : (
            clarityOptions.map(option => {
              const splitDescriptor = option.descriptor.split('.');
              const formattedDescriptor = splitDescriptor.join(' \n'); // Use a space followed by a newline

              return (
                <option
                key={option.id}
                value={option.id}
                style={{
                  fontSize: '12px',
                  whiteSpace: 'pre-line', // Ensure newlines are respected inside the option
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
          Rating: {rating}
          </span>
          </div>
        );
      },
    },
    {
      Header: '',
      accessor: 'scoreClarity',
      Cell: ({ row }) => {
        const selectedOption = clarityOptions?.find(option => option.id === row.original.clarity);
        return parseFloat((selectedOption?.rating || '0.00').replace(',', '.'));
        console.log('Clarity Score:', rating); // Debug log
      },
    },
    { Header: 'Articulation', accessor: 'articulation',
      Cell: ({ value, row, column }) => {
        // Ensure value is a number for comparison
        const selectedOption = articulationOptions?.find(option => option.id === Number(value));
        const rating = selectedOption?.rating || '0.00';

        return (
          <div>
          <select
          value={value || ''}
          onChange={(e) => {
            const selectedOption = articulationOptions.find(option => option.id === Number(e.target.value));
            const newValue = selectedOption ? selectedOption.id : value;
            console.log('Selected Option:', selectedOption);
            updateData(row.index, column.id, newValue);
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
            width: '150px',
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
          Rating: {rating}
          </span>
          </div>
        );
      },
    },
    {
      Header: '',
      accessor: 'scoreArticulation',
      Cell: ({ row }) => {
        const selectedOption = articulationOptions?.find(option => option.id === row.original.articulation);
        return parseFloat((selectedOption?.rating || '0.00').replace(',', '.'));
        console.log('Articulation Score:', rating); // Debug log
      },
    },
    {
      Header: 'Intonation and Stress', accessor: 'intonationAndStress',
      Cell: ({ value, row, column }) => {
        // Ensure value is a number for comparison
        const selectedOption = intonationAndStressOptions?.find(option => option.id === Number(value));
        const rating = selectedOption?.rating || '0.00';

        return (
          <div>
          <select
          value={value || ''}
          onChange={(e) => {
            const selectedOption = intonationAndStressOptions.find(option => option.id === Number(e.target.value));
            const newValue = selectedOption ? selectedOption.id : value;
            console.log('Selected Option:', selectedOption); // Debug log
            updateData(row.index, column.id, newValue); // Update table data
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
            width: '150px',
          }}
          >
          {intonationAndStressOptions.length === 0 ? (
            <option disabled>Loading options...</option>
          ) : (
            intonationAndStressOptions.map(option => {
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
          Rating: {rating}
          </span>
          </div>
        );
      },

    },
    {
      Header: '',
      accessor: 'scoreIntonationStress',
      Cell: ({ row }) => {
        const selectedOption = articulationOptions?.find(option => option.id === row.original.intonationAndStress);
        return parseFloat((selectedOption?.rating || '0.00').replace(',', '.'));
        onsole.log('IntonationStress Score:', rating); // Debug log
      },
    },
    {
      Header: 'Rating',
      accessor: 'pronunciationRating',
      Cell: ({ row }) => {
        // Extract the decimal values first
        const consistencyRating = parseFloat(row.values.scoreConsistency) || 0;
        const clarityRating = parseFloat(row.values.scoreClarity) || 0;
        const articulationRating = parseFloat(row.values.scoreArticulation) || 0;
        const intonationStressRating = parseFloat(row.values.scoreIntonationStress) || 0;

        // Log the extracted decimal values to debug
        console.log('Consistency:', consistencyRating);
        console.log('Clarity:', clarityRating);
        console.log('Articulation:', articulationRating);
        console.log('Intonation Stress:', intonationStressRating);

        // Compute the average of the ratings
        const totalRating = consistencyRating + clarityRating + articulationRating + intonationStressRating;
        const average = (totalRating / 4).toFixed(2);  // 4 is the number of categories (you can adjust this if necessary)

  // Log the calculated average for debugging
  console.log('Calculated Average:', average);

  // Return the computed average
  return average;
      }
    },

    { Header: 'Accuracy', accessor: 'accuracy',
      Cell: ({ value, row, column }) => {
        // Ensure value is a number for comparison
        const selectedOption = accuracyOptions?.find(option => option.id === Number(value));
        const rating = selectedOption?.rating || '0.00';

        return (
          <div>
          <select
          value={value || ''}
          onChange={(e) => {
            const selectedOption = accuracyOptions.find(option => option.id === Number(e.target.value));
            const newValue = selectedOption ? selectedOption.id : value;
            console.log('Selected Option:', selectedOption); // Debug log
            updateData(row.index, column.id, newValue); // Update table data
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
            width: '150px',
          }}
          >
          {accuracyOptions.length === 0 ? (
            <option disabled>Loading options...</option>
          ) : (
            accuracyOptions.map(option => {
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
          Rating: {rating}
          </span>
          </div>
        );
      },
    },
    { Header: '', accessor: 'scoreAccuracy',
      Cell: ({ row }) => {
        const selectedOption = accuracyOptions?.find(option => option.id === row.original.accuracy);
        return selectedOption?.rating || '0.00';
      },
    },
    { Header: 'Clarity of Thought', accessor: 'clarityofthought',
      Cell: ({ value, row, column }) => {
        // Ensure value is a number for comparison
        const selectedOption = clarityofthoughtOptions?.find(option => option.id === Number(value));
        const rating = selectedOption?.rating || '0.00';

        return (
          <div>
          <select
          value={value || ''}
          onChange={(e) => {
            const selectedOption = clarityofthoughtOptions.find(option => option.id === Number(e.target.value));
            const newValue = selectedOption ? selectedOption.id : value;
            console.log('Selected Option:', selectedOption); // Debug log
            updateData(row.index, column.id, newValue); // Update table data
          }}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
            width: '150px',
          }}
          >
          {clarityofthoughtOptions.length === 0 ? (
            <option disabled>Loading options...</option>
          ) : (
            clarityofthoughtOptions.map(option => {
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
          Rating: {rating}
          </span>
          </div>
        );
      },
    },
    { Header: '', accessor: 'scoreClarityOfThought',
      Cell: ({ row }) => {
        const selectedOption = clarityofthoughtOptions?.find(option => option.id === row.original.clarityofthought);
        return selectedOption?.rating || '0.00';
      },
    },
    {
      Header: 'Comment',
      accessor: 'comment',
      Cell: ({ value, row, column, updateData }) => (
        <textarea
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          updateData(row.index, column.id, newValue);
        }}
        style={{
          width: '400px',
          height: '40px',
          padding: '4px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          resize: 'vertical',
        }}
        />
      ),
    },
  ], [consistencyOptions, clarityOptions, articulationOptions, intonationAndStressOptions, accuracyOptions]);

  // Format student data for table (adding index and full name)
  const tableData = students.map((student, index) => ({
    no: index + 1,
    fullName: `${student.firstname} ${student.lastname}`,
    yearLevel: student.year_level,
    pgfAverage: student.epgf_average,
    proficiency: student.proficiency_level,
    type: student.type,
    consistency: student.consistency,
    scoreConsistency: student.score_consistency,
    clarity: student.clarity,
    scoreClarity: student.score_clarity,
    articulation: student.articulation,
    scoreArticulation: student.score_articulation,
    intonationAndStress: student.intonation_and_stress,
    scoreIntonationAndStress: student.score_intonation_and_stress,
    pronunciationRating: student.pronunciation_rating,
    accuracy: student.accuracy,
    scoreAccuracy: student.score_accuracy,
    clarityOfThought: student.clarity_of_thought,
    scoreClarityOfThought: student.score_clarity_of_thought,
    syntax: student.syntax,
    scoreSyntax: student.score_syntax,
    qualityOfResponse: student.quality_of_response,
    scoreQualityOfResponse: student.score_quality_of_response,
    detailOfResponse: student.detail_of_response,
    scoreDetailOfResponse: student.score_detail_of_response,
    fluencyRating: student.fluency_rating,
    scoreFluencyRating: student.score_fluency_rating,
    comment: student.comment,
  }));

  const updateData = (rowIndex, columnId, newValue) => {
    console.log('Updating data:', { rowIndex, columnId, newValue });
    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents];
      updatedStudents[rowIndex][columnId] = newValue;
      console.log('Updated Students:', updatedStudents);
      return updatedStudents;
    });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: tableData,
    updateData,
  });
  return (
    <div
    style={{
      overflowX: 'auto',
      overflowY: 'auto', // Ensure both horizontal and vertical scroll are enabled
      height: '500px', // Define height for vertical scrolling
      marginLeft: '320px',
      marginRight: '40px',
      border: '1px solid #ddd',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      maxWidth: '100%',
    }}
    >
    <table
    {...getTableProps()}
    style={{
      maxWidth: '100%',
      borderCollapse: 'collapse',
    }}
    >
    <thead>
    {headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column, index) => (
        <th
        {...column.getHeaderProps()}
        style={{
          backgroundColor: '#F4F7FC',
          color: '#383838',
          padding: '25px 20px',
          textAlign: 'center',
          borderBottom: 'none',
          fontFamily: 'Poppins',
          fontWeight: '500',
          position: 'sticky',
          top: 0,
          left: index < 2 ? `${index * 64}px` : 'auto',
          zIndex: index < 2 ? 3 : 2,
        }}
        >
        {column.render('Header')}
        </th>
      ))}
      </tr>
    ))}
    </thead>
    <tbody {...getTableBodyProps()}>
    {rows.map(row => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
        {row.cells.map((cell, index) => (
          <td
          {...cell.getCellProps()}
          style={{
            padding: '15px 20px',
            borderBottom: '1px solid #ddd',
            borderLeft: '1px solid #ddd',
            whiteSpace: 'nowrap',
            textAlign: 'left',
            overflow: 'hidden',
            fontFamily: 'Poppins',
            fontWeight: '500',
            position: index < 2 ? 'sticky' : 'static', // Sticky for the first 2 columns
            left: index < 2 ? `${index * 64}px` : 'auto', // Align sticky columns
            zIndex: index < 2 ? 1 : 'auto',
            background: 'white',
          }}
          >
          {typeof cell.value === 'string' ? (
            String(cell.value)
            .split('.') // Split the string by the period
            .map((part, i, arr) => (
              <span key={i}>
              {part.trim()}
              {i < arr.length - 1 && <br />} {/* Insert a line break except for the last part */}
              </span>
            ))
          ) : (
            cell.render('Cell')
          )}
          </td>
        ))}
        </tr>
      );
    })}
    </tbody>
    </table>
    </div>
  );
};

export default TableComponent;
