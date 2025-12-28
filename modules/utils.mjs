export function clamp(value, min, max) {
	return Math.min(Math.max(value,min),max);
}

export function sinRound(value) {
	if (value >= 1) return Math.floor(value);
	if (value > 0) return 1;
	return Math.floor(value);
}