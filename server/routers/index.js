import bodyParser from "body-parser"
import cors from 'cors'

import AuthRouter from './AuthRouter.js'
import testRouter from './testAuthProtection.js'
import {checkUserInRole, useRoles} from './middlewares/useRoles.js'
import { useAuth } from './middlewares/useAuth.js'
import { ROLES } from '../helpers/ROLES.js'

export function setRoutes (app) {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(cors())
	app.use('/auth', AuthRouter)
	app.use('/test', useAuth, useRoles, checkUserInRole(ROLES.employee), testRouter)
}
