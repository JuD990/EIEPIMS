import React from 'react';
import ChartComponent from "./ChartComponent.jsx";

const EslPrimeDashboard = () => {
  return (
    <div>
      <h1>ESL Prime Dashboard</h1>
      <ChartComponent minY={0} maxY={100} stepSize={10} isPercentage={true} />
    </div>
  );
};

export default EslPrimeDashboard;
