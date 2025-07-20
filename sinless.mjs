// Data Model classes
import { PlayerDataModel } from "./data-models/actor-data-models.mjs";

// Document classes

// Sheet classes

// Helpers and utilities

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function() {

	// Assign document classes

	// Assign data models
	CONFIG.Actor.dataModels.player = PlayerDataModel;

	// Assign document sheets
});