const routes = require('next-routes');

module.exports = routes()
	.add('abstract', 'abs/:bibcode');
