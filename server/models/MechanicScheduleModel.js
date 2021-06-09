import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const serviceStates = {
	created: 'created', // клиент записался на оказание услуги
	in_service: 'in_service', // клиент в автосервисе
	service_provided: 'service_provided', // услуга успешно оказана
	service_canceled: 'service_canceled' // услуга не оказана
}

const serviceRecordsSchema = new mongoose.Schema({
	clientId: {
		type: ObjectId,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: false,
		default: serviceStates.created,
		enum: Object.keys(serviceStates)
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
