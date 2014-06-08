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

	template: _.template($('.hero-template').text()),
	className: 'hero',

	initialize: function () {
		$('.map-container').append(this.el);
		this.render();
	},

	render: function () {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
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
		Game.views.hero = new Game.Views.Hero({model: this.model});
		Game.models.mapPiece = new Game.Models.MapTile();
		Game.views.appView = new Game.Views.AppView({model: Game.models.mapPiece});
		$('.selection-screen').hide();
		$('.map-container').show();

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
					Game.views.heroPick = new Game.Views.Selection({model: hero})
		});
	}
})
