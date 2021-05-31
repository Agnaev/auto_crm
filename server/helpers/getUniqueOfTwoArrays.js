export function getUniqueOfTwoArrays (a, b) {
	return a.filter(x => !b.includes(x))
}
