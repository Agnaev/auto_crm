export const ROLES = Object.freeze(
	Object.assign(
		Object.create(null),
		{
			client: 'client',
			mechanic: 'mechanic',
			employee: 'employee',
			admin: 'admin'
		}
	)
)

export const ACCESS_LEVELS = Object.freeze(
	Object.assign(
		Object.create(null),
		{
			client: 16,
			mechanic: 8,
			employee: 4,
			admin: 2
		}
	)
)

export function getAccessLevel (role) {
	if (role in ACCESS_LEVELS) {
		return ACCESS_LEVELS[role]
	}
	return 32
}
