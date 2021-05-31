import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const serviceRecordsSchema = new mongoose.Schema({
	clientId: {
		type: ObjectId,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	serviceId: {
		type: ObjectId,
		required: true
	}
})

const MechanicScheduleSchema = new mongoose.Schema({
	mechanicId: {
		type: ObjectId,
		required: true
	},
	date: {
		type: String,
		validate: /\d{2}.\d{2}.\d{4}/,
		required: true
	},
	serviceRecords: [serviceRecordsSchema]
})

export const MechanicScheduleModel = mongoose.model('mechanicSchedule', MechanicScheduleSchema)
