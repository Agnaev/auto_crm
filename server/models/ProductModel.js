import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		require: true
	}
})

export const Product = mongoose.model('product', ProductSchema)