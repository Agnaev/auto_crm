import mongoose from 'mongoose'
import { reqString } from '../helpers/reqString.js'

const UserSchema = new mongoose.Schema({
	email: {
		...reqString,
		trim: true
	},
	password: reqString,
	username: reqString,
	role: {
		type: String,
		default: 'client',
		enum: ['client', 'mechanic', 'manager', 'admin']
	},
	carModel: {
		type: String,
		trim: true
	},
	refreshToken: {
		type: String
	}
})

export const User = mongoose.model('user', UserSchema)
