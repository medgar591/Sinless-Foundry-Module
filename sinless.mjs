// Data Model classes
import { PlayerDataModel } from "./modules/models/actor-data-models.mjs";

// Document classes
import { SinlessActor } from "./modules/documents/actor-documents.mjs";

// Sheet classes
import { SinlessActorSheet } from "./modules/sheets/actor-sheet.mjs";

// Helpers and utilities
import { SINLESS } from "./modules/config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function() {
	// Adding utility classes to global context
	game.sinless = {
		SinlessActor,
	};

	// Add custom constants for configuration
	CONFIG.SINLESS = SINLESS

	// Assign document classes
	CONFIG.Actor.documentClass = SinlessActor

	// Assign data models
	Object.assign(Config.Actor.dataModels, {
		"player": PlayerDataModel
	});

	// Assign document sheets
	Actors.registerSheet('sinless', SinlessActorSheet, {
		makeDefault: true,
		label: 'SINLESS.SheetLabels.Actor',
	});
});