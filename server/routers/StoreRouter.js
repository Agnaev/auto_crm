import express from 'express'
import { useAuth } from './middlewares/useAuth.js'
import { useRoles, checkUserInRole } from './middlewares/useRoles.js'
import { ROLES } from '../helpers/ROLES.js'
import {
	getStoreItems,
	createStoreItem,
	updateStoreItem,
	deleteStoreItem
} from '../controllers/StoreController.js'

const router = express.Router()

router.get('/', getStoreItems)
router.use(useAuth)
router.use(useRoles)
router.use(checkUserInRole(ROLES.manager))
router.post('/', createStoreItem)
router.put('/', updateStoreItem)
router.delete('/', deleteStoreItem)

export default router
