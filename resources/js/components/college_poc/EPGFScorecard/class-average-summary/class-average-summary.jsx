import React from 'react';
import './class-average-summary.css';

const ClassAverageSummary = () => {
  return (
    <div style={{fontWeight: '600'}} className="class-average-summary-card">
      <div className="class-pgf-average-column">
        <div>2.00</div>
        <div>PGF Average</div>
      </div>
      <div className="class-completion-rate-column">
        <div>60%</div>
        <div>Completion Rate</div>
      </div>
      <div className="class-proficiency-level-column">
        <div style={{color: 'green'}}>Approaching</div>
        <div>Proficiency</div>
      </div>
    </div>
  );
};

export default ClassAverageSummary;
