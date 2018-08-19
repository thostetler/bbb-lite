const fetch = require('isomorphic-fetch');
const querystring = require('querystring');
const memoize = require('memoizee');

const DEFAULT_FIELDS = [
  'title', 'abstract', 'comment',
  'bibcode', 'author', 'keyword',
  'id', 'citation_count', '[citations]',
  'pub', 'aff', 'volume', 'pubdate',
  'doi', 'pub_raw', 'page', 'property',
  'esources', 'data', 'email', 'doctype'
];

const DEFAULT_REQUEST_PARAMS = {
  headers: {
    Accept: 'application/json'
  }
};

const baseURL = 'https://devapi.adsabs.harvard.edu';
const getData = async (path, params, options) => {
  const opts = options ? options : {};
  const requestOptions = {
    ...DEFAULT_REQUEST_PARAMS,
    ...(opts.token && { headers: { Authorization: `Bearer:${opts.token}`}})
  }
  return await fetch(
    `${baseURL}/v1${path}?${querystring.stringify(params)}`,requestOptions);
}

const paginationProvider = memoize((numFound, perPage, start) => {
  const totalPages = Math.ceil(numFound / perPage);
  const currentPage = Math.trunc(start / perPage);
  const hasNextPage = totalPages !== currentPage;
  const hasPreviousPage = currentPage !== 0;
  return { totalPages, currentPage, hasNextPage, hasPreviousPage };
});

const search = async (parent, args) => {
  const { q, sort, rows, start, token } = args;
  const params = {
    sort: sort.join(','),
    fl: DEFAULT_FIELDS.join(','),
    q, rows, start
  };
  console.log('qot a query', args.q);

  let response, data;
  try {
    response = await getData('/search/query', params, { token });
    data = await response.json();
  } catch (e) {
    console.log(e);
  }

  if (response.ok) {
    const docs = data.response.docs.map((d) => {
      const date = d.pubdate.split('-');
      return {
        ...d,
        citations: {
          numReferences: d['[citations]'].num_references,
          numCitations: d['[citations]'].num_citations
        },
        title: d.title.join(' '),
        citationCount: d.citation_count,
        publication: {
          name: d.pub,
          raw: d.pub_raw
        },
        publicationDate: {
          year: date[0] || '00',
          month: date[1] || '00',
          day: date[2] || '00'
        },
        affiliations: d.aff,
        documentType: d.doctype,
        authors: d.author
      };
    });

    const numFound = data.response.numFound;
    return {
      pageInfo: paginationProvider(numFound, params.rows, params.start),
      numFound,
      docs
    };
  }

  return {
    error: {
      status: response.status,
      type: response.statusText,
      message: data.error ? data.error.msg : null
    }
  }
};

const createToken = async (parent, args) => {
  let response, data;

  console.log('creating token');
  try {
    response = await getData('/accounts/bootstrap');
    data = await response.json();
  } catch (e) {
    console.log(e);
  }

  if (response.ok) {
    return {
      ...data,
      clientId: data.client_id,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expires: data.expire_in
    };
  }

  return {
    error: {
      status: response.status,
      type: response.statusText,
      message: 'Could Not Get Token'
    }
  };
}

module.exports = {
  Query: {
    search,
    createToken
  }
}
