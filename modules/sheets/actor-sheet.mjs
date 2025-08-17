const { api, sheets, ux } = foundry.applications;

/**
 * Extend the basic ActorSheet for players.
 * @extends {ActorSheetV2}
 */
export class CharacterSheet extends api.HandlebarsApplicationMixin(sheets.ActorSheetV2) {
	
	sheetContext= {};

	/** @override */
	static DEFAULT_OPTIONS = {
		tag: "form",
		classes: ["sinless", "sheet", "playerSheet"],
		actions: {

		},
		form: {
			submitOnChange: true,
			closeOnSubmit: false
		},
		position: {
			width: 800
		}
	};

	static PARTS = {
		header: { template: "systems/sinless/templates/sheets/header.hbs" },
		body: { template: "systems/sinless/templates/sheets/body.hbs" }
	};

	get title() {
		return this.actor.name;
	};

	/** @override */
	async _prepareContext(options) {

		const baseData = await super._prepareContext();

		const context = {
			// Setting general values
			isOwner: baseData.document.isOwner,
      		isEditable: baseData.editable,
			actor: baseData.document,
			system: baseData.document.system,
			items: baseData.document.items,
			config: CONFIG.SINLESS,
			isGM: baseData.user.isGM,
			effects: baseData.document.effects
		}

		context.enrichedNotes = await ux.TextEditor.enrichHTML(
			this.actor.system.notes,
			{
				secrets: this.document.isOwner,
				relativeTo: this.actor,
			}
			
		);

		context.poolChoice = CONFIG.SINLESS.pools;

		this.sheetContext = context;
		
		return context;
	}

	/** @override */
	_onRender(context, options) {
		const tabs = new ux.Tabs({navSelector: ".tabs", contentSelector: ".content", initial: "tab1"});
		tabs.bind(this.element);
	}
}