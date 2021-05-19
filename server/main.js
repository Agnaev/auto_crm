import express from 'express'
import mongoose from 'mongoose'
import env from 'dotenv'
import path from 'path'

import { setRoutes } from './routers/index.js'

env.config(path.join(process.cwd(), '.env'))

const app = express()
setRoutes(app)

async function main () {
	await mongoose.connect(
		process.env.MONGO_CONNECTION_STRING,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false
		}
	)

	const port = process.env.APP_PORT || 4000
	const host = process.env.APP_HOST || 'localhost'

	app.listen(port, host, () => {
		console.log(`Server has been started at http://${host}:${port}`)
	})
}

main()
