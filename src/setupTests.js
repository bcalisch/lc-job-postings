// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

export const ENV = {
  REACT_APP_CLIENT_ID: 'clientId',
  REACT_APP_CLIENT_SECRET: 'secret-secrets',
  REACT_APP_ACCES_TOKEN_URL:'access-url',
  REACT_APP_BASE_URL: 'base-url',
}

process.env = {
  ...process.env,
  ...ENV,
}
