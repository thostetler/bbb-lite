import 'isomorphic-fetch';
const API = '/api';

const getToken = async () => {
  const token = JSON.parse(localStorage.getItem('ADS-lite#token'));
  console.log(token);
  if (token && validateToken(token)) {
    return token.accessToken;
  }

  let response, json;
  try {
    response = await fetch(API, {
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
  localStorage.setItem('ADS-lite#token', JSON.stringify(tokenData));
  return tokenData.accessToken;
}

const validateToken = (token) => {
  console.log('validating token: ', token);
  return !!token;
}

const doSearch = async (query, options) => {
  let response;
  const body = {
    ...query,
    query: query.query
      .replace('query(', 'query($token: String!, ')
      .replace('search(', 'search(token: $token, '),
    variables: {
      ...query.variables,
      token: await getToken()
    }
  };
  console.log(body);
  try {
    response = await fetch(API, {
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
