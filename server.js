const express = require('express')
const path = require('path')
const next = require('next')
const Router = require('./utils/routes');
const proxy = require('http-proxy-middleware');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schema');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: path.resolve(__dirname, './src'), dev })
const handle = Router.getRequestHandler(app)

const PORT = process.env.PORT || 8000

app.prepare().then(_ => {
	const server = express();
	const graphqlServer = new ApolloServer({ typeDefs, resolvers });

	server.use('/v1', proxy({
    target: 'https://devapi.adsabs.harvard.edu',
		changeOrigin: true
	}));

	server.get('*', (req, res) => handle(req, res));

  graphqlServer.applyMiddleware({
    app: server,
    path: '/api'
  });
	server.listen(PORT, err => {
		if (err) throw err

		console.log(`> App running on port ${PORT}`);
	})
})
