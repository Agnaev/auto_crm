import bodyParser from "body-parser"
import cors from 'cors'

import AuthRouter from './AuthRouter.js'
import testRouter from './testAuthProtection.js'
import UsersRouter from './UsersRouter.js'
import ServicesRouter from './ServicesRouter.js'
import StoreRouter from './StoreRouter.js'

export function setRoutes (app) {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(cors())
	app.use('/auth', AuthRouter)
	app.use('/users', UsersRouter)
	app.use('/test', testRouter)
	app.use('/services', ServicesRouter)
	app.use('/store', StoreRouter)
	app.use((req, res) => res.sendStatus(404))
}
