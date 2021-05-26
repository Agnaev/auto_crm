import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true
	},
	salary: {
		type: Number,
		required: true
	}
})

export const EmployeeModel = mongoose.model('employee', EmployeeSchema)
