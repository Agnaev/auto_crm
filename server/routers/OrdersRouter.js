import express from 'express'
import {
	createOrder,
	getAllOrders,
	getOrders,
	changeOrderState
} from '../controllers/OrdersController.js'
import { useAuth } from './middlewares/useAuth.js'
import { checkUserInRole } from './middlewares/useRoles.js'
import { ROLES } from '../helpers/ROLES.js'

const router = express.Router()

router.use(useAuth)
router.post('/', createOrder)
router.get('/', getOrders)
router.use(checkUserInRole(ROLES.manager))
router.get('/all', getAllOrders)
router.put('/state', changeOrderState)

export default router
