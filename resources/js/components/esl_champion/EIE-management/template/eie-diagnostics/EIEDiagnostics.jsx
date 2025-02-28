import React from "react";
import "./EIEDiagnostics.css";
import Template1 from "@assets/sample-diagnostics-1.png";
import Template2 from "@assets/sample-diagnostics-2.png";

const EIEDiagnostics = () => {
    return (
        <div className="eie-diagnostics-container">
        {/* First Card with Template1 */}
        <div className="eie-diagnostics-card">
        <img
        src={Template1}  // Using the imported Template image
        alt="EIE Diagnostics"
        className="eie-diagnostics-image"
        />
        </div>

        {/* Second Card with Template2 at the bottom */}
        <div className="eie-diagnostics-card">
        <img
        src={Template2}  // Using the imported Template image
        alt="EIE Diagnostics"
        className="eie-diagnostics-image"
        />
        </div>
        </div>
    );
};

export default EIEDiagnostics;
