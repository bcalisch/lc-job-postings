import axios from 'axios';
import moment from 'moment';

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_ACCES_TOKEN_URL,
  REACT_APP_BASE_URL,
} = process.env;

export async function getToken() {
  const result = await axios.post(REACT_APP_ACCES_TOKEN_URL, {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: REACT_APP_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'postings:us',
    },
    {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });

  return result && result.data && result.data.access_token;
}
export async function getRankings(accessToken, facet) {
  const result = await axios.post(`${REACT_APP_BASE_URL}/rankings/${facet}`,
    {
    filter: {
      when: {
        start: '2020-01',
        end: '2021-12',
        },
      title_name:['Software Developers'],
    },
        rank: {
          by: 'unique_postings',
          limit: 10,
          extra_metrics: ['unique_postings', 'total_postings', 'median_posting_duration'],
        }
  }, {
      headers: {

      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      }
    }
  )

  const buckets = (result && 
    result.data && 
    result.data.data && 
    result.data.data.ranking && 
    result.data.data.ranking.buckets) || [] ;
    return buckets.map(bucket => ({
      median: bucket.median_posting_duration, 
      totalUniquePostings: bucket.unique_postings,
      totalPostings: bucket.total_postings,
      name: bucket.name,
  })) ;
    }

export async function getTotals(accessToken) {
  const result = await axios.post(`${REACT_APP_BASE_URL}/totals`,
    {
    filter: {
      when: {
        start: '2020-01',
        end: '2021-12',
        },
      title_name:['Software Developers'],
    },
      metrics: ['unique_postings', 'total_postings', 'median_posting_duration'],
  }, {
      headers: {

      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      }
    }
  )

  const totals = (result && 
    result.data && 
    result.data.data && 
    result.data.data.totals) || {} ;
    return { 
      median: totals.median_posting_duration, 
      totalUniquePostings: totals.unique_postings,
      totalPostings: totals.total_postings,
    }
}

async function getSeriesForYear(accessToken, year) {
  const result = await axios.post(`${REACT_APP_BASE_URL}/timeseries`, {
  filter: {
    when: {
      start: `${year}-03-20`,
      end: `${year}-04-20`,
    },
    title_name:['Software Developers'],
  },
    metrics: ['unique_postings'],
  }, {
      headers: {

      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      }
    }
  );
  const data = (result 
    && result.data 
    && result.data.data 
    && result.data.data.timeseries) || { day: [], unique_postings: []};


  
return data.unique_postings.map((posting, index) => {
    const day = data.day[index];
    return { date: moment(day).format('M/DD'), unique_postings: posting, year: moment(day).format('YYYY')};
  });

}
export async function getTimeSeries(accessToken) {
  const [ lastYear, thisYear] = await Promise.all([
  getSeriesForYear(accessToken, '2022'),
  getSeriesForYear(accessToken, '2023'),

  ]);

  return [...lastYear, ...thisYear];
  
}
