import { Product } from '../models/ProductModel.js'

export async function createStoreItem (req, res) {
	try {
		const { name, description, price } = req.body
		if (!name || !description || !price) {
			return res.status(400).json({
				message: 'Set all fields'
			})
		}
		const product = new Product({
			name,
			description,
			price
		})
		await product.save()
		res.sendStatus(201)
	} catch (e) {
		res.status(400).json({
			message: 'Error while creating product in store. ' + e.message
		})
	}
}

export async function getStoreItems (req, res) {
	try {
		const unnecessaryFields = {
			__v: 0
		}
		const result = await Product.find({}, unnecessaryFields)
		res.status(200).json(
			result
		)
	} catch (e) {
		res.status(400).json({
			message: 'Error while getting store items. ' + e.message
		})
	}
}

export async function updateStoreItem (req, res) {
	try {
		const { _id, name, description, price } = req.body
		if (!_id) {
			return notFoundResponse(res)
		}
		const product = await Product.findById(_id)
		if (!product) {
			return notFoundResponse(res)
		}
		product.name = name
		product.description = description
		product.price = price
		await product.save()
		res.sendStatus(200)
	} catch (e) {
		res.status(400).json({
			message: 'Error while updating store item.' + e.message
		})
	}
}

export async function deleteStoreItem (req, res) {
	try {
		const { _id } = req.query
		if (!_id) {
			return notFoundResponse(res)
		}
		const product = await Product.findById(_id)
		if (!product) {
			return notFoundResponse(res)
		}
		await product.delete()
		res.sendStatus(200)
	} catch (e) {
		res.status(400).json({
			message: 'Error while deleting product. ' + e.message
		})
	}
}

function notFoundResponse (res) {
	res.status(400).json({
		message: 'Product not found'
	})
}
