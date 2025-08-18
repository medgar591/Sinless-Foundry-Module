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

	static TABS = {
		primary: {
			tabs: [
				{ id: "attributes", label: "SINLESS.System.Attributes.title"},
				{ id: "activeSkills", label: "SINLESS.System.ActiveSkills" },
				{ id: "secondarySkills", label: "SINLESS.System.SecondarySkills" },
				{ id: "notes", label: "SINLESS.System.Notes" }
			],
			initial: "attributes",
		}
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
			effects: baseData.document.effects,
			tabs: this._prepareTabs("primary"),
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

	async _onFirstRender(context, options) {
		await super._onFirstRender(context, options);
		super.changeTab(this.tabGroups["primary"], "primary", {force: true});
	}
}