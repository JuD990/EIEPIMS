import React from 'react';
import ChartComponent from "./ChartComponent.jsx";

const HeadEiePocDashboard = () => {
  return (
    <div>
      <h1>Head EIE POC Dashboard</h1>
      <ChartComponent minY={0} maxY={100} stepSize={10} isPercentage={true} />
    </div>
  );
};

export default HeadEiePocDashboard;
