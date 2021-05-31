/**
 * Index array of objects by id field (default _id)
 * @param { Array } list
 * @param { String } id
 * @returns { Object | null } indexed array by field
 */
export function indexer (list, id = '_id') {
	if (!Array.isArray(list)) {
		if (process.env.NODE_ENV !== 'production') {
			throw new TypeError('list must be an array.')
		}
		return null
	}
	return list.reduce((acc, item) =>
		Object.assign(acc, {
			[item[id]]: item
		}),
		{}
	)
}