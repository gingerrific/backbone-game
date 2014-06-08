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
var xCoord = 0;
var yCoord = 0;

$(window).keydown( function (key) {
	// left arrow
	if (key.keyCode == 37) {
		if (xCoord > 0) {
			xCoord = xCoord - 80;
			$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+xCoord+', '+yCoord+')'}); // X movement
		}
		else {
			console.log('no move');
		}
	}
	// right arrow
	else if (key.keyCode == 39) {
		if (xCoord <= 640) {
			xCoord = xCoord + 80;
			$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+xCoord+', '+yCoord+')'}); // X movement
		}
		else {
			console.log('no move');
		}
	}
	// up arrow
	else if (key.keyCode == 38) {
		if (yCoord > 0) {
			yCoord = yCoord - 80;
			$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+xCoord+', '+Y+')'}); // Y movement
		}
		else {
			console.log('no move')
		}
	}
	// down arrow
	else if (key.keyCode == 40) {
		if (yCoord <= 640) {
			yCoord = yCoord + 80;
			$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+xCoord+', '+yCoord+')'}); // Y movement
		}
		else {
			console.log('no move');
		}
	}
});


