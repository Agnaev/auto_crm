import { User } from '../models/UserModel.js'
import {
	jwtRefreshSign,
	jwtSign,
	jwtRefreshVerify
} from "../helpers/jwt.js"
import {
	hashPassword,
	validatePassword
} from "../helpers/bcrypt.js"

export async function signup (req, res) {
	try {
		const { email, password, username } = req.body
		const foundedUser = await User.findOne({ email })
		if (foundedUser) {
			return res.status(400).json({
				message: `A user with the email ${email} already exists`
			})
		}
		const hashedPassword = await hashPassword(password)
		const newUser = new User({
			email,
			password: hashedPassword,
			role: 'client',
			username
		})

		await newUser.save()
		res.sendStatus(201)
	} catch (e) {
		res.status(400).json({
			message: 'Something went wrong.' + e.message
		})
	}
}

export async function login (req, res) {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user?.email) {
			return invalid()
		}
		const validPassword = await validatePassword(password, user.password)
		if (!validPassword) {
			return invalid()
		}
		const accessToken = jwtSign({
			userId: user._id,
			email: user.email,
			role: user.role
		})
		const refreshToken = await jwtRefreshSign({
			userId: user._id
		})

		await User.findByIdAndUpdate(user._id, { refreshToken })
		res.status(200).json({
			user: {
				email: user.email,
				role: user.role
			},
			accessToken,
			refreshToken
		})
	} catch (e) {
		invalid()
	}

	function invalid () {
		res.status(401).json({
			message: 'Email or password is incorrect'
		})
	}
}

export async function refresh (req, res) {
	function invalid (status = 401) {
		res.status(status).json({
			message: 'refresh token is expired or invalid'
		})
	}

	const refreshToken = req.body.refresh
	if (!refreshToken) {
		return invalid(401)
	}
	try {
		const decoded = await jwtRefreshVerify(refreshToken)
		if (!decoded) {
			return invalid(402)
		}
		const foundedUser = await User.findById(decoded.userId)
		if (!foundedUser) {
			return invalid(404)
		}
		if (foundedUser.refreshToken !== refreshToken) {
			return invalid(403)
		}
		const accessToken = jwtSign({
			userId: foundedUser._id,
			email: foundedUser.email,
			role: foundedUser.role
		})

		res.status(200).json({
			refreshToken,
			accessToken
		})
	} catch (e) {
		invalid(405)
	}
}

export async function logout (req, res) {
	try {
		const { userId } = req.user
		if (!userId) {
			return res.status(400).json({
				message: 'Could not find user.'
			})
		}
		const user = await User.findById(userId)
		if (!user) {
			return res.status(400).json({
				message: 'User not found'
			})
		}
		user.refreshToken = ''
		await user.save()
		res.sendStatus(200)
	} catch (e) {
		res.status(400).json({
			message: 'Error while logging out. ' + e.message
		})
	}
}
