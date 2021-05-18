import express from "express"
import { login, signup, refresh } from "../controllers/AuthController.js"

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/refresh', refresh)

export default router
