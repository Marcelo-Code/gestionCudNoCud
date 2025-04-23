import { Box } from "@mui/material";
import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

export const DonutChart = ({ usedSize, totalSize, nameChart }) => {
  const data = [
    { name: "Usado", value: usedSize },
    { name: "Libre", value: Math.max(totalSize - usedSize, 0) },
  ];

  const COLORS = ["#8884d8", "#d0d0d0"];

  return (
    <Box className="flex flex-col items-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        {/* <Tooltip formatter={(value) => `${value} MB`} /> */}
        {/* <Legend /> */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-semibold text-lg"
        >
          <tspan x="50%" dy="-0.6em">
            {nameChart}
          </tspan>
          <tspan x="50%" dy="1.2em">
            {usedSize} MB /{" "}
            {totalSize >= 1000 ? `${totalSize / 1000} GB` : `${totalSize} MB`}
          </tspan>{" "}
        </text>
      </PieChart>
    </Box>
  );
};

export default DonutChart;
