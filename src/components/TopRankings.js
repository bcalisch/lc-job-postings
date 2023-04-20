import './TopRankings.module.css';
export default function TopRankings({title, headerName, data}) {
  const topPosting = data[0] && data[0].totalUniquePostings;
  return(
    <div className='container'>
      <div className="header small">{title}</div>
        <table border="0" className="full-width">
          <tr>
            <th>{headerName}</th>
            <th>Total/Unique</th>
            <th>Posting Intensity</th>
            <th>Median Posting Duration</th>
          </tr>
          {data.map((val, key) => {
          const percentage = ((val.totalUniquePostings/topPosting) * 100).toFixed(0)
            return (
              <tr key={key} style={{background: `linear-gradient(90deg,#d7f2fd ${percentage}%, white 0%)`}}>
                <td>{val.name}</td>
                <td>{val.totalPostings.toLocaleString()} / {val.totalUniquePostings.toLocaleString()}</td>
                <td>{((val.totalPostings/val.totalUniquePostings).toFixed(0))} : 1</td>
                <td>{val.median} days</td>
              </tr>
            )

        })}
          </table>
    </div>
  );
}
