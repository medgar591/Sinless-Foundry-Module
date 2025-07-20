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
			})
		}
	}
}