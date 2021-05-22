import express from "express"
import {
	login,
	signup,
	refresh,
	logout
} from "../controllers/AuthController.js"
import { useAuth } from './middlewares/useAuth.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', useAuth, logout)
router.post('/signup', signup)
router.post('/refresh', refresh)

export default router
