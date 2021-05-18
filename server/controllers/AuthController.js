import { User } from '../models/UserModel.js'
import { jwtRefreshSign, jwtSign, jwtVerify } from "../helpers/jwt.js"
import { hashPassword, validatePassword } from "../helpers/bcrypt.js"

export async function signup (req, res, next) {
	try {
		const { email, password } = req.body
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
			role: 'basic'
		})

		await newUser.save()
		res.sendStatus(201)
	} catch (e) {
		next(e)
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
			email: user.email
		})
		const refreshToken = jwtRefreshSign({
			userId: user._id,
			email: user.email
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
		return invalid()
	}
	const decoded = jwtVerify(refreshToken)
	if (!decoded) {
		return invalid()
	}
	const foundedUser = User.findById(decoded.userId)
	if (!foundedUser) {
		return invalid(404)
	}
	if (foundedUser.refreshToken !== refreshToken) {
		return invalid()
	}
	const accessToken = jwtSign({
		userId: foundedUser._id,
		email: foundedUser.email
	})

	res.status(200).json({
		refreshToken,
		accessToken
	})
}
