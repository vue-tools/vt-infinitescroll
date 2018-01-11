export const getScrollElement = (el, coordinate = 'y') => {
	coordinate = coordinate.toUpperCase()
	let parent = el.parentNode
	let attr = `overflow${coordinate}`
	let value
	while(parent.tagName !== 'HTML' && parent.tagName !== 'body' && parent.nodeType === 1) {
		value = getStyle(parent, attr)
		if(value === 'auto' || value === 'scroll') {
			return parent
		}
		parent = parent.parentNode
	}
	return window
}

export const getStyle = (el, attr) => {
	return window.getComputedStyle(el, null)[attr]
}

/**
 * 一段时间内"弹跳"一次
 * @param fn
 * @param delay
 */
export const debounce = (fn, delay = 500) => {
	let timer
	let context = this
	return function() {
		clearTimeout(timer)
		timer = setTimeout(fn.bind(context, arguments), delay)
	}
}