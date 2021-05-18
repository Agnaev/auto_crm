import bodyParser from "body-parser"
import AuthRouter from './AuthRouter.js'
import testRouter from './testAuthProtection.js'

import { useAuth } from "./middlewares/useAuth.js"

export function setRoutes (app) {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use('/auth', AuthRouter)
	app.use('/test', useAuth, testRouter)
}
