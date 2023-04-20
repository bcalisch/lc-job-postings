
export default function TopRankings({title, headerName, data}) {
  return(
    <div className='container'>
      <div className="header small">{title}</div>
        <table className="full-width">
          <tr>
            <th>{headerName}</th>
            <th>Total/Unique</th>
            <th>Posting Intensity</th>
            <th>Median Posting Duration</th>
          </tr>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.totalPostings}/{val.totalUniquePostings}</td>
                <td>{((val.totalPostings/val.totalUniquePostings).toFixed(0))} : 1</td>
                <td>{val.median} days</td>
              </tr>
            )

        })}
          </table>
    </div>
  );
}
