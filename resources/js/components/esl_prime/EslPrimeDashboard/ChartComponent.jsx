import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register required elements for Line Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ minY, maxY, stepSize, isPercentage = false }) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'CAS',
        data: isPercentage ? [75, 80, 85, 90, 88, 92, 95] : [3.2, 3.0, 3.5, 3.7, 3.4, 3.8, 4.0],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'CBA',
        data: isPercentage ? [70, 75, 78, 85, 82, 88, 90] : [2.8, 3.0, 3.2, 3.4, 3.3, 3.6, 3.9],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
      {
        label: 'CCS',
        data: isPercentage ? [80, 85, 88, 92, 90, 94, 98] : [3.0, 3.2, 3.4, 3.6, 3.5, 3.7, 3.9],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'CJE',
        data: isPercentage ? [65, 70, 75, 80, 78, 82, 85] : [2.6, 2.8, 3.0, 3.3, 3.2, 3.5, 3.7],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: false,
      },
      {
        label: 'CEA',
        data: isPercentage ? [85, 88, 90, 93, 92, 96, 99] : [3.4, 3.5, 3.7, 3.9, 3.8, 4.0, 4.0],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
      },
      {
        label: 'CED',
        data: isPercentage ? [68, 72, 77, 83, 80, 86, 89] : [2.7, 3.0, 3.3, 3.5, 3.4, 3.6, 3.8],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: false,
      },
      {
        label: 'CNR',
        data: isPercentage ? [60, 65, 70, 75, 73, 78, 82] : [2.5, 2.7, 3.0, 3.2, 3.1, 3.4, 3.6],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: minY,
        max: maxY,
        ticks: {
          stepSize: stepSize,
          callback: function (value) {
            return isPercentage ? `${value}%` : value;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
