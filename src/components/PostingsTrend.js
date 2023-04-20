import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from 'react';

export default function PostingsTrend({timeSeries}) {
const headerRef = useRef();
  console.log('timeSeries: ', timeSeries);
useEffect(() => {
if(timeSeries === undefined) return;
const chart = Plot.plot({
      x: {
        ticks: 3,
      },
  marks: [
    Plot.line(timeSeries, {x: "date", y: "unique_postings", stroke: "year"}),
  ],
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
