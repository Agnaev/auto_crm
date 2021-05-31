import mongoose from 'mongoose'

import { MechanicScheduleModel } from '../models/MechanicScheduleModel.js'
import { User } from '../models/UserModel.js'
import { Service } from '../models/Services.js'
import { ROLES } from '../helpers/ROLES.js'
import { indexer } from '../helpers/indexer.js'
import {
	generateTimes,
	checkHours,
	Time,
	start,
	end
} from '../helpers/Times.js'
import { getUniqueOfTwoArrays } from '../helpers/getUniqueOfTwoArrays.js'

export async function cancelRegistrationForService (req, res) {
	try {
		const { userId } = req.user
		const { mechanicId, date, time } = req.body
		if (!userId) {
			return userNotFound(res)
		}
		if (!mechanicId || !time || !date) {
			return missingParams(res)
		}
		const mechanic = await User.findById(mechanicId)
		if (!mechanic || mechanic.role !== ROLES.mechanic) {
			return mechanicNotFound(res)
		}
		const mechanicSchedule = await MechanicScheduleModel.findOne({ mechanicId, date })
		if (!mechanicSchedule) {
			return res.status(400).json({
				message: 'Mechanic schedule not found.'
			})
		}
		const user = await User.findById(userId)
		if (!user) {
			return userNotFound(res)
		}
		mechanicSchedule.serviceRecords = mechanicSchedule.serviceRecords?.filter(
			x => x.clientId !== user._id
		)
		await mechanicSchedule.save()
		res.sendStatus(200)
	} catch (e) {
		res.status(400).json({
			message: 'Error while canceling registration.'
		})
	}
}

export async function registerForService (req, res) {
	try {
		const { userId } = req.user
		const { mechanicId, date, time, serviceId } = req.body
		if (!userId) {
			return userNotFound(res)
		}
		if (!mechanicId || !time || !date) {
			return missingParams(res)
		}
		const mechanic = await User.findById(mechanicId)
		if (!mechanic || mechanic.role !== ROLES.mechanic) {
			return mechanicNotFound(res)
		}
		const service = await Service.findById(serviceId)
		if (!service) {
			return serviceNotFound(res)
		}
		let mechanicSchedule = await MechanicScheduleModel.findOne({ mechanicId, date })
		if (!mechanicSchedule) {
			mechanicSchedule = new MechanicScheduleModel({
				mechanicId: mechanic._id,
				date,
				serviceRecords: []
			})
		}
		const user = await User.findById(userId)
		if (!user) {
			return userNotFound(res)
		}
		const serviceIds = mechanicSchedule.serviceRecords.map(x => mongoose.Types.ObjectId(x.serviceId))
		console.log('time', time, service.timeInHours, serviceIds)
		const mechanicScheduleServices = await Service.find({
			_id: {
				$in: serviceIds
			}
		})
		const indexedServices = indexer(mechanicScheduleServices)

		const isBusy = mechanicSchedule.serviceRecords.some(el => {
			const startTime = el.time
			const endTime = Time.addHours(startTime, indexedServices[el.serviceId].timeInHours)
			return Time.checkInTime(
				[startTime, endTime],
				[time, Time.addHours(time, service.timeInHours)]
			)
		})
		if (isBusy) {
			return mechanicIsBusy(res)
		}
		mechanicSchedule.serviceRecords.push({
			clientId: user._id,
			serviceId: service._id,
			time
		})
		await mechanicSchedule.save()
		return res.sendStatus(201)
	} catch (e) {
		error(res, 'Error while registering to mechanic. ' + e.message)
	}
}

export async function getMechanicScheduleForAMonth (req, res) {
	try {
		const { mechanicId, serviceId } = req.query
		const mechanic = await User.findById(mechanicId)
		if (!mechanic) {
			return mechanicNotFound(res)
		}
		const service = await Service.findById(serviceId)
		if (!service) {
			return serviceNotFound(res)
		}
		const freeDay = generateTimes(start, end)
		let date = new Date()
		const now = new Date()
		const result = {}
		while (
			date.getMonth() < now.getMonth() + 2 &&
			(date = new Date(+date + 1000 * 60 * 60 * 24))
		) {
			const dayName = date.toLocaleDateString('ru', {
				weekday: 'short'
			})
			if (['вс', 'сб'].includes(dayName)) {
				continue
			}
			const formattedDate = date.toLocaleDateString('ru')
			const scheduleForADay = await MechanicScheduleModel.findOne({ mechanicId, date: formattedDate })
			if (!scheduleForADay) {
				result[formattedDate] = freeDay
			} else {
				let excludeTimes = []
				for(const serviceRecord of scheduleForADay.serviceRecords) {
					const _service = await Service.findById(serviceRecord.serviceId)
					const endTime = Time.addHours(serviceRecord.time, _service.timeInHours)
					excludeTimes = [
						...new Set([
							...excludeTimes,
							...generateTimes(serviceRecord.time, endTime)
						])
					]
				}
				result[formattedDate] = getUniqueOfTwoArrays(freeDay, excludeTimes)
			}
			result[formattedDate] = checkHours(result[formattedDate], service.timeInHours)
				? result[formattedDate]
				: []
		}
		res.status(200).json(
			result
		)
	} catch (e) {
		error(res, 'Error while getting mechanic schedule for a month. ' + e.message)
	}
}

export async function getMechanicScheduleForADay (req, res) {
	try {
		let { mechanicId, date } = req.query
		if (!mechanicId) {
			return mechanicNotFound(res)
		}
		if (!date) {
			date = new Date().toLocaleDateString('ru')
		}
		const data = await MechanicScheduleModel.findOne({
			mechanicId: mongoose.Types.ObjectId(mechanicId),
			date
		}, { __v: 0, _id: 0 })
		res.status(200).json(data)
	} catch (e) {
		error(res, 'Error while getting mechanic schedule. ' + e.message)
	}
}

function error (res, message) {
	res.status(400).json({
		message
	})
}

function mechanicIsBusy (res) {
	error(res, 'Mechanic is busy in selected time')
}

function mechanicNotFound (res) {
	error(res, 'Mechanic not found')
}

function userNotFound (res) {
	error(res, 'User not found')
}

function serviceNotFound (res) {
	error(res, 'Service not found')
}

function missingParams (res) {
	error(res, 'Missing parameters')
}
