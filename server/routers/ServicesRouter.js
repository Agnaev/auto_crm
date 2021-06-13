import express from 'express'
import {
	getServicesList,
	deleteService,
	updateService,
	createService,
	getMechanicScheduleByService,
	getUserServiceRecords,
	getMechanicSchedule,
	updateServiceState
} from '../controllers/ServicesController.js'
import {
	checkUserInRole,
	useRoles
} from './middlewares/useRoles.js'
import { useAuth } from './middlewares/useAuth.js'
import { ROLES } from '../helpers/ROLES.js'

const router = express.Router()

router.get('/', getServicesList)
router.use(useAuth)
router.use(useRoles)

router.get('/busy', getMechanicScheduleByService)
router.get('/my-services', getUserServiceRecords)
router.get(
	'/mechanic',
	checkUserInRole(ROLES.mechanic),
	getMechanicSchedule
)
router.post('/check-in', updateServiceState)
router.use(checkUserInRole(ROLES.manager))
router.post('/', createService)
router.put('/', updateService)
router.delete('/', deleteService)

export default router
