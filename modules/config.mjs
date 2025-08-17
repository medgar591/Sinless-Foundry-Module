export const SINLESS = {};

/**
 * The set of attributes used within the system
 * @type{object}
 */
SINLESS.attributes = {
	strength: 'SINLESS.System.Attributes.Strength',
	body: 'SINLESS.System.Attributes.Body',
	reaction: 'SINLESS.System.Attributes.Reaction',
	intelligence: 'SINLESS.System.Attributes.Intelligence',
	willpower: 'SINLESS.System.Attributes.Willpower',
	charisma: 'SINLESS.System.Attributes.Charisma',
};

SINLESS.pools = {
	brawn: 'SINLESS.System.brawn',
	finesse: 'SINLESS.System.finesse',
	focus: 'SINLESS.System.focus',
	resolve: 'SINLESS.System.resolve',
};

SINLESS.conditionTracks = {
	phys: 'SINLESS.condition.Phys',
	stun: 'SINLESS.condition.Stun',
}