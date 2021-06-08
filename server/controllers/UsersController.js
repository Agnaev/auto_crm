import { User } from '../models/UserModel.js'
import { EmployeeModel } from '../models/EmployeeModel.js'
import { ROLES } from '../helpers/ROLES.js'

export async function getUsersList (req, res) {
	try	{
		const unnecessaryFields = {
			__v: 0,
			password: 0,
			refreshToken: 0
		}
		const usersList = await User.find(
			{},
			unnecessaryFields
		)
		res.status(200).json(
			usersList
		)
	} catch (e) {
		return res.status(404).json({
			message: 'Error while getting users list'
		})
	}
}

export async function updateUser (req, res) {
	try {
		let { _id, email, role, username } = req.body
		if (!email && !role && !username) {
			return res.status(404).json({
				message: 'Nothing to update'
			})
		}
		role = role.toLowerCase()
		const user = await User.findById(_id)
		if (!user) {
			return res.status(404).json({
				message: 'Cannot find user.'
			})
		}
		if (user.role !== ROLES.client && role === ROLES.client) {
			// remove from employees table if exist
			const employee = await EmployeeModel.findOne({
				clientId: user._id
			})
			await employee.delete()
		} else if (user.role !== role) {
			let employee = await EmployeeModel.findOne({ clientId: user._id })
			if (!employee) {
				const { salary, address, phone } = req.body
				if (!salary || !address || !phone) {
					return res.status(400).json({
						message: 'Employee info is missing.'
					})
				}
				employee = new EmployeeModel({
					clientId: user._id,
					salary,
					address,
					phone
				})
			}
			await employee.save()
		}

		user.username = username
		user.role = role
		await user.save()
		res.status(200).json({
			message: 'updated'
		})
	} catch (e) {
		return res.status(404).json({
			message: 'Error while updating user info. ' + e.message
		})
	}
}

export async function deleteUser (req, res) {
	try {
		const _id = req.query._id
		if (!_id) {
			return res.status(404).json({
				message: 'You must specify user id for deleting'
			})
		}
		const user = await User.findById(_id)
		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			})
		}
		if (user.role === ROLES.admin) {
			return res.status(400).json({
				message: 'You cannot remove the admin'
			})
		}
		await user.delete()
		res.status(200).json({
			message: 'Deleted'
		})
	} catch (e) {
		res.status(404).json({
			message: 'Error while deleting user'
		})
	}
}

export async function getMechanicsList (req, res) {
	try {
		const mechanicsList = await User.find({ role: ROLES.mechanic }).select({ username: 1 })
		res.status(200).json(mechanicsList)
	} catch (e) {
		res.status(500).json({
			message: 'Error while getting mechanics list. ' + e.message
		})
	}
}
