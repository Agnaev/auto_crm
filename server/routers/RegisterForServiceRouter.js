import express from 'express'
import {
	registerForService,
	getMechanicScheduleForADay,
	getMechanicScheduleForAMonth,
	cancelRegistrationForService
} from '../controllers/RegistrationForServiceController.js'
import { useAuth } from './middlewares/useAuth.js'

const router = express.Router()

router.get('/day', getMechanicScheduleForADay)
router.get('/month', getMechanicScheduleForAMonth)
router.use(useAuth)
router.post('/', registerForService)
router.post('/cancel', cancelRegistrationForService)

export default router
