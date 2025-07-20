// Data Model classes
import { PlayerDataModel } from "./data-models/actor-data-models.mjs";

// Document classes
import { SinlessActor } from "./documents/actor.mjs";

// Sheet classes

// Helpers and utilities

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function() {

	// Assign document classes
	CONFIG.Actor.documentClass = SinlessActor

	// Assign data models
	Object.assign(Config.Actor.dataModels, {
		"player": PlayerDataModel
	});

	// Assign document sheets
});