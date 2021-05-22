import express from 'express'
import {
	getServicesList,
	deleteService,
	updateService,
	createService
} from '../controllers/ServicesController.js'
import { checkUserInRole } from "./middlewares/useRoles.js"
import { useRoles } from './middlewares/useRoles.js'
import { useAuth } from './middlewares/useAuth.js'
import { ROLES } from '../helpers/ROLES.js'

const router = express.Router()

router.get('/', getServicesList)
router.use(useAuth)
router.use(useRoles)
router.use(checkUserInRole(ROLES.manager))
router.post('/', createService)
router.put('/', updateService)
router.delete('/', deleteService)

export default router
