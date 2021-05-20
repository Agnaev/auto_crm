import express from 'express'
import {
	getUsersList,
	updateUser,
	deleteUser
} from '../controllers/UsersController.js'

const router = express.Router()

router.get('/', getUsersList)
router.put('/', updateUser)
router.delete('/', deleteUser)

export default router
