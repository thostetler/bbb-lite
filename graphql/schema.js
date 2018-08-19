const { gql } = require('apollo-server-express');

module.exports = gql`
type Query {
  search(
    q: String!,
    sort: [String!] = [],
    rows: Int = 25,
    start: Int = 0,
    token: String!
  ): Result,
  createToken: Token!
}

type Token {
  username: String!
  scopes: [String!]!
  clientId: String!
  accessToken: String!
  expires: String!
  refreshToken: String!
}

type Result {
  docs: [Document]
  numFound: Int
  pageInfo: PageInfo
  error: Error
}

type Error {
  status: Int!
  type: String!
  message: String
}

type PageInfo {
  currentPage: Int!
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  totalPages: Int!
}

type Document {
  abstract: String
  affiliations: [String]
  authors: [String]
  bibcode: String
  citationCount: Int
  citations: Citations
  documentType: String
  doi: [String]
  esources: [String]
  id: String
  page: [String]
  publication: Publication
  publicationDate: Date
  title: String
  volume: String
}

type Citations {
  numReferences: Int
  numCitations: Int
}

type Publication {
  name: String
  raw: String
}

type Date {
  day: String
  month: String
  year: String
}
`

