import mongoose from 'mongoose'

import { MechanicScheduleModel } from '../models/MechanicScheduleModel.js'
import { User } from '../models/UserModel.js'
import { ROLES } from '../helpers/ROLES.js'

export async function registerForService (req, res) {
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
		mechanicSchedule.serviceRecords.push({
			clientId: user._id,
			time
		})
		await mechanicSchedule.save()
		return res.sendStatus(201)
	} catch (e) {
		error(res, 'Error while registering to mechanic. ' + e.message)
	}
}

export async function getMechanicScheduleForADay (req, res) {
	try {
		let { mechanicId, date } = req.query
		if (!mechanicId) {
			return mechanicNotFound(res)
		}
		if (!date) {
			date = new Date().toLocaleDateString()
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

function missingParams (res) {
	error(res, 'Missing parameters')
}
