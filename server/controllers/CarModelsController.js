import { CarModel } from '../models/CarModel.js'

export async function getCarModelsList (req, res) {
	try {
		const { name = '' } = req.query
		const list = await CarModel.find({
			name: new RegExp('^' + name, 'i')
		}, {
			__v: 0
		})
		res.status(200).json(list)
	} catch (e) {
		res.status(400).json({
			message: 'Error while getting car models list. ' + e.message
		})
	}
}
