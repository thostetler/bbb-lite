import 'isomorphic-fetch';
import { setStorageItem, getStorageItem } from '../services/localStorage';
const API = '/api';

const getURL = (req) => {
  const baseURL = req ? `${req.protocol}://${req.get('Host')}` : '';
  return baseURL + API;
}

const getToken = async (req) => {
  const token = getStorageItem('token');
  console.log('got token: ', token);
  if (token && validateToken(token)) {
    return token.accessToken;
  }

  let response, json;
  try {
    response = await fetch(getURL(req), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: '{ createToken { accessToken, expires } }'
      })
    });
    json = await response.json();
  } catch (e) {
    console.error(e);
  }
  const tokenData = json.data.createToken;
  setStorageItem('token', tokenData);
  return tokenData.accessToken;
}

const validateToken = (token) => {
  console.log('validating token: ', token);
  return !!token;
}

const doSearch = async (query, options) => {
  const { req } = options || {};
  if (req) {
    options = { ...options, req: undefined };
  }

  let response;
  const body = {
    ...query,
    query: query.query
      .replace('query(', 'query($token: String!, ')
      .replace('search(', 'search(token: $token, '),
    variables: {
      ...query.variables,
      token: await getToken(req)
    }
  };
  console.log(body);
  try {
    response = await fetch(getURL(req), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(body),
      ...options
    });
  } catch (e) {
    console.error(e);
  }
  return response;
}

export default doSearch;
