import { ShoppingCart } from '../models/ClientShoppingCart.js'
import { OrderModel, OrderStates } from '../models/OrderModel.js'
import { User } from '../models/UserModel.js'
import { Product } from '../models/ProductModel.js'

export async function createOrder (req, res) {
	try {
		const { shoppingCartId } = req.body
		if (!shoppingCartId) {
			return error(res, 'Missing params')
		}
		const clientShoppingCart = await ShoppingCart.findById(shoppingCartId)
		if (!clientShoppingCart) {
			return error(res, 'Client shopping cart not found.')
		}
		const order = new OrderModel({
			...clientShoppingCart.toJSON(),
			state: OrderStates.created
		})
		await order.save()
		await clientShoppingCart.delete()
		return res.sendStatus(201)
	} catch (e) {
		error(res, 'Error while creating order. ' + e.message)
	}
}

export async function getOrders (req, res) {
	try {
		const { userId } = req.user
		const orders = await OrderModel.find({ clientId: userId }, { __v: 0 })
		const result = []

		for (const order of orders) {
			const item = {
				...order.toJSON(),
				products: []
			}
			for (const { productId, count } of order.products) {
				const product = await Product.findById(productId, { __v: 0 })
				item.products.push({
					name: product.name,
					description: product.description,
					price: product.price,
					count
				})
			}
			result.push(item)
		}
		res.status(200).json(result)
	} catch (e) {
		error(res, 'Error while getting orders list. ' + e.message)
	}
}

export async function getAllOrders (req, res) {
	try {
		const orders = await OrderModel.find({}, { __v: 0 })
		const result = []
		const selectedUserFields = {
			role: 1,
			email: 1,
			username: 1
		}
		for (const order of orders) {
			const item = {
				...order.toJSON(),
				user: await User.findById(order.clientId).select(selectedUserFields),
				products: []
			}
			for (const { productId, count } of order.products) {
				const product = await Product.findById(productId, { __v: 0 })
				item.products.push({
					name: product.name,
					description: product.description,
					price: product.price,
					count
				})
			}
			result.push(item)
		}
		res.status(200).json(result)
	} catch (e) {
		error(res, 'Error while getting all orders. ' + e.message)
	}
}

export async function changeOrderState (req, res) {
	try {
		const { orderId, status } = req.body
		if (!orderId || !status) {
			return error(res, 'missing params.')
		}
		if (!(status in OrderStates)) {
			return error(res, 'Selected state not exist.')
		}
		const order = await OrderModel.findById(orderId)
		order.state = OrderStates[status]
		await order.save()
		return res.sendStatus(200)
	} catch (e) {
		error(res, 'Error while changing order state. ' + e.message)
	}
}

function error (res, message) {
	res.status(400).json({
		message
	})
}
