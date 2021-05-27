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
		const { _id, email, role, username, salary } = req.body
		if (!email && !role && !username) {
			return res.status(404).json({
				message: 'Nothing to update'
			})
		}
		const user = await User.findById(_id)
		if (!user) {
			return res.status(404).json({
				message: 'Cannot find user.'
			})
		}

		if (user.role !== 'client' && role === 'client') {
			// remove from employees table if exist
			const employee = await EmployeeModel.find({
				clientId: user._id
			})
			await employee.delete()
			await employee.save()
		} else {
			// add to employees table with role
			const employee = new EmployeeModel({
				clientId: user._id,
				salary: salary || 0
			})
			await employee.save()
		}

		user.username = username
		user.role = role
		await User.findById(_id, (err, doc) => {
			if (err) {
				return res.status(404).json({
					message: 'Cannot find user. ' + err.message
				})
			}
			doc.username = username
			doc.role = role.toLowerCase()
			doc.save()
		})
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
