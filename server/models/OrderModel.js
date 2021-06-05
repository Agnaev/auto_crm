import mongoose from 'mongoose'
import { product } from './ClientShoppingCart.js'

export const OrderStates = {
	created: 'created',
	in_process: 'in_process',
	processed: 'processed',
	canceled: 'canceled',
	finished: 'finished'
}

const OrderSchema = new mongoose.Schema({
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	state: {
		type: String,
		required: true,
		enum: Object.keys(OrderStates)
	},
	products: [product]
})

export const OrderModel = new mongoose.model('order', OrderSchema)
