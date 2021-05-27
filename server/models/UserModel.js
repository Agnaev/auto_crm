import mongoose from 'mongoose'
import { reqString } from '../helpers/reqString.js'
import { ROLES } from '../helpers/ROLES.js'

const UserSchema = new mongoose.Schema({
	email: {
		...reqString,
		trim: true
	},
	password: reqString,
	username: reqString,
	role: {
		type: String,
		default: ROLES.client,
		enum: Object.values(ROLES)
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
