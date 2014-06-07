'use strict';

var Game = {
    // constructors
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},

    // instances
    models: {},
    collections: {},
    views: {},
    routers: {},
};



////////////////////////////////////////////////////////
/// App view ///////////////////////////////////////////
/// Init the collection and views //////////////////////
////////////////////////////////////////////////////////
Game.Views.AppView = Backbone.View.extend({

	events: {

	},

	initialize: function () {
		Game.collections.mapCollection = new Game.Collections.MapCollection();
		Game.collections.mapCollection.fetch();

		this.listenTo(Game.collections.mapCollection, 'add', function (tile) {
			Game.views.map = new Game.Views.MapLook({model:tile});
		});

		Game.collections.heroCollection = new Game.Collections.HeroCollection();
		Game.collections.heroCollection.fetch();
		Game.views.hero = new Game.Views.Hero({model:Game.collections.heroCollection.findWhere({heroClass: 'whitemageF'})});
		
	}
});


$(window).keydown( function (key) {
	// left arrow
	if (key.keyCode == 37) {
		$('.hero').css({left: '-=80em'});
	}
	// right arrow
	else if (key.keyCode == 39) {
		$('.hero').css({left: '+=80em'});
	}
	// up arrow
	else if (key.keyCode == 38) {
		$('.hero').css({top: '-=80em'});
	}
	// down arrow
	else if (key.keyCode == 40) {
		$('.hero').css({top: '+=80em'});
	}
});