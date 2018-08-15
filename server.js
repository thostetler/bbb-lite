const express = require('express')
const path = require('path')
const next = require('next')
const Router = require('./utils/routes');
const compression = require('compression');
const proxy = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = Router.getRequestHandler(app)

const PORT = process.env.PORT || 8000

app.prepare().then(_ => {
	const server = express();

	server.use('/v1', proxy({
		target: 'https://devapi.adsabs.harvard.edu',
		changeOrigin: true
	}));

	server.get('*', (req, res) => handle(req, res));

	server.listen(PORT, err => {
		if (err) throw err

		console.log(`> App running on port ${PORT}`)
	})
})
