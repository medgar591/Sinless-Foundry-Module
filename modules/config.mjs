export const SINLESS = {};

/**
 * The set of attributes used within the system
 * @type{object}
 */
SINLESS.attributes = {
	strength: 'SINLESS.Attribute.Strength',
	body: 'SINLESS.Attribute.Body',
	reaction: 'SINLESS.Attribute.Reaction',
	intelligence: 'SINLESS.Attribute.Intelligence',
	willpower: 'SINLESS.Attribute.Willpower',
	charisma: 'SINLESS.Attribute.Charisma',
};

SINLESS.pools = {
	brawn: 'SINLESS.Pool.Brawn',
	finesse: 'SINLESS.Pool.Finesse',
	focus: 'SINLESS.Pool.Focus',
	resolve: 'SINLESS.Pool.Resolve',
};

SINLESS.conditionTracks = {
	phys: 'SINLESS.condition.Phys',
	stun: 'SINLESS.condition.Stun',
}