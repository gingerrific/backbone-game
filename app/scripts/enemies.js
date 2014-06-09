"use strict";
////////////////////////////////////////////////////////
/// Model //////////////////////////////////////////////
////////////////////////////////////////////////////////

// Enemy Character model constructor
Game.Models.EnemyCharacter = Backbone.Model.extend({

	idAttribute: '_id',
	defaults: {
		enemyClass: '', // class name
		positionX: '0', // X-coord on the game map
		positionY: '0', // Y-coord on the game map
		textureRight: '', // what the enemy looks like moving Right
		textureLeft: '', // what the enemy looks like moving Left
		health: '', // chracter health
		weapon: '', // the weapon the enemy has
	}
});


////////////////////////////////////////////////////////
/// Collection /////////////////////////////////////////
////////////////////////////////////////////////////////

// Collection of available enemies
Game.Collections.EnemyCollection = Backbone.Collection.extend({
	model: Game.Models.EnemyCharacter,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/jdGameEnemy',
});


////////////////////////////////////////////////////////
/// Views //////////////////////////////////////////////
////////////////////////////////////////////////////////


Game.Views.Enemy = Backbone.View.extend({
	template: _.template($('.enemy-template-right').text()),
	leftTemplate: _.template($('.enemy-template-left').text()),

	className: 'enemy',

	initialize: function () {
		$('.enemy-container').append(this.el);
		this.render();
	},

	render: function () {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	}
});