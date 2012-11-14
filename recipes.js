
var Recipe = function(name) {
	
// NAME

	this.name = name;
	this.getName = function() {
		return this.name;};
	
// INGREDIENTS
	
	this.ingredients = [];
	
	this.addIngredient = function(ing) {
		this.ingredients.push(ing);};
		
	this.getIngredients = function() {
		var string = "For " + name + " we need " + this.ingredients[0];
		for (i=1; i<this.ingredients.length; i++) {
			if (i===this.ingredients.length-1) {
			string += " and " + this.ingredients[i] + ".";
			} else {
			string += ", " + this.ingredients[i];}}
		return string;};
	
//INSTRUCTIONS
	
	this.instructions = [];
	this.durations = [];
	this.preptime = 0;
	
	this.addStep = function(instruction, duration) {
		this.instructions.push(instruction);
		this.durations.push(duration);
		this.preptime += duration;};
	
	this.steps = [];	
		
	var Step = function(instruction, duration, start) {
		this.instruction = instruction;
		this.starttime = start;
		this.endtime = start-duration;};	
	
	this.makeTimeline = function() {
		this.steps[0] = new Step(this.instructions[0], this.durations[0], this.preptime);
		for (i=1; i<this.instructions.length; i++) {
			this.steps[i]= new Step(this.instructions[i], this.durations[i], this.steps[(i-1)].endtime);}
	};
	
	this.getToDo = function() {
		var string = "First, about "+this.steps[0].starttime+" minutes before serving, "+this.steps[0].instruction+".";
		for(i=1; i<this.steps.length; i++) {
			string += " Then, about "+this.steps[i].starttime+" minutes before serving, "+this.steps[i].instruction+".";}
		return string;};
};

var addpopcorn = function() {	
	var popcorn = new Recipe("Popcorn");
	popcorn.addIngredient("corn");
	popcorn.addIngredient("salt");
	popcorn.addIngredient("butter");
	popcorn.addStep("put corn in a bowl", 1);
	popcorn.addStep("add a bunch of salt", 1);
	popcorn.addStep("put it in the microwave and watch it pop", 5);
	popcorn.addStep("cover it in butter", 2);
	popcorn.makeTimeline();	};

function fillIngredients() {
	addpopcorn();
	document.getElementById("ingredients").innerHTML = "hello " + popcorn.getIngredients;
}
