import { clamp } from "../utils.mjs";
const { NumberField, SchemaField, StringField } = foundry.data.fields;

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
			}),
			movement: new StringField({ required: false, blank: true}),
			armor: new SchemaField({
				ballistic: new NumberField({ required: false, integer: true, min: 0, initial: 0}),
				impact: new NumberField({ required: false, integer: true, min: 0, initial: 0})
			})
		}
	}

	/** @inheritDoc */
	prepareDerivedData() {
		super.prepareDerivedData();

		// Clamp condition tracks
		this.condition.phys.value = clamp(this.condition.phys.value, 0, this.condition.phys.max);
		this.condition.stun.value = clamp(this.condition.stun.value, 0, this.condition.stun.max);
		this.condition.penalty = -1 * (Math.floor(this.condition.phys.value / 3) + Math.floor(this.condition.stun.value / 3))
	}
}

export class PlayerDataModel extends ActorDataModel {
	static defineSchema() {
		return {
			...super.defineSchema(),
			fullName: new StringField({ required: false, blank: true}),
			heritage: new StringField({ required: false, blank: true}),
			damageOverflow: new NumberField({ required: false, integer: true, min: 0}),
			armorDetail: new SchemaField({
				internal: new SchemaField({
					ballistic: new NumberField({ required: false, integer: true, min: 0, initial: 0}),
					impact: new NumberField({ required: false, integer: true, min: 0, initial: 0})
				}),
				under: new SchemaField({
					ballistic: new NumberField({ required: false, integer: true, min: 0, initial: 0}),
					impact: new NumberField({ required: false, integer: true, min: 0, initial: 0})
				}),
				outer: new SchemaField({
					ballistic: new NumberField({ required: false, integer: true, min: 0, initial: 0}),
					impact: new NumberField({ required: false, integer: true, min: 0, initial: 0})
				})
			}),
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
			}),
			skills: new SchemaField({
				brawn: new SchemaField({
					athletics: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					cyberneticCombat: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					martialArts: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
						name: new StringField({ required: true, blank: true})
					}),
					meleeWeapons: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					throwingWeapons: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					unarmedCombat: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					})
				}),
				finesse: new SchemaField({
					archery: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					articulatedManeuvers: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					energyWeapons: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					firearms: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					gunnery: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					heavyWeapons: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					})
				}),
				focus: new SchemaField({
					artificing: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					biotech: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					hacking: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					drive: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					ewar: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					engineeringAeronautics: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					engineeringArmory: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					engineeringElectronics: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					engineeringIndustrial: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					engineeringMechanical: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					engineeringNautical: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					fly: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					negotiation: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					observation: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					reconnaissance: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					safecracking: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					shadow: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					})
				}),
				resolve: new SchemaField({
					astralSenses: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					channeling: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					coercion: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					conjuring: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					fascination: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					leadership: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					sorcery: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					subterfuge: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					survival: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					})
				}),
				knowledge: new SchemaField({
					knowledge1: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
						name: new StringField({ required: true, blank: true})
					}),
					knowledge2: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
						name: new StringField({ required: true, blank: true})
					}),
					knowledge3: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
						name: new StringField({ required: true, blank: true})
					}),
					knowledge4: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
						name: new StringField({ required: true, blank: true})
					})
				}),
				rituals: new SchemaField({
					ritual1: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
						name: new StringField({ required: true, blank: true})
					}),
					ritual2: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
						name: new StringField({ required: true, blank: true})
					}),
					ritual3: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
						name: new StringField({ required: true, blank: true})
					}),
					ritual4: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
						name: new StringField({ required: true, blank: true})
					}),
				})
			}),
			zp: new SchemaField({
				exact: new NumberField({ required: true, integer: false, initial: 6}),
				base: new NumberField({ required: true, integer: true, initial: 6})
			}),
		}
	}
	
	/** @inheritDoc */
	prepareDerivedData() {
		// These must be done before calling super so that we correctly clamp condition tracks
		// Clamp attributes
		this.attributes.strength.value = clamp(this.attributes.strength.value, 1, this.attributes.strength.max);
		this.attributes.body.value = clamp(this.attributes.body.value, 1, this.attributes.body.max);
		this.attributes.reaction.value = clamp(this.attributes.reaction.value, 1, this.attributes.reaction.max);
		this.attributes.intelligence.value = clamp(this.attributes.intelligence.value, 1, this.attributes.intelligence.max);
		this.attributes.willpower.value = clamp(this.attributes.willpower.value, 1, this.attributes.willpower.max);
		this.attributes.charisma.value = clamp(this.attributes.charisma.value, 1, this.attributes.charisma.max);

		// Calculate Track Max
		this.condition.phys.max = 6 + Math.floor(this.attributes.body.value / 2);
		this.condition.stun.max = 6 + Math.floor(this.attributes.willpower.value / 2);

		super.prepareDerivedData();

		// Calculate Pool Max
		this.pools.brawn.max = Math.floor(this.attributes.strength.value + (this.attributes.body.value / 2) + (this.attributes.willpower.value / 4));
		this.pools.finesse.max = Math.floor(this.attributes.reaction.value + (this.attributes.body.value / 2) + (this.attributes.intelligence.value / 4));
		this.pools.focus.max = Math.floor(this.attributes.intelligence.value + (this.attributes.reaction.value / 2) + (this.attributes.willpower.value / 4));
		this.pools.resolve.max = Math.floor(this.attributes.willpower.value + (this.attributes.charisma.value / 2) + (this.attributes.intelligence.value / 2));
		// TODO: Charisma bonus

		// Clamp Pools
		this.pools.brawn.value = clamp(this.pools.brawn.value, 0, this.pools.brawn.max);
		this.pools.finesse.value = clamp(this.pools.finesse.value, 0, this.pools.finesse.max);
		this.pools.focus.value = clamp(this.pools.focus.value, 0, this.pools.focus.max);
		this.pools.resolve.value = clamp(this.pools.resolve.value, 0, this.pools.resolve.max);

		// Calculate Armor
		this.armor.ballistic = this.armorDetail.internal.ballistic + this.armorDetail.under.ballistic + this.armorDetail.outer.ballistic;
		this.armor.impact = this.armorDetail.internal.impact + this.armorDetail.under.impact + this.armorDetail.outer.impact;

		// Clamp Skills
		// TODO

		// Calculate Grouped Skills
		// TODO
	}
}