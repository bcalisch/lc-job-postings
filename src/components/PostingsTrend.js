import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from 'react';

export default function PostingsTrend({timeSeries}) {
const headerRef = useRef();
useEffect(() => {
if(timeSeries === undefined || !timeSeries.length) return;
const chart = Plot.plot({
      height: 500,
      width: 1500,
      x: {
        type: "point",
        padding: '0',
      },
  marks: [
    Plot.line(timeSeries, {x: "date", y: "unique_postings", stroke: "year"}),
    Plot.dot(timeSeries, {x: "date", y: "unique_postings", fill: "year"}),
  ],
      color: { legend: true},
      options: {
      ticks: 12,
    }
      })

headerRef.current.append(chart);
return () => chart.remove();


}, );
  return(
    <div ref={headerRef}>
        <p className="header small">Unique Postings Trend</p>
        <p className="">This view displays the most recent 30 days of job postings activity to show near-term trends.</p>
        
    </div>
  );
}
