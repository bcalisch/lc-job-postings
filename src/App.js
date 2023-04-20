import { useState, useEffect } from 'react';
import './App.css';
import PostingOverview from './components/PostingOverview.js';
import PostingsTrend from './components/PostingsTrend.js';
import TopRankings from './components/TopRankings';
import { getToken, getTotals, getTimeSeries, getRankings } from './api-clients/jpa.js';

function App() {
  const [token, setToken] = useState(null);
  const [postings, setPostings] = useState('0');
  const [uniquePostings, setUniquePostings] = useState('0');
  const [medianPostingDuration, setMedian] = useState('0');
  const [timeSeries, setTimeSeries] = useState([])
  const [companies, setTopCompanies] = useState([])
  const [cities, setTopCities] = useState([])

  useEffect(() => {
    async function getData() {
      const accessToken = await getToken();

      if(accessToken) {
        const [{median, totalPostings, totalUniquePostings}, timeSeries, topCompanies, topCities] = await Promise.all([
           getTotals(accessToken),
           getTimeSeries(accessToken),
           getRankings(accessToken, 'company_name'),
           getRankings(accessToken, 'city_name'),
        ])
        setTopCompanies(topCompanies);
        setTopCities(topCities);
        setTimeSeries(timeSeries);
        if(median) {
          setMedian(median);
          setPostings(totalPostings);
          setUniquePostings(totalUniquePostings);
        }
        setToken(accessToken);
      }
    };
    try{
      if(!token) {
        getData();
      }
    } catch(error) {
      console.log('error: ', error);
    }
  });

  return (
    <div className="App">
        <p className="header">
          Job Posting Competition: Software Developers
        </p>
        <PostingOverview 
          postings={postings} 
          uniquePostings={uniquePostings}
          medianPostingDuration={medianPostingDuration} />
        <div className="break"></div>
        <PostingsTrend timeSeries={timeSeries} />
        <TopRankings title="Top Companies Posting" headerName="Company" data={companies}/>
        <TopRankings title="Top Cities Posting" headerName="City" data={cities}/>
    </div>
  );
}

export default App;
