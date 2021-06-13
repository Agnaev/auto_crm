import express from 'express'
import mongoose from 'mongoose'
import env from 'dotenv'
import path from 'path'

import router from './routers/index.js'
import { createAdminIfNotExist } from './helpers/createAdminIfNotExist.js'

env.config(path.join(process.cwd(), '.env'))

const app = express()
app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
	const clientsFilesLocation = path.join(
		process.cwd(),
		'..',
		'client',
		'dist'
	)
	app.use(
		express.static(
			clientsFilesLocation
		)
	)

	app.get('/', (req, res) => {
		res.sendFile(
			path.join(
				clientsFilesLocation,
				'index.html'
			)
		)
	})
}

async function main () {
	try {
		await mongoose.connect(
			process.env.MONGO_CONNECTION_STRING,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: false
			}
		)
	} catch (e) {
		console.error('Не удается подключиться к базе данных mongoDB. ', e.message)
		process.exit(1)
	}

	await createAdminIfNotExist()

	const port = process.env.APP_PORT || 4000
	const host = process.env.APP_HOST || 'localhost'

	app.listen(port, host, () => {
		console.log(`Server has been started at http://${host}:${port}`)
	})
}

main()
