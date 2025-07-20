// Data Model classes
import { PlayerDataModel } from "./data-models/actor-data-models.mjs";

// Document classes
import { SinlessActor } from "./documents/actor.mjs";

// Sheet classes

// Helpers and utilities
import { SINLESS } from "./helpers/config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function() {

	// Add custom constants for configuration
	CONFIG.SINLESS = SINLESS

	// Assign document classes
	CONFIG.Actor.documentClass = SinlessActor

	// Assign data models
	Object.assign(Config.Actor.dataModels, {
		"player": PlayerDataModel
	});

	// Assign document sheets
});