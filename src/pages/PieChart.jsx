import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ orders }) => {
  // Count the occurrences of each status
  const countStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // Extract the status labels and counts
  const labels = Object.keys(countStatus);
  const data = Object.values(countStatus);

  // Define the chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['green', 'yellow', 'red'], // Customize the colors as needed
      },
    ],
  };

  return (
    <div style={{ width: '200px', height: '200px' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
