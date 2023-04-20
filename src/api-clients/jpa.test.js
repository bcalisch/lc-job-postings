
import * as axios from "axios";
import { getTimeSeries } from './jpa';

jest.mock('axios');

test('the results from the time series call is combined into one array', async () => {
axios.post.mockResolvedValueOnce({
  data: {
    data: {
      timeseries: {
        day: [
          "2023-03-19",
          "2023-03-20",
          "2023-03-21",
          "2023-03-22",
          "2023-03-23",
        ],
        unique_postings: [
          3196,
          3221,
          3279,
          3315,
          3369,
        ]
      }
    }
  }
});
  const result = await getTimeSeries();

  expect(result).toEqual([
    {day: '2023-03-19', unique_postings: 3196},
    {day: '2023-03-20', unique_postings: 3221},
    {day: '2023-03-21', unique_postings: 3279},
    {day: '2023-03-22', unique_postings: 3315},
    {day: '2023-03-23', unique_postings: 3369},
  ])
})
