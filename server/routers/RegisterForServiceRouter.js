import express from 'express'
import {
	registerForService,
	getMechanicScheduleForADay,
	getMechanicScheduleForAMonth
} from '../controllers/RegistrationForServiceController.js'
import { useAuth } from './middlewares/useAuth.js'

const router = express.Router()

router.post('/', useAuth, registerForService)
router.get('/day', getMechanicScheduleForADay)
router.get('/month', getMechanicScheduleForAMonth)

export default router
