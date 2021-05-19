import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: 'client',
		enum: ['client', 'mechanic', 'manager', 'admin']
	},
	refreshToken: {
		type: String
	}
})

export const User = mongoose.model('user', UserSchema)
