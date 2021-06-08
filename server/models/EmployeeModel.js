import mongoose from 'mongoose'
import { reqString } from '../helpers/reqString.js'

const EmployeeSchema = new mongoose.Schema({
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true
	},
	salary: reqString,
	address: reqString,
	phone: {
		...reqString,
		validate: /^((\+?7)|(^8))[ -]?\d{3}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/
	}
})

export const EmployeeModel = mongoose.model('employee', EmployeeSchema)
