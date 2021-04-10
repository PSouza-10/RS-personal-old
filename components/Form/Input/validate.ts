import { ValidationProp } from './index'

export interface IValid {
	isValid?: boolean
	stringHas?: {
		[x: string]: boolean
	}
}

const regEx: { [x: string]: string } = {
	symbols: '.*[@#$%^&-+=()]',
	nospace: '\\S+$',
	upper: '.*[A-Z]',
	lower: '.*[a-z]',
	digits: '.*[0-9]',
	// email: '.+@+.+\\.+.'
	email: '.+@+.+\\.+.',
}

const evaluateWithRegEx = (val: string | number, params: string) => {
	const validation: {
		isValid: boolean
		stringHas: {
			[x: string]: any
		}
	} = {
		isValid: true,
		stringHas: {},
	}
	const paramsArr = params.split(',')
	if (typeof val === 'number') val = val.toString()
	for (const term in regEx) {
		if (paramsArr.includes(term)) {
			const isValid = new RegExp(`(?=${regEx[term as string]})`).test(val)

			if (!isValid) validation.isValid = false
			validation.stringHas[`${term}`] = isValid
		}
	}

	return validation
}

export default function handleValidate(
	value: string | number,
	{ validIf = '', min = 0, max = 0 }: ValidationProp,
	current: IValid
): IValid {
	const type = typeof value
	if (typeof value === 'string') {
		let containsSpecified: IValid = {}
		if (validIf) {
			containsSpecified = evaluateWithRegEx(value, validIf)
		}
		const lenMatch = value.length >= min && value.length <= max
		const validation = {
			isValid:
				containsSpecified.isValid && (lenMatch || min === 0 || max === 0),
			stringHas: {
				...containsSpecified.stringHas,
			},
		}
		if (min !== 0) {
			validation.stringHas.min = value.length >= min
		}
		if (max !== 0) {
			validation.stringHas.max = value.length <= max
		}
		return validation
	} else if (type === 'number') {
		return {
			isValid: value >= min && value <= max,
		}
	}

	return current
}
