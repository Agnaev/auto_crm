import { jwtVerify } from '../../helpers/jwt.js'

export async function useAuth (req, res, next) {
	const accessToken = req.headers.authorization?.split(' ')?.[1]
	if (!accessToken) {
		return invalid()
	}
	try {
		req.user = await jwtVerify(accessToken)
		if (!req.user) {
			return invalid()
		}
		next()
	} catch (e) {
		invalid()
	}
	function invalid () {
		res.status(401).json({
			message: 'Invalid or expired token'
		})
	}
}
