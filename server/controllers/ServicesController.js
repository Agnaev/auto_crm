import { Service } from '../models/Services.js'

export async function getServicesList (req, res) {
	try {
		const unnecessaryFields = {
			__v: 0,
		}
		const response = await Service.find({}, unnecessaryFields)
		res.status(200).json(response)
	} catch (e) {
		res.status(404).json({
			message: 'Error while getting services list.',
			error: e.message
		})
	}
}

export async function createService (req, res) {
	try {
		const { name, description, price } = req.body
		if (!name || !description || !price) {
			return res.status(400).json({
				message: 'Invalid data'
			})
		}
		const service = new Service({
			name,
			description,
			price
		})
		await service.save()
		res.sendStatus(201)
	} catch (e) {
		res.status(404).json({
			message: 'Error while creating service',
			error: e.message
		})
	}
}

export async function deleteService (req, res) {
	try {
		const { _id } = req.query
		if (!_id) {
			return res.status(400).json({
				message: 'Specify id of deleting service'
			})
		}
		const service = await Service.findById(_id)
		if (!service) {
			return res.status(400).json({
				message: 'Could not find service by id'
			})
		}
		await service.delete()
		res.status(200).json({
			message: 'Deleted'
		})
	} catch (e) {
		res.status(400).json({
			message: 'Error while deleting service',
			error: e.message
		})
	}
}

export async function updateService (req, res) {
	try {
		const { _id, name, description, price } = req.body
		if (!_id || !name || !description || !price) {
			return res.status(400).json({
				message: 'Nothing to update'
			})
		}
		const service = await Service.findById(_id, { __v: 0 })
		service.name = name
		service.description = description
		service.price = price
		await service.save()
		res.status(200).json(service)
	} catch (e) {
		res.status(400).json({
			message: 'Error while updating service',
			error: e.message
		})
	}
}
