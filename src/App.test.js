import * as axios from "axios";
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { ENV } from './setupTests.js';

jest.mock('axios');

test('renders Header with software developer data', () => {
  render(<App />);
  const linkElement = screen.getByText(/Job Posting Competition: Software Developers/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Job Postings Overview', () => {
  render(<App />);
  const linkElement = screen.getByText(/Job Postings Overview/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Job Postings Overview Unique Postings', () => {
  render(<App />);
  const postings = screen.getByTestId('uniquePostings');
  expect(postings.innerHTML).toEqual('0');
});

test('renders Job Postings Overview Posting Intensity', () => {
  render(<App />);
  const intensity = screen.getByTestId('postingIntensity');
  expect(intensity.innerHTML).toEqual('0 : 1');
});

test('renders Job Postings Overview Median Posting Duration', () => {
  render(<App />);
  const linkElement = screen.getByText(/Median Posting Duration/i);
  const postingDuration = screen.getByTestId('medianPostingDuration');
  screen.getByTestId('medianPostingDuration');
  expect(linkElement).toBeInTheDocument();
  expect(postingDuration.innerHTML).toEqual('0 days');
});

test('renders explanation', () => {
  render(<App />);
  const linkElement = screen.getByText(/There were 0 total job postings/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Unique Postings Trend Overview', () => {
  render(<App />);
  const linkElement = screen.getByText(/Unique Postings Trend/i);
  expect(linkElement).toBeInTheDocument();
});

const TOTALS_BODY = {
  filter: {
    when: {
      start: '2020-01',
      end: '2021-12',
    },
    title_name:['Software Developers'],
  },
    metrics: ['unique_postings', 'total_postings', 'median_posting_duration'],
}
const TIMESERIES_BODY = {
  filter: {
    when: {
      start: '2020-01',
      end: '2021-12',
    },
    title_name:['Software Developers'],
  },
    metrics: ['unique_postings'],
}
test('when we call post in axios', async () => {
  axios.post.mockResolvedValueOnce({
    data: {
      access_token: 'my-access-token',
    }
  })
  axios.post.mockResolvedValueOnce({
    data: {
      data: {
        totals: {
          median_posting_duration: 20,
          total_postings: 5000000,
          unique_postings: 1111111,
        }
      }
    }
  });
  

  render(<App />);
  const postingDuration = screen.getByTestId('medianPostingDuration');
  const intensity = screen.getByTestId('postingIntensity');
  const uniquePostings = screen.getByTestId('uniquePostings');
  expect(axios.post).toHaveBeenCalledWith(ENV.REACT_APP_ACCES_TOKEN_URL,
    {
      client_id: ENV.REACT_APP_CLIENT_ID,
      client_secret: ENV.REACT_APP_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope: 'postings:us',
    },{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }}
  );
  await waitFor(() => {
    expect(intensity.innerHTML).toEqual('5 : 1');
    setTimeout(() => {
      
    }, 1000);
  })
    expect(postingDuration.innerHTML).toEqual('20 days');
    expect(uniquePostings.innerHTML).toEqual('1,111,111');
  
  expect(axios.post).toHaveBeenCalledWith(`${ENV.REACT_APP_BASE_URL}/totals`,
      TOTALS_BODY,
    {
      headers: {
        'authorization': 'Bearer my-access-token',
        'Content-Type': 'application/json',
      }}
  );
  
  expect(axios.post).toHaveBeenCalledWith(`${ENV.REACT_APP_BASE_URL}/timeseries`,
      TIMESERIES_BODY,
    {
      headers: {
        'authorization': 'Bearer my-access-token',
        'Content-Type': 'application/json',
      }}
  );

})
