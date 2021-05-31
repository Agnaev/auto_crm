import { hashPassword } from './bcrypt.js'
import { ROLES } from './ROLES.js'
import { User } from '../models/UserModel.js'
import { EmployeeModel } from '../models/EmployeeModel.js'

export const createAdminIfNotExist = async () => {
	const usersCount = await User.countDocuments({})
	if (usersCount === 0) {
		console.log('[Creating admin user...]')
		const admin = new User({
			email: 'admin@mail.ru',
			password: await hashPassword('admin'),
			username: 'admin',
			role: ROLES.admin,
		})
		await admin.save()
		await new EmployeeModel({
			clientId: admin._id,
			salary: 0
		}).save()
	}
}
