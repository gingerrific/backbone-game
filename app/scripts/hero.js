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


////////////////////////////////////////////////////////
/// Views //////////////////////////////////////////////
////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
/// Hero View //////////////////////////////////////////
/// Hero on the game's map /////////////////////////////
////////////////////////////////////////////////////////

Game.Views.Hero = Backbone.View.extend({

	template: _.template($('.hero-template-right').text()),
	leftTemplate: _.template($('.hero-template-left').text()),
	healthTemplate: _.template($('.hero-template-health').text()),

	className: 'hero',
	
	events: {
		'keydown window':'movement'
	},

	initialize: function () {
		this.listenTo(Game.models.hero, 'change:health', this.healthUpdate);
		$('.map-container').append(this.el);
		this.render();
		var that = this;
		// if window key commands are right or left, display the appropriate facing sprite
		$(window).keydown(function (key){
			if (key.keyCode === 37) {
				that.movement();
			}
			else if (key.keyCode === 39) {
				that.render();
			}
		});
	},

	render: function () {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

	movement: function () {
		var renderedTemplate = this.leftTemplate(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

	healthUpdate: function () {
		var renderedTemplate = this.healthTemplate(Game.models.hero.attributes);
		$('.hero-status-container').html(renderedTemplate);
	}
});

////////////////////////////////////////////////////////
/// Hero Selection /////////////////////////////////////
/// Selection Screen ///////////////////////////////////
////////////////////////////////////////////////////////

Game.Views.Selection = Backbone.View.extend({
	template: _.template($('.character-option').text()),
	className: 'hero-select-container',
	events: {
		'click': 'startGame'
	},

	initialize: function () {
		$('.selection-screen').append(this.el);
		this.render();
	},
	render: function () {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	},
	startGame: function () {
		// If you click a character, that model is passed to the hero view of the board
		Game.views.hero = new Game.Views.Hero({model: this.model});
		Game.models.hero.set({positionX: 0, positionY:1, health: 100, weapon: 'bombs'});
		// Creates a new game board (non-random)
		Game.models.mapPiece = new Game.Models.MapTile();
		Game.views.appView = new Game.Views.AppView({model: Game.models.mapPiece});
		// hides the selection screen and shows the map
		$('.selection-screen').hide();
		$('.map-container').show();
		$('.hero-status-container').show();
		// removes irrelevant views
		Game.views.otherApp.remove();
		Game.views.heroPick.remove();
	}
});




////////////////////////////////////////////////////////
/// Hero Selection AppView /////////////////////////////
/// Selection Overview /////////////////////////////////
////////////////////////////////////////////////////////



Game.Views.SelectionScreen = Backbone.View.extend({

	initialize: function() {
		Game.collections.heroCollection = new Game.Collections.HeroCollection();
		Game.collections.heroCollection.fetch();
		this.listenTo(Game.collections.heroCollection, 'add', function (hero) {
			Game.views.heroPick = new Game.Views.Selection({model: hero});
		});
	}
});
