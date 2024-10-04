

import React, { useState, useEffect, useCallback } from "react";
import Chart from "react-apexcharts"; // Updated to use react-apexcharts 
import "./StatusChart.css";


const StatusChart = () => {
  const [statusFilter, setStatusFilter] = useState("Pending"); // Default to Pending
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });
  const [rows, setRows] = useState([]);

  // Define different color schemes for different statuses
  const getColorScheme = (status) => {
    switch (status) {
      case "Pending":
        return ["#f39c12"];
      case "Approved":
        return ["#27ae60"];
      case "Rejected":
        return ["#e74c3c"];
      default:
        return ["#3498db"];
    }
  };

  // Memoize the prepareChartData function using useCallback
  const prepareChartData = useCallback(
    (data) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const filteredData = data.filter((row) => row.Status === statusFilter);

      const monthlyCounts = Array(12).fill(0); // Initialize array for each month

      filteredData.forEach((row) => {
        const date = new Date(row.Date_of_Application);
        const monthIndex = date.getMonth(); // Get month as an index (0-11)
        monthlyCounts[monthIndex] += 1; // Increment count for the month
      });

        // Get the color scheme based on the status filter
        const colors = getColorScheme(statusFilter);

      setChartData({
        series: [
          {
            name: statusFilter,
            data: monthlyCounts,
          },
        ],
        options: {
          chart: {
            id: "status-chart",
            type: "bar",
          },
          xaxis: {
            categories: months,
          },
          yaxis: {
            title: {
              text: "Number of Requests",
            },
          },
          title: {
            text: `Connection Requests (${statusFilter})`,
            align: "center",
          },
          colors, // Array of colors for each month
        },
      });
    },
    [statusFilter] // Only recreate the function when statusFilter changes
  );

  useEffect(() => {
    const storedRows = JSON.parse(localStorage.getItem("rows")) || [];

    // Fetch users.json data if localStorage is empty
    if (storedRows.length > 0) {
      setRows(storedRows);
      prepareChartData(storedRows);
    } else {
      fetch("/users.json")
        .then((response) => response.json())
        .then((data) => {
          const combinedData = [...storedRows, ...data];
          setRows(combinedData);
          localStorage.setItem("rows", JSON.stringify(combinedData)); // Save to localStorage
          prepareChartData(combinedData);
        })
        .catch((error) => console.error("Error loading users:", error));
    }
  }, [prepareChartData]);

  // Prepare the data based on the status filter and rows
  useEffect(() => {
    if (rows.length) {
      prepareChartData(rows);
    }
  }, [statusFilter, rows, prepareChartData]);

  return (
    <div className="container">
      <h3 style={{transform:"translateX(-105%)",}}>Connection Requests by Status</h3>
      {/* Dropdown to select status */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{borderRadius:"10px",
            width:"25%",
            height:"5%",
            padding:"7px 10px",
            marginBottom:"20px",
        }}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
        <option value="Connection Released">Connection Released</option>
      </select>

      {/* Render the chart */}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={500}
        width={900}
      />
    </div>
  );
};

export default StatusChart;