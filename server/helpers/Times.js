export const start = '09:00'
export const end = '21:00'

export function generateTimes (start = start, end = end) {
	const result = []
	let [ah, am] = start.split(':').map(x => +x)
	const [bh, bm] = end.split(':').map(x => +x)
	result.push(start)
	while (ah < bh) {
		am += 15
		if (am >= 60) {
			ah += 1
			am = 0
		}
		result.push(ah.toString().padStart(2, 0) + ':' + am.toString().padStart(2, 0))
	}
	return result
}


export class Time extends Date {
	constructor(time) {
		super('2021-1-1 ' + time + ':00')
	}
	getTime () {
		const pad = val => val.toString().padStart(2, '0')
		return pad(this.getHours()) + ':' + pad(this.getMinutes())
	}
	static checkInTime(range, time) {
		const [a, b] = range.map(x => new Time(x))
		const [_a, _b] = time.map(x => new Time(x))
		return a >= _a && a < _b || b > _a && b <= _b
	}
	static addHours (time, hours) {
		const _time = time.split(':').map(x => +x)
		_time[0] += +hours
		if (_time[0] > 24) {
			_time[0] -= 24
		}
		return _time.map(x => x.toString().padStart(2, '0')).join(':')
	}
}

function createTime(time) {
	return new Date('2021-1-1 ' + time + ':00')
}

function compareHours (needHours, [h1, h2]) {
	h1 = +h1.split(':')[0]
	h2 = +h2.split(':')[0]
	return h2 - h1 > needHours
}

export function checkHours (times, hours) {
	let begin = times[0]
	let end = times[1]
	const ranges = []
	for (let i = 1; i < times.length; ++i) {
		const prev = createTime(times[i - 1])
		const time = createTime(times[i])
		if (time - prev > 900_000) {
			ranges.push([begin, times[i - 1]])
			begin = times[i]
		}
		end = times[i]
	}
	ranges.push([begin, end])
	return ranges.some(compareHours.bind(null, hours))
}
