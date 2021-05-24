import { ShoppingCart } from '../models/ClientShoppingCart.js'
import { Product } from '../models/ProductModel.js'
import { User } from '../models/UserModel.js'
import { Service } from '../models/Services.js'

export async function addItemToClientCart (req, res) {
	const error = sendErrorMessage.bind(null, res)
	const noUser = userNotFound.bind(null, res)
	const noProduct = productNotFound.bind(null, res)
	try {
		const { productId } = req.body
		const { userId } = req.user
		if (!userId) {
			return noUser()
		}
		if (!productId) {
			return noProduct()
		}
		const client = await User.findById(userId)
		if (!client) {
			return noUser()
		}
		let product = await Product.findById(productId)
		if (!product) {
			product = await Service.findById(productId)
		}
		if (!product) {
			return noProduct()
		}
		let userShoppingCart = await ShoppingCart.findOne({ clientId: client._id }, { __v: 0 })
		if (!userShoppingCart) {
			userShoppingCart = new ShoppingCart({
				clientId: client._id,
				products: [{
					count: 1,
					productId: product._id
				}]
			})
			await userShoppingCart.save()
			return res.sendStatus(201)
		}
		const productInCart = userShoppingCart
			.products
			.find(
				el => el.productId.toString() === product._id.toString()
			)

		if (productInCart) {
			productInCart.count++
		} else {
			userShoppingCart.products.push({
				count: 1,
				productId: product._id
			})
		}
		await userShoppingCart.save()
		res.sendStatus(200)
	} catch (e) {
		error('Error while adding item to user shopping cart. ' + e.message)
	}
}

export async function removeProduct (req, res) {
	const error = sendErrorMessage.bind(null, res)
	const noUser = userNotFound.bind(null, res)
	const noProduct = productNotFound.bind(null, res)
	try {
		const { userId } = req.user
		const { productId } = req.query
		if (!userId) {
			return noUser()
		}
		if (!productId) {
			return noProduct()
		}
		const client = await User.findById(userId)
		if (!client) {
			return noUser()
		}
		let product = await Product.findById(productId)
		if (!product) {
			product = await Service.findById(productId)
		}
		if (!product) {
			return noProduct()
		}
		const userShoppingCart = await ShoppingCart.findOne({ clientId: client._id })
		if (!userShoppingCart) {
			return error('User shopping cart does not exist.')
		}
		const foundedProduct = userShoppingCart.products.find(
			el => el.productId.toString() === product._id.toString()
		)
		if (!foundedProduct) {
			return error('Selected product not in user shopping cart')
		}
		if (foundedProduct.count === 1) {
			userShoppingCart.products = userShoppingCart.products.filter(
				el => el.productId.toString() !== product._id.toString()
			)
		} else {
			foundedProduct.count--
		}
		await userShoppingCart.save()
		res.status(200).json(userShoppingCart.products)
	} catch (e) {
		error('Error while removing product from user shopping cart. ' + e.message)
	}
}

export async function getUserShoppingCart (req, res) {
	const error = sendErrorMessage.bind(null, res)
	const noUser = userNotFound.bind(null, res)
	try {
		const { userId } = req.user
		if (!userId) {
			return noUser()
		}
		const client = await User.findById(userId)
		if (!client) {
			return noUser()
		}
		const shoppingCart = await ShoppingCart.findOne({ clientId: client._id })
		if (!shoppingCart) {
			return res.status(200).send([])
		}
		return res.status(200).json(shoppingCart)
	} catch (e) {
		error('Error while getting user shopping cart.' + e.message)
	}
}

function sendErrorMessage (res, message) {
	res.status(400).json({
		message
	})
}

function userNotFound (res) {
	sendErrorMessage(res, 'User not found')
}

function productNotFound (res) {
	sendErrorMessage(res, 'Product or service not found')
}
