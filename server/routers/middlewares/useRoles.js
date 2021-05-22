import { getAccessLevelByRole } from '../../helpers/ROLES.js'

export function useRoles (req, res, next) {
	if (!req.user) {
		return res.status(400).json({
			message: 'Access denied'
		})
	}
	req.role = req.user.role
	next()
}

export function checkUserInRole (role) {
	const requiredAccess = getAccessLevelByRole(role)
	return (req, res, next) => {
		const userRole = req.role ?? req.user?.role
		const userAccessLevel = getAccessLevelByRole(userRole)
		if (role && requiredAccess >= userAccessLevel) {
			return next()
		}
		return res.status(400).json({
			message: 'Access denied'
		})
	}
}
