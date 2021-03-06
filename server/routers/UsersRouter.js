import express from 'express'
import {
	getUsersList,
	updateUser,
	deleteUser,
	getMechanicsList,
	updateUserData,
	getCurrentUserData,
	changePassword
} from '../controllers/UsersController.js'
import { useAuth } from './middlewares/useAuth.js'
import { checkUserInRole, useRoles } from './middlewares/useRoles.js'
import { ROLES } from '../helpers/ROLES.js'

const router = express.Router()
router.use(useAuth)
router.use(useRoles)
router.put('/own', updateUserData)
router.get('/own', getCurrentUserData)
router.get('/mechanics', getMechanicsList)
router.put('/password', changePassword)
router.use(checkUserInRole(ROLES.admin))
router.get('/', getUsersList)
router.put('/', updateUser)
router.delete('/', deleteUser)

export default router
