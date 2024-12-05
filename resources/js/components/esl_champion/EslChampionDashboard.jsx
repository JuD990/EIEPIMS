import React from 'react';
import ChartComponent from "./ChartComponent.jsx";

const EslChampionDashboard = () => {
  return (
    <div>
      <h1>ESL Champion Dashboard</h1>
      <ChartComponent minY={0} maxY={100} stepSize={10} isPercentage={true} />
    </div>
  );
};

export default EslChampionDashboard;
