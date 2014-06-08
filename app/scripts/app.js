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


Game.Views.AppView = Backbone.View.extend({

	initialize: function () {
		// Create a new map with the MapCollection constructor
		Game.collections.mapCollection = new Game.Collections.MapCollection();
		// Fetch the tile models
		Game.collections.mapCollection.fetch().done( function () {
			myCollection = Game.collections.mapCollection.where({passage: false})
			wallCoordinates = myCollection.map( function (array) {
				return {'x':array.attributes.xCoord*80, 'y':(array.attributes.yCoord - 1) * 80}
			})
		})
		// Set the sort attribute as each tile's position
		Game.collections.mapCollection.comparator = 'position';
		// When the tiles are fetched, they will sort and on this event forEach over the results.models
		this.listenTo(Game.collections.mapCollection, 'sort', function (collObj) {
			collObj.models.forEach(function (tile) {
				// Create a new Map View with these sorted models
				Game.views.map = new Game.Views.MapLook({model:tile});
			})
		});
	}
});

// Initiate two variables to be used two store the location of the stone walls/detect collision
var myCollection = [];
var wallCoordinates = [];

// Initiate the hero location variables as numbers and start coordinates of (0,0)
// var xCoord = 0;
// var yCoord = 0;
var heroLocation = {x:0, y:0}

// hero character movement
$(window).keydown( function (key) {
	// left arrow
	if (key.keyCode == 37) {
		// Filter out commands if you're at the edge of the board
		if (heroLocation.x > 0 ) {
			var upcomingHeroLocation = _.extend({}, heroLocation)
			upcomingHeroLocation.x -= 80
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 80px and moving in increments of 80 will move the character to each tile
				heroLocation.x = heroLocation.x - 80;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.x+', '+heroLocation.y+')'}); // X movement
			}
		}
		else {
			console.log('no move');
		}
	}
	// right arrow
	else if (key.keyCode == 39) {
		// Filter out commands if you're at the edge of the board
		if (heroLocation.x <= 640) {
			var upcomingHeroLocation = _.extend({}, heroLocation)
			upcomingHeroLocation.x += 80
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 80px and moving in increments of 80 will move the character to each tile
				heroLocation.x = heroLocation.x + 80;
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
	else if (key.keyCode == 38) {
		// Filter out commands if you're at the edge of the board
		if (heroLocation.y > 0) {
			var upcomingHeroLocation = _.extend({}, heroLocation)
			upcomingHeroLocation.y -= 80
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 80px and moving in increments of 80 will move the character to each tile
				heroLocation.y = heroLocation.y - 80;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.x+', '+heroLocation.y+')'}); // Y movement
			}
		}
		else {
			console.log('no move');
		}
	}
	// down arrow
	else if (key.keyCode == 40) {
		// Filter out commands if you're at the edge of the board
		if (heroLocation.y <= 640) {
			var upcomingHeroLocation = _.extend({}, heroLocation)
			upcomingHeroLocation.y += 80
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 80px and moving in increments of 80 will move the character to each tile
				heroLocation.y = heroLocation.y + 80;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.x+', '+heroLocation.y+')'}); // Y movement
			}
		}
		else {
			console.log('no move');
		}
	}
});

//  _.findWhere(wallCoordinates, heroLocation) === undefined

// var upcomingHeroLocation = _.extend({}, heroLocation)
// upcomingHeroLocation.x += 80
// if (_.findWhere(wallCoordinates, upcomingHeroLocation) !== undefined) {
// 	console.log('shitdamn');
// }