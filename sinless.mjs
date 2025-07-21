// Data Model classes
import { PlayerDataModel } from "./modules/models/actor-data-models.mjs";

// Document classes
import { SinlessActor } from "./modules/documents/sinless-actor.mjs";

// Sheet classes
import { SinlessActorSheet } from "./modules/sheets/actor-sheet.mjs";

// Helpers and utilities
import { SINLESS } from "./modules/config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */
Hooks.once('init', async () => {

	console.log("SINLESS | Initializing Sinless Core System");

	// Set up global Config object
	CONFIG.SINLESS = SINLESS;
	CONFIG.INIT = true;

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

	// Set up handlebars sheets
	preloadHandlebarsTemplates();
	registerHandlebarsHelpers();
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */
Hooks.once('ready', async () => {

	// Completed initialization, release lock
	CONFIG.INIT = false;

	// Only do more for GMs
	if(!game.user.isGM) return;
});

/* -------------------------------------------- */
/*  Private Functions                           */
/* -------------------------------------------- */
function preloadHandlebarsTemplates() {
	
	const templatePaths = [
		// "systems/sinless/templates/partials/template.hbs"
	];

	return loadTemplates(tempplatePaths);
}

function registerHandlebarsHelpers() {
	Handlebars.registerHelper("equals", function(v1, v2) {return (v1 === v2)});
	Handlebars.registerHelper("contains", function(element, search) {return (element.includes(search))});
	Handlebars.registerHelper("concat", function(s1, s2, s3 = "") {return (s1 + s2 + s3)});
	Handlebars.registerHelper("isGreater", function(p1, p2) {return (p1 > p2)});
	Handlebars.registerHelper("isGreaterOrEqual", function(p1, p2) {return (p1 >= p2)});
	Handlebars.registerHelper("ifOr", function(conditinal1, conditional2) {return (conditinal1 || conditional2)});
	Handlebars.registerHelper("logConsole", function(value) { console.log(value) });
	Handlebars.registerHelper("toBoolean", function(string) {return (string === "true")});
	Handlebars.registerHelper("for", function(from, to, incr, content) {
		let result = "";
		for (let i = from; i < to; i += incr)
			result += content.fn(i);
		return result;	
	});
	Handlebars.registerHelper("notEmpty", function(value) {
		// done to sometimes catch interpreting 0 as null
		if (value == 0 || value == "0") return true;
		if (value == null || value == "") return false;
		return true;
	});
	//Handlebars.registerHelper("", function(,) {return ()});
}
