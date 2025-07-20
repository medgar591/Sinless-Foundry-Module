const { api, sheets } = foundry.applications;

/**
 * Extend the basic ActorSheet for players.
 * @extends {ActorSheetV2}
 */
export class SinlessActorSheet extends api.HandlebarsApplicationMixin(sheets.ActorSheetV2) {
	
	/* -------------------------------------------------- */
	
	/** @override */
	static DEFAULT_OPTIONS = {
		classes: ["sinless", "actor", "player"],
		position: {
			width: 600,
			height: 600,
		},
		actions: {
			viewDoc: this._viewDoc,
     			createDoc: this._createDoc,
      		deleteDoc: this._deleteDoc,
		},
		form: {
			submitOnChange: true,
		},
	};

	static PARTS = {
		header: {
			template: "systems/sinless/templates/actor/header.hbs",
		},
		tabs: {
      		// Foundry-provided generic template
      		template: 'templates/generic/tab-navigation.hbs',
    		},
    		gear: {
    		  	template: 'systems/sinless/templates/actor/gear.hbs',
    		},
	};

	/* -------------------------------------------------- */

	/** @override */
	async _prepareContext(options) {
		// Output Initialization
		const context = {
			// Validates both permissions and compendium status
      		editable: this.isEditable,
      		owner: this.document.isOwner,
      		limited: this.document.limited,
      		// Add the actor document.
      		actor: this.actor,
      		// Add the actor's data to context.data for easier access, as well as flags.
      		system: this.actor.system,
      		flags: this.actor.flags,
      		// Adding a pointer to CONFIG.SINLESS
      		config: CONFIG.SINLESS,
      		tabs: this._getTabs(options.parts),
		}

		//Offload context prep for items to a helper function
		this._prepareItems(context);
		
		return context;
	}

	/** @override */
	async _preparePartContext(partId, context) {
		switch(partId) {
			case "gear":
				context.tab = context.tabs[partId];
				break;
		}
		return context;
	}

	_prepareItems(context) {
		const gear = [];

		// When we get subtypes this can be more involved
		for (let i of this.document.items) {
			gear.push(i);
		}

		// Assign the sorted items
		context.gear = gear.sort((a,b) => (a.sort() || 0) - (b.sort() || 0));
	}

	/* -------------------------------------------- */
	/*  Actions                                     */
	/* -------------------------------------------- */

	/**
	* Renders an embedded document's sheet
	*
	* @this SinlessActorSheet
	* @param {PointerEvent} event   The originating click event
	* @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
	* @protected
	*/
	static async _viewDoc(event, target) {
		const doc = this._getEmbeddedDocument(target);
		doc.sheet.render(true);
	}

	/**
	* Handles item deletion
	*
	* @this BoilerplateActorSheet
	* @param {PointerEvent} event   The originating click event
	* @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
	* @protected
	*/
	static async _deleteDoc(event, target) {
		const doc = this._getEmbeddedDocument(target);
		doc.delete();
	}

	/**
	* Handle creating a new Owned Item or ActiveEffect for the actor using initial data defined in the HTML dataset
	*
	* @this BoilerplateActorSheet
	* @param {PointerEvent} event   The originating click event
	* @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
	* @private
	*/
	static async _createDoc(event, target) {
		// Retrieve the configured document class for Item or ActiveEffect
		const docCls = getDocumentClass(target.dataset.documentClass);
		// Prepare the document creation data by initializing it a default name.
		const docData = {
			name: docCls.defaultName({
			// defaultName handles an undefined type gracefully
			type: target.dataset.type,
			parent: this.actor,
			}),
		};
		// Loop through the dataset and add it to our docData
		for (const [dataKey, value] of Object.entries(target.dataset)) {
			// These data attributes are reserved for the action handling
			if (['action', 'documentClass'].includes(dataKey)) continue;
			foundry.utils.setProperty(docData, dataKey, value);
		}

		// Finally, create the embedded document!
		await docCls.create(docData, { parent: this.actor });
	}

	/* -------------------------------------------- */
	/*  Helper Functions                            */
	/* -------------------------------------------- */

	/**
	* Fetches the embedded document representing the containing HTML element
	*
	* @param {HTMLElement} target      The element subject to search
	* @returns {Item|ActiveEffect}     The embedded Item or ActiveEffect
	*/
	_getEmbeddedDocument(target) {
		const docRow = target.closest("li[data-document-class]");
		if (docRow.dataset.documentClass === "Item") {
			return this.actor.items.get(docRow.dataset.itemId);
		} else if (docRow.dataset.documentClass === "ActiveEffect") {
			const parent = docRow.dataset.parentId === this.actor.id ?
				this.actor :
				this.actor.items.get(docRow?.dataset.parentId);
			return parent.effects.get(docRow.dataset.effectId);
		} else {
			console.warn("Could not find document class");
		}
	}

	/**
	* Submit a document update based on the processed form data.
	* @param {SubmitEvent} event                   The originating form submission event
	* @param {HTMLFormElement} form                The form element that was submitted
	* @param {object} submitData                   Processed and validated form data to be used for a document update
	* @returns {Promise<void>}
	* @protected
	* @override
	*/
	async _processSubmitData(event, form, submitData) {
		const overrides = foundry.utils.flattenObject(this.actor.overrides);
		for (const k of Object.keys(overrides)) delete submitData[k];
		this.document.update(submitData);
	}

}