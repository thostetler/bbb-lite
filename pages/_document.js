import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<html style={{ background: '#EEE', color: '#444' }}>
				<Head>
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"
					/>
					<meta name="theme-color" content="#673ab7" />
					<link rel="manifest" href="static/manifest.json" />
					<link rel="icon" href="static/img/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
					<title>ADS Lite</title>
				</Head>
				<body className="w-100 helvetica">
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
