import React, { useRef, useState } from "react"; // Import useState here
import axios from "axios";
import "./UploadImplementingSubjectsButton.css";
import uploadLogo from "@assets/Upload.png";

const UploadImplementingSubjectsButton = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false); // Now you can use useState

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post("http://localhost:8000/api/upload-subjects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
      alert("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="upload-implementing-subjects-button">
      <button onClick={handleButtonClick} className="implementing-subjects-upload-button">
        {loading ? (
          <span>Uploading...</span>
        ) : (
          <>
            <img src={uploadLogo} alt="Upload Icon" className="upload-icon" />
            <span className="upload-label">Upload Subject</span>
          </>
        )}
      </button>
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadImplementingSubjectsButton;
