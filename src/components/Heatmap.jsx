import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// const value = [];

export default function Heatmap({ heatMapValue }) {
  // console.log("value1", heatMapValue);
  const [startDate, setStartDate] = useState(Date.now());
  useEffect(() => {
    const dateString = "2023/4/11";
    const parts = dateString.split("/");

    // Note: JavaScript months are 0-indexed, so we need to subtract 1 from the month
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    setStartDate(date);
  }, []);
  return (
    <div>
      <HeatMap
        width={740}
        value={heatMapValue}
        legendCellSize={11}
        startDate={startDate}
        panelColors={{
          // 0: '#c6e48b',
          4: "#7bc96a",
          10: "#239a3b",
          20: "#196127",
          30: "#191250",
        }}
        rectRender={(props, data) => {
          return <rect {...props} onClick={() => {}} />;
        }}
      />
    </div>
  );
}
