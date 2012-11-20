

var capitalize = function(word) {
	var firstLetter = word.substring(0,1).toUpperCase();
	var rest = word.substring(1,word.length).toLowerCase();
	var capitalized = firstLetter + rest;
	return capitalized;}



var Recipe = function(name) {
	
// NAME

	this.name = capitalize(name);
	this.getName = function() {
		return this.name;};
	
// INGREDIENTS
	
	this.ingredients = [];
	
	this.addIngredient = function(ing) {
		this.ingredients.push(capitalize(ing));};

	this.getIngredients = function() {
		var string = '<h3>Ingredients:</h3><ul><li>' + this.ingredients[0] + '</li>';
		for (i=1; i<this.ingredients.length; i++) {
			string += "<li>" + this.ingredients[i] + "</li>";}
		string += "</ul>";
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
	
	this.getSteps = function() {
		var string = '<h3>Steps:</h3><ul><li>' + this.steps[0].starttime + " minutes before serving, "+this.steps[0].instruction+'.</li>';
		for(i=1; i<this.steps.length; i++) {
			string += '<li>' + this.steps[i].starttime + " minutes before serving, " + this.steps[i].instruction + '.</li>';}
		return string;};
};

var addpopcorn = function() {	
	popcorn.addIngredient("corn");
	popcorn.addIngredient("salt");
	popcorn.addIngredient("butter");
	popcorn.addStep("put corn in a bowl", 1);
	popcorn.addStep("add a bunch of salt", 1);
	popcorn.addStep("put it in the microwave and watch it pop", 5);
	popcorn.addStep("cover it in butter", 2);
	popcorn.makeTimeline();	};

var popcorn = new Recipe("poPcorn");
addpopcorn();

function fillName() {
	document.getElementById("name").innerHTML = popcorn.getName();}

function fillIngredients() {
	document.getElementById("ingredients").innerHTML = popcorn.getIngredients();}

function fillSteps() {
	document.getElementById("steps").innerHTML = popcorn.getSteps();}

function fillAll() {
	fillName();
	fillIngredients();
	fillSteps();}
