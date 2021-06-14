import mongoose from "mongoose"

import { Service } from '../models/Services.js'
import { User } from '../models/UserModel.js'
import { MechanicScheduleModel } from '../models/MechanicScheduleModel.js'
import { ROLES } from '../helpers/ROLES.js'

export async function getServicesList (req, res) {
	try {
		const unnecessaryFields = {
			__v: 0,
		}
		const response = await Service.find({}, unnecessaryFields)
		res.status(200).json(response)
	} catch (e) {
		res.status(404).json({
			message: 'Error while getting services list.' + e.message
		})
	}
}

export async function createService (req, res) {
	try {
		const { name, description, price, timeInHours } = req.body
		if (!name || !description || !price || !timeInHours) {
			return res.status(400).json({
				message: 'Invalid data'
			})
		}
		const service = new Service({
			name,
			description,
			price,
			timeInHours
		})
		await service.save()
		res.sendStatus(201)
	} catch (e) {
		res.status(404).json({
			message: 'Error while creating service',
			error: e.message
		})
	}
}

export async function deleteService (req, res) {
	try {
		const { _id } = req.query
		if (!_id) {
			return res.status(400).json({
				message: 'Specify id of deleting service'
			})
		}
		const service = await Service.findById(_id)
		if (!service) {
			return res.status(400).json({
				message: 'Could not find service by id'
			})
		}
		await service.delete()
		res.status(200).json({
			message: 'Deleted'
		})
	} catch (e) {
		res.status(400).json({
			message: 'Error while deleting service',
			error: e.message
		})
	}
}

export async function updateServiceState (req, res) {
	try {
		const { date, time, serviceId, state, clientId } = req.body
		const { userId } = req.user
		if (!date || !time || !serviceId || !clientId) {
			return invalid('Missing params.')
		}
		const user = await User.findById(clientId)
		if (!user) {
			return invalid('User not found.')
		}
		const mechanic = await User.findById(userId)
		if (!mechanic || mechanic.role !== ROLES.mechanic) {
			return invalid('Mechanic not found.')
		}
		const service = await Service.findById(serviceId)
		if (!service) {
			return invalid('Could not find service.')
		}
		const mechanicSchedule = await MechanicScheduleModel.findOne({
			mechanicId: mechanic._id,
			date,
			'serviceRecords.time': time,
			'serviceRecords.serviceId': service._id,
			'serviceRecords.clientId': user._id
		})
		if (!mechanicSchedule) {
			return invalid('Item not found in mechanic schedule.')
		}
		const serviceRecord = mechanicSchedule.serviceRecords?.find(x => x.time === time)
		if (!serviceRecord) {
			return invalid('Item not found in mechanic schedule.')
		}
		serviceRecord.state = state
		await mechanicSchedule.save()
		res.sendStatus(200)
	} catch (e) {
		res.status(400).json({
			message: 'Error while updating user service state. ' + e.message
		})
	}

	function invalid (message, status = 400) {
		res.status(status).json({
			message
		})
	}
}

export async function updateService (req, res) {
	try {
		const { _id, name, description, price, timeInHours } = req.body
		if (!_id || !name || !description || !price || !timeInHours) {
			return res.status(400).json({
				message: 'Nothing to update'
			})
		}
		const service = await Service.findById(_id, { __v: 0 })
		service.name = name
		service.description = description
		service.price = price
		service.timeInHours = timeInHours
		await service.save()
		res.status(200).json(service)
	} catch (e) {
		res.status(400).json({
			message: 'Error while updating service',
			error: e.message
		})
	}
}

export async function getMechanicScheduleByService (req, res) {
	try {
		const { masterId, serviceId } = req.query
		if (!masterId || !serviceId) {
			return res.status(400).json({
				message: 'Set master id and service id for getting master schedule.'
			})
		}
		const master = await User.findById(masterId, {
			password: 0,
			__v: 0,
			role: 0,
			refreshToken: 0
		})
		if (!master) {
			return res.status(400).json({
				message: 'Master id is not a valid identifier.'
			})
		}
		const service = await Service.findById(serviceId)
		if (!service) {
			return res.status(400).json({
				message: 'Could not find service by passed service id.'
			})
		}
		const masterSchedule = await MechanicScheduleModel.find({
			mechanicId: master._id
		})
		res.status(200).json({
			master,
			service,
			masterSchedule
		})
	} catch (e) {
		res.status(500).json({
			message: 'Error while getting mechanic schedule. ' + e.message
		})
	}
}

export async function getUserServiceRecords (req, res) {
	try {
		const { userId } = req.user
		const userServices = await MechanicScheduleModel.find({
			'serviceRecords.clientId': mongoose.Types.ObjectId(userId)
		})
		const services = userServices
			.map(x => {
				return x.serviceRecords.map(service => ({
					clientId: service.clientId,
					service: service.serviceId,
					mechanicId: x.mechanicId,
					time: service.time,
					date: x.date,
					state: service.state
				}))
			})
			.flat()
			.filter(x => x.clientId.toString() === userId)
		for (const serviceRecord of services) {
			serviceRecord.service = await Service.findById(serviceRecord.service, { __v: 0 })
		}
		res.status(200).json(services)
	} catch (e) {
		res.status(400).json({
			message: 'Error while getting user service records. ' + e.message
		})
	}
}

export async function getMechanicSchedule (req, res) {
	try {
		const { userId } = req.user
		const user = await User.findById(userId)
		if (!user || user?.role !== ROLES.mechanic) {
			res.status(400).json({
				message: ''
			})
		}
		const userSchedule = await MechanicScheduleModel.find({
			mechanicId: user._id
		}, {
			__v: 0
		})
		const result = []
		const curDate = new Date()
		for (const item of userSchedule) {
			for (const record of item.serviceRecords) {
				if (+toDate(item.date, record.time) < +curDate) {
					continue
				}
				result.push({
					date: item.date,
					time: record.time,
					state: record.state,
					service: await Service.findById(record.serviceId, {
						__v: 0
					}),
					user: await User.findById(record.clientId ).select({
						username: 1,
						email: 1,
						_id: 1,
						carModel: 1
					})
				})
			}
		}
		res.status(200).json(result)
	} catch (e) {
		res.status(400).json({
			message: 'Error while getting mechanic schedule. ' + e.message
		})
	}
}

function toDate (date, time) {
	const [d, m, y] = date.split('.')
	return new Date(`${d}-${m}-${y} ${time}`)
}
