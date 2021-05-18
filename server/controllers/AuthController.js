import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { User } from '../models/UserModel.js'

function hashPassword (password) {
	return bcrypt.hash(password, 10)
}

function validatePassword (plainPassword, hashedPassword) {
	return bcrypt.compare(plainPassword, hashedPassword)
}

function jwtSign (payload, config = {}) {
	return jwt.sign(
		payload,
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
			...config
		}
	)
}

function jwtVerify (token) {
	try {
		return jwt.verify(
			token,
			process.env.JWT_SECRET,
			{
				algorithm: 'HS256'
			})
	} catch (e) {
		return e.message
	}
}

export async function signup (req, res, next) {
	try {
		const { email, password } = req.body
		const hashedPassword = await hashPassword(password)
		const newUser = new User({
			email,
			password: hashedPassword,
			role: 'basic'
		})

		await newUser.save()
		res.json({
			user: {
				role: newUser.role,
				userId: newUser._id,
				email: newUser.email
			}
		})
	} catch (e) {
		next(e)
	}
}

export async function login (req, res) {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		console.log('email', email)
		if (!user?.email) {
			return res.status(401).json({
				message: 'Email or password incorrect'
			})
		}
		const validPassword = await validatePassword(password, user.password)
		if (!validPassword) {
			return res.status(401).json({
				message: 'Email or password is incorrect'
			})
		}
		const accessToken = jwtSign({
			userId: user._id,
			email: user.email
		})
		const refreshToken = jwtSign({
			userId: user._id,
			email: user.email
		}, {
			expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME
		})

		await User.findByIdAndUpdate(user._id, { refreshToken })
		res.status(200).json({
			data: {
				email: user.email,
				role: user.role
			},
			accessToken,
			refreshToken
		})
	} catch (e) {
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
