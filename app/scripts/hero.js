'use strict';

////////////////////////////////////////////////////////
/// Model //////////////////////////////////////////////
////////////////////////////////////////////////////////

// Hero Character model constructor
Game.Models.Character = Backbone.Model.extend({

	idAttribute: '_id',
	defaults: {
		heroClass: '', // class name
		positionX: '0', // X-coord on the game map
		positionY: '0', // Y-coord on the game map
		textureRight: '', // what the character looks like moving Right
		textureLeft: '', // what the character looks like moving Left
		health: '', // chracter health
		weapon: '', // the weapon the character has
	}
});


////////////////////////////////////////////////////////
/// Collection /////////////////////////////////////////
////////////////////////////////////////////////////////

// Collection of available heroes
Game.Collections.HeroCollection = Backbone.Collection.extend({
	model: Game.Models.Character,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/jdGameHero',
});

// adding characters 
// hero = new Game.Models.Character({heroClass:'knightM', textureRight:'../images/knight.gif', textureLeft:'../images/knight2.gif', health: '100'});
// 		Game.collections.heroCollection.add(hero)
// 		hero.save();



////////////////////////////////////////////////////////
/// Views //////////////////////////////////////////////
////////////////////////////////////////////////////////

Game.Views.Hero = Backbone.View.extend({

	template: _.template($('.hero-template').text()),
	className: 'hero',

	initialize: function () {
		$('.map-container').append(this.el);
	},

	render: function () {

	}
});