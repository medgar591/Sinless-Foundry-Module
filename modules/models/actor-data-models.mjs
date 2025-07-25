import { clamp } from "../utils.mjs";
const { NumberField, SchemaField } = foundry.data.fields;

class ActorDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			condition: new SchemaField({
				phys: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
					value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
				}),
				stun: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
					value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
				}) 
			})
		}
	}

	/** @inheritDoc */
	prepareDerivedData() {
		super.prepareDerivedData();

		// Clamp condition tracks
		this.condition.phys.value = clamp(this.condition.phys.value, 0, this.condition.phys.max);
		this.condition.stun.value = clamp(this.condition.stun.value, 0, this.condition.stun.max);
	}
}

export class PlayerDataModel extends ActorDataModel {
	static defineSchema() {
		return {
			...super.defineSchema(),
			attributes: new SchemaField({
				strength: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 20 }),
					value: new NumberField({ required: true, integer: true, min: 1, initial: 3 })
				}),
				body: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 20 }),
					value: new NumberField({ required: true, integer: true, min: 1, initial: 3 })
				}),
				reaction: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 20 }),
					value: new NumberField({ required: true, integer: true, min: 1, initial: 3 })
				}),
				intelligence: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 20 }),
					value: new NumberField({ required: true, integer: true, min: 1, initial: 3 })
				}),
				willpower: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 20 }),
					value: new NumberField({ required: true, integer: true, min: 1, initial: 3 })
				}),
				charisma: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 20 }),
					value: new NumberField({ required: true, integer: true, min: 1, initial: 3 })
				})
			}),
			pools: new SchemaField({
				brawn: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 5 }),
					value: new NumberField({ required: true, integer: true, min: 0, initial: 5 })
				}),
				finesse: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 5 }),
					value: new NumberField({ required: true, integer: true, min: 0, initial: 5 })
				}),
				focus: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 5 }),
					value: new NumberField({ required: true, integer: true, min: 0, initial: 5 })
				}),
				resolve: new SchemaField({
					max: new NumberField({ required: true, integer: true, min: 1, initial: 5 }),
					value: new NumberField({ required: true, integer: true, min: 0, initial: 5 })
				})
			})
		}
	}
	
	/** @inheritDoc */
	prepareDerivedData() {
		super.prepareDerivedData();

		// Clamp attributes
		this.attributes.strength.value = clamp(this.attributes.strength.value, 1, this.attributes.strength.max);
		this.attributes.body.value = clamp(this.attributes.body.value, 1, this.attributes.body.max);
		this.attributes.reaction.value = clamp(this.attributes.reaction.value, 1, this.attributes.reaction.max);
		this.attributes.intelligence.value = clamp(this.attributes.intelligence.value, 1, this.attributes.intelligence.max);
		this.attributes.willpower.value = clamp(this.attributes.willpower.value, 1, this.attributes.willpower.max);
		this.attributes.charisma.value = clamp(this.attributes.charisma.value, 1, this.attributes.charisma.max);

		// Calculate Pool Max
		// TODO

		// Clamp Pools
		this.pools.brawn.value = clamp(this.pools.brawn.value, 0, this.pools.brawn.max);
		this.pools.finesse.value = clamp(this.pools.finesse.value, 0, this.pools.finesse.max);
		this.pools.focus.value = clamp(this.pools.focus.value, 0, this.pools.focus.max);
		this.pools.resolve.value = clamp(this.pools.resolve.value, 0, this.pools.resolve.max);
	}
}