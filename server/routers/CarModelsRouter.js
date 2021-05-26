import express from 'express'
import {
	getCarModelsList
} from '../controllers/CarModelsController.js'

const router = express.Router()

router.get('/', getCarModelsList)

export default router
