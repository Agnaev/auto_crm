import jwt from 'jsonwebtoken'

export async function useAuth (req, res, next) {
	const accessToken = req.headers.authorization?.split(' ')?.[1]
	if (!accessToken) {
		return invalid()
	}
	try {
		req.user = await jwt.verify(accessToken, process.env.JWT_SECRET, {
			algorithm: 'HS256'
		})
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
