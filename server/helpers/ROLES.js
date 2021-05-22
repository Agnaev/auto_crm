export const ROLES = freezeClean({
	client: 'client',
	mechanic: 'mechanic',
	manager: 'manager',
	admin: 'admin'
})

export const ACCESS_LEVELS = freezeClean({
	client: 16,
	mechanic: 8,
	manager: 4,
	admin: 2
})

function freezeClean (object) {
	if (typeof object !== 'object' || object === null) {
		throw new TypeError('Passed argument must be an object.')
	}
	return Object.freeze(
		Object.assign(
			Object.create(null),
			object
		)
	)
}

export function getAccessLevelByRole (role) {
	if (role in ACCESS_LEVELS) {
		return ACCESS_LEVELS[role]
	}
	return 32
}
