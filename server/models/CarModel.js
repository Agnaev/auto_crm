import mongoose from "mongoose"

const modelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
})

export const CarModel = mongoose.model('carModel', modelSchema)