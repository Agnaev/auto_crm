import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'

import AuthRouter from './AuthRouter.js'
import testRouter from './testAuthProtection.js'
import UsersRouter from './UsersRouter.js'
import ServicesRouter from './ServicesRouter.js'
import StoreRouter from './StoreRouter.js'
import ShoppingCartRouter from './ClientShoppingRouter.js'
import RegisterForServiceRouter from './RegisterForServiceRouter.js'
import CarModelRouter from './CarModelsRouter.js'
import OrdersRouter from './OrdersRouter.js'

const router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(cors())

router.use('/auth', AuthRouter)
router.use('/users', UsersRouter)
router.use('/test', testRouter)
router.use('/services', ServicesRouter)
router.use('/store', StoreRouter)
router.use('/shopping-cart', ShoppingCartRouter)
router.use('/register-service', RegisterForServiceRouter)
router.use('/car-models', CarModelRouter)
router.use('/orders', OrdersRouter)
router.use((req, res) => res.sendStatus(404))

export default router
