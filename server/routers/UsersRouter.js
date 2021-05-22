import express from 'express'
import {
	getUsersList,
	updateUser,
	deleteUser
} from '../controllers/UsersController.js'
import { useAuth } from './middlewares/useAuth.js'
import {checkUserInRole, useRoles} from './middlewares/useRoles.js'
import {ROLES} from '../helpers/ROLES.js'

const router = express.Router()
router.use(useAuth)
router.use(useRoles)
router.use(checkUserInRole(ROLES.admin))
router.get('/', getUsersList)
router.put('/', updateUser)
router.delete('/', deleteUser)

export default router
