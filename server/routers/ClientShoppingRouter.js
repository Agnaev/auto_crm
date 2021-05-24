import express from 'express'
import {
	addItemToClientCart,
	removeProduct,
	getUserShoppingCart
} from '../controllers/ClientShopingCartController.js'
import { useAuth } from './middlewares/useAuth.js'

const router = express.Router()

router.use(useAuth)
router.get('/', getUserShoppingCart)
router.post('/', addItemToClientCart)
router.delete('/', removeProduct)

export default router
