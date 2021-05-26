import express from 'express'
import {
	registerForService,
	getMechanicScheduleForADay
} from '../controllers/RegistrationForServiceController.js'
import { useAuth } from './middlewares/useAuth.js'

const router = express.Router()

router.post('/', useAuth, registerForService)
router.get('/day', getMechanicScheduleForADay)

export default router
