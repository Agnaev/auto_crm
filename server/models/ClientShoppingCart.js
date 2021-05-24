import mongoose from 'mongoose'

const product = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	count: {
		type: Number,
		min: 0,
		default: 1
	}
})

const ShoppingCartSchema = new mongoose.Schema({
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	products: [product]
})

export const ShoppingCart = new mongoose.model('shopping_cart', ShoppingCartSchema)
