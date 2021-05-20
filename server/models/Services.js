import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
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
		required: true
	},
	date: {
		type: Date,
		required: true
	}
})

export const Service = new mongoose.model('service', ServiceSchema)
