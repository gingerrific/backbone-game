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

// another way to render map tiles, unsorted
// this.listenTo(Game.collections.mapCollection, 'add', function (tile) {
	// console.log(tile);
	// Game.views.map = new Game.Views.MapLook({model:tile});
// });

// Initiate two variables to be used two store the location of the stone walls/detect collision
var myCollection = [];
var wallCoordinates = [];


Game.Views.AppView = Backbone.View.extend({

	initialize: function () {
		// Create a new map with the MapCollection constructor
		Game.collections.mapCollection = new Game.Collections.MapCollection();
		// Fetch the tile models
		Game.collections.mapCollection.fetch().done( function () {
			myCollection = Game.collections.mapCollection.where({passage: false});
			wallCoordinates = myCollection.map( function (array) {
				return {'x':array.attributes.xCoord*64, 'y':(array.attributes.yCoord - 1) * 64};
			});
		});
		// Set the sort attribute as each tile's position
		Game.collections.mapCollection.comparator = 'position';
		// When the tiles are fetched, they will sort and on this event forEach over the results.models
		this.listenTo(Game.collections.mapCollection, 'sort', function (collObj) {
			collObj.models.forEach(function (tile) {
				// Create a new Map View with these sorted models
				Game.views.map = new Game.Views.MapLook({model:tile});
			});
		});
	}
});

// Initiate the hero location variables as numbers and start coordinates of (0,0)
// var xCoord = 0;
// var yCoord = 0;
var heroLocation = {x:0, y:0};
// initiates what will be used as a copy of the hero location
var upcomingHeroLocation;
// hero character movement
$(window).keydown( function (key) {

	// left arrow
	if (key.keyCode === 37) {
		event.preventDefault();
		// Filter out commands if you're at the edge of the board
		if (heroLocation.x > 0 ) {
			// Create a copy of current location and test if the next move would move you into an stone wall
			upcomingHeroLocation = _.extend({}, heroLocation);
			upcomingHeroLocation.x -= 64;
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 64px and moving in increments of 64 will move the character to each tile
				heroLocation.x = heroLocation.x - 64;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.x+', '+heroLocation.y+')'}); // X movement
			}
		}
		else {
			console.log('no move');
		}
	}
	// right arrow
	else if (key.keyCode === 39) {
		event.preventDefault();
		// Filter out commands if you're at the edge of the board
		if (heroLocation.x <= 512) {
			// Create a copy of current location and test if the next move would move you into an stone wall
			upcomingHeroLocation = _.extend({}, heroLocation);
			upcomingHeroLocation.x += 64;
			//	findWhere will return the location where these objects have the same properties (x,y). If it's return is undefined, there is no conflict.
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 64px and moving in increments of 64 will move the character to each tile
				heroLocation.x = heroLocation.x + 64;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.x+', '+heroLocation.y+')'}); // X movement
			}
			else {
				console.log('no move');
			}
		}
		else {
			console.log('no move');
		}
	}
	// up arrow
	else if (key.keyCode === 38) {
		event.preventDefault();
		// Filter out commands if you're at the edge of the board
		if (heroLocation.y > 0) {
			// Create a copy of current location and test if the next move would move you into an stone wall
			upcomingHeroLocation = _.extend({}, heroLocation);
			upcomingHeroLocation.y -= 64;
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 64px and moving in increments of 64 will move the character to each tile
				heroLocation.y = heroLocation.y - 64;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.x+', '+heroLocation.y+')'}); // Y movement
			}
		}
		else {
			console.log('no move');
		}
	}
	// down arrow
	else if (key.keyCode === 40) {
		event.preventDefault();
		// Filter out commands if you're at the edge of the board
		if (heroLocation.y <= 512) {
			// Create a copy of current location and test if the next move would move you into an stone wall
			upcomingHeroLocation = _.extend({}, heroLocation);
			upcomingHeroLocation.y += 64;
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 64px and moving in increments of 64 will move the character to each tile
				heroLocation.y = heroLocation.y + 64;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.x+', '+heroLocation.y+')'}); // Y movement
			}
		}
		else {
			console.log('no move');
		}
	}
});
