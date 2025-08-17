import { clamp, sinRound } from "../utils.mjs";
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
				ettiquettes: new SchemaField({
					aristocratic: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					civic: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					corporate: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					criminal: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					street: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					military: new SchemaField({
						max: new NumberField({ required: true, integer: true, min: 0, initial: 6 }),
						value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
					}),
					wasteland: new SchemaField({
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
				}),
				meta: new SchemaField({
					// Kept so that we don't get bad references calculating these values
				})
			}),
			zp: new SchemaField({
				exact: new NumberField({ required: true, integer: false, initial: 6}),
				base: new NumberField({ required: true, integer: true, initial: 6})
			}),
			bi: new NumberField({required: false, integer: true, min: 0, initial: 0}),
			kismet: new SchemaField({
				max: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
				value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
			}),
			ghost: new NumberField({required: false, integer: true, min: 0, initial: 7})
		}
	}
	
	/** @inheritDoc */
	prepareDerivedData() {
		// These must be done before calling super so that we correctly clamp condition tracks
		// Clamp attributes
		Object.values(this.attributes).forEach(stat => {stat.value = clamp(stat.value, 1, stat.max);});

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
		Object.values(this.pools).forEach(pool => {pool.value = clamp(pool.value, 0, pool.max);});

		// Calculate Armor
		this.armor.ballistic = this.armorDetail.internal.ballistic + this.armorDetail.under.ballistic + this.armorDetail.outer.ballistic;
		this.armor.impact = this.armorDetail.internal.impact + this.armorDetail.under.impact + this.armorDetail.outer.impact;

		// Clamp Skills
		Object.values(this.skills.brawn).forEach(skill => {skill.value = clamp(skill.value, 0, skill.max);});
		Object.values(this.skills.finesse).forEach(skill => {skill.value = clamp(skill.value, 0, skill.max);});
		Object.values(this.skills.focus).forEach(skill => {skill.value = clamp(skill.value, 0, skill.max);});
		Object.values(this.skills.resolve).forEach(skill => {skill.value = clamp(skill.value, 0, skill.max);});
		Object.values(this.skills.ettiquettes).forEach(skill => {skill.value = clamp(skill.value, 0, skill.max);});
		Object.values(this.skills.knowledge).forEach(skill => {skill.value = clamp(skill.value, 0, skill.max);});
		Object.values(this.skills.rituals).forEach(skill => {skill.value = clamp(skill.value, 0, skill.max);});

		// Calculate Grouped Skills
		this.skills.meta.melee = Math.max(
			this.skills.brawn.cyberneticCombat.value, 
			this.skills.brawn.martialArts.value,
			this.skills.brawn.meleeWeapons.value,
			this.skills.brawn.throwingWeapons.value,
			this.skills.brawn.unarmedCombat.value,
			2
		) - 2;
		this.skills.meta.ranged = Math.max(
			this.skills.finesse.energyWeapons.value,
			this.skills.finesse.firearms.value,
			this.skills.finesse.gunnery.value,
			this.skills.finesse.heavyWeapons.value,
			2
		) - 2;
		this.skills.meta.vehicles = Math.max(this.skills.focus.drive.value, this.skills.focus.fly.value, 2) - 2;
		this.skills.meta.computers = Math.max(
			this.skills.focus.hacking.value,
			this.skills.focus.ewar.value,
			this.skills.focus.safecracking.value,
			2
		) - 2;
		this.skills.meta.engineering = Math.max(
			this.skills.focus.engineeringAeronautics.value,
			this.skills.focus.engineeringArmory.value,
			this.skills.focus.engineeringElectronics.value,
			this.skills.focus.engineeringIndustrial.value,
			this.skills.focus.engineeringMechanical.value,
			this.skills.focus.engineeringNautical.value,
			2
		) - 2;

		// Calculating ZP
		if (this.zp.base <= 0) this.zp.base=0; //Making sure the field has an explicit 0 always
		// TODO: Modify exact based on gear and cyberware
		this.zp.exact = Math.floor(this.zp.exact * 100) / 100 // Ensures only 2 digit precision
		this.zp.exact = Math.min(this.zp.base, this.zp.exact);
		this.zp.value = Math.max(0, sinRound(this.zp.exact));

		// Clamp Kismet
		this.kismet.value = clamp(this.kismet.value, 0, this.kismet.max);
	}
}