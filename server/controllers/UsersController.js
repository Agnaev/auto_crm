import { User } from '../models/UserModel.js'

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

export function updateUser (req, res) {
	try {
		const { _id, email, role, username } = req.body
		if (!email && !role && !username) {
			return res.status(404).json({
				message: 'Nothing to update'
			})
		}
		User.findById(_id, (err, doc) => {
			if (err) {
				return res.status(404).json({
					message: 'Cannot find user. ' + err.message
				})
			}
			doc.username = username
			doc.role = role
			doc.save()
		})
	} catch (e) {
		return res.status(404).json({
			message: 'Error while updating user info'
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
